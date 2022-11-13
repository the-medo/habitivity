import React, {useCallback, useEffect, useState} from "react";
import {Button, Form, Spin} from "antd";
import {TaskGroup} from "../../../types/TaskGroup";
import {PlusOutlined} from "@ant-design/icons";
import TaskGroupInput from "./TaskGroupInput";
import {
    useCreateTaskGroupsMutation, useDeleteTaskGroupsMutation,
    useGetTaskGroupsByTaskListQuery,
    useUpdateTaskGroupsMutation
} from "../../../store/apis/apiTaskGroup";
import {useSelectedTaskList} from "../../../hooks/useSelectedTaskList";
import {generateID} from "../../../helpers/generateID";
import {PartialWithId} from "../../../types/PartialWithId";
import {Reorder} from "framer-motion";
import styled from "styled-components";
import ButtonWrapper from "../../../components/global/ButtonWrapper";

type TaskGroupFormValues = Record<string, string>;

export type ReorderTaskGroupType = {
    initialIndex: number;
    position: number;
    taskGroup?: TaskGroup;
    isNew: boolean;
    inputName: string;
}

const StyledReorderGroup = styled(Reorder.Group)`
  list-style-type: none;
  margin: 0;
  margin-block-start: 0;
  padding: 0;
`

const TaskGroupsForm: React.FC = () => {
    const selectedTaskListId = useSelectedTaskList()?.id ?? 'undefined';

    const {data: existingGroups = [], isLoading } = useGetTaskGroupsByTaskListQuery(selectedTaskListId);
    const [createTaskGroups, { isLoading: isCreating }] = useCreateTaskGroupsMutation();
    const [updateTaskGroups, { isLoading: isUpdating }] = useUpdateTaskGroupsMutation();
    const [deleteTaskGroups, { isLoading: isDeleting }] = useDeleteTaskGroupsMutation();
    const isDoingSomething = isLoading || isCreating || isUpdating || isDeleting;

    const [items, setItems] = useState<ReorderTaskGroupType[]>([]);
    const [deletedItems, setDeletedItems] = useState<ReorderTaskGroupType[]>([]);


    const onReorder = (x: ReorderTaskGroupType[]) => setItems(x.map((g, i) => ({...g, position: i })));

    const setDefaults = useCallback(() => {
        setItems(existingGroups.map((g, i) => ({
            initialIndex: i,
            position: i,
            taskGroup: g,
            isNew: false,
            inputName: g.id,
        })));
    }, [isLoading, existingGroups])

    useEffect(() => {
        if (!isLoading) {
            setDefaults();
        }
    }, [isLoading]);

    const addTaskGroupToItems = useCallback(() => {
        setItems(elements => [...elements, {
            initialIndex: elements.length + deletedItems.length,
            position: elements.length,
            taskGroup: undefined,
            isNew: true,
            inputName: `group-${generateID(10)}`,
        }])
    }, [deletedItems]);

    const removeFromItems = useCallback((item: ReorderTaskGroupType) => {
        setDeletedItems(elements => [...elements, item]);
        setItems((elements) => elements.filter(e => e.inputName !== item.inputName).map((e, i) => ({...e, position: i})) );
    }, [items]);

    const returnToItems = useCallback((item: ReorderTaskGroupType) => {
        setDeletedItems(elements => [...elements.filter(e => e.inputName !== item.inputName)]);
        setItems((elements) => elements.concat([item]).map((e, i) => ({...e, position: i})) );
    }, [items]);

    const rtgToTaskGroup = useCallback((rtg: ReorderTaskGroupType, values: TaskGroupFormValues): TaskGroup => ({
        id: rtg.inputName,
        name: values[rtg.inputName],
        taskListId: selectedTaskListId,
        position: rtg.position,
    }), [selectedTaskListId])

    const onFinish = useCallback( (values: TaskGroupFormValues) => {
        if (!isLoading) {
            //create unknown items
            const taskGroupsToCreate: TaskGroup[] = items.filter(i => i.isNew).map(rtg => rtgToTaskGroup(rtg, values));
            if (taskGroupsToCreate.length > 0) {
                createTaskGroups({newTaskGroups: taskGroupsToCreate, taskListId: selectedTaskListId});
            }

            //update already existing items
            const taskGroupsToEdit: PartialWithId<TaskGroup>[] = items.filter(i => !i.isNew).map(rtg => rtgToTaskGroup(rtg, values));
            if (taskGroupsToEdit.length > 0) {
                updateTaskGroups(taskGroupsToEdit);
            }

            //set local ITEMS state: isNew => false, taskGroup not undefined anymore
            setItems(items.map(rtg => ({...rtg, taskGroup: rtgToTaskGroup(rtg, values), isNew: false})));

            //delete already existing items (no need to delete removed items, that were not saved yet)
            const taskGroupIdsToDelete: string[] = deletedItems.filter(i => !i.isNew).map(i => i.inputName);
            if(taskGroupIdsToDelete.length > 0) {
                deleteTaskGroups(taskGroupIdsToDelete).then(() => {
                    //we need to keep old items in local state, even when deleted because of "initialIndex" counting... TODO: could be in local state counter...
                    setDeletedItems(elements => [...elements.map(i => ({...i, taskGroup: undefined, isNew: true,}))]);
                });
            }
        }
    }, [isLoading, items, deletedItems, selectedTaskListId]);

    return (
        <Spin spinning={isDoingSomething}>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                name="edit-task-groups"
                disabled={isLoading}
                onFinish={onFinish}
            >
                <StyledReorderGroup values={items} onReorder={onReorder}>
                    {items.map(item => (
                        <Reorder.Item
                            key={item.initialIndex}
                            value={item}
                        >
                            <TaskGroupInput
                                isFirst={item.position === 0}
                                name={item.inputName}
                                taskGroup={item.taskGroup}
                                removeFromItems={() => removeFromItems(item)}
                                returnToItems={() => {}}
                            />
                        </Reorder.Item>
                    ))}
                </StyledReorderGroup>
                {deletedItems.filter(item => !item.isNew).map((item, i) => (
                    <TaskGroupInput
                        isFirst={i === 0}
                        key={`deleted-${item.initialIndex}`}
                        name={item.inputName}
                        taskGroup={item.taskGroup}
                        removeFromItems={() => {}}
                        returnToItems={() => returnToItems(item)}
                        isDeleted
                    />
                ))}
                <Form.Item wrapperCol={{ span: 18, sm: {offset: 6}, xs: {offset: 0} }}>
                    <ButtonWrapper>
                        <Button type="primary" htmlType="submit">Save groups</Button>
                        <Button
                            type="dashed"
                            onClick={addTaskGroupToItems}
                            icon={<PlusOutlined />}
                        >
                            {`Add ${items.length === 0 ? 'your first' : ''} task group`}
                        </Button>
                    </ButtonWrapper>
                </Form.Item>
            </Form>
        </Spin>
    );
}

export default TaskGroupsForm;