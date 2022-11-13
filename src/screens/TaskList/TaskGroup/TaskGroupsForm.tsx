import React, {useCallback} from "react";
import {Button, Form, Spin} from "antd";
import {TaskGroup} from "../../../types/TaskGroup";
import {PlusOutlined} from "@ant-design/icons";
import TaskGroupInput from "./TaskGroupInput";
import {
    useCreateTaskGroupsMutation,
    useGetTaskGroupsByTaskListQuery,
    useUpdateTaskGroupsMutation
} from "../../../store/apis/apiTaskGroup";
import {useSelectedTaskList} from "../../../hooks/useSelectedTaskList";
import {generateID} from "../../../helpers/generateID";
import {PartialWithId} from "../../../types/PartialWithId";

type TaskGroupFormValues = {
    newGroups: string[],
} & Record<string, string>;

const TaskGroupsForm: React.FC = () => {
    const selectedTaskListId = useSelectedTaskList()?.id ?? 'undefined';
    const {data: existingGroups = [], isLoading } = useGetTaskGroupsByTaskListQuery(selectedTaskListId);

    const [createTaskGroups, { isLoading: isCreating }] = useCreateTaskGroupsMutation();
    const [updateTaskGroups, { isLoading: isUpdating }] = useUpdateTaskGroupsMutation();

    const [form] = Form.useForm();

    const onFinish = useCallback( (values: TaskGroupFormValues) => {
        if (!isLoading) {
            console.log("Values to add & update: ", values);

            if (values.newGroups !== undefined) {
                const taskGroupsToCreate: TaskGroup[] = values.newGroups.map((tg, i) => ({
                    id: `group-${generateID(10)}`,
                    name: tg,
                    taskListId: selectedTaskListId,
                    position: existingGroups.length + i
                }));

                if (taskGroupsToCreate.length > 0) {
                    createTaskGroups({newTaskGroups: taskGroupsToCreate, taskListId: selectedTaskListId});
                }
            }

            const taskGroupsToEdit: PartialWithId<TaskGroup>[] = [];
            Object.keys(values).filter(key => {
                const splitName = key.split("-");
                return (splitName.length > 1 && splitName.shift() === "group") && key !== 'newGroups'
            }).forEach(k => taskGroupsToEdit.push({
                id: k,
                name: values[k]
            }))

            if (taskGroupsToEdit.length > 0) {
                updateTaskGroups(taskGroupsToEdit);
            }

            form.setFieldsValue({newGroups: []});

        }
    }, [isLoading, existingGroups, selectedTaskListId]);

    return (
        <Spin spinning={isUpdating || isCreating}>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                name="edit-task-groups"
                disabled={isLoading}
                onFinish={onFinish}
            >
                {(existingGroups ?? []).map((tg, i) =>
                    <TaskGroupInput
                        key={`tg-${tg.id}`}
                        isFirst={i === 0}
                        position={i}
                        name={tg.id}
                        taskGroup={tg}
                    />
                )}
                <Form.List name="newGroups">
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) =>
                                <TaskGroupInput
                                    key={field.key}
                                    isFirst={index === 0}
                                    position={(existingGroups.length + index)}
                                    name={`${field.name}`}
                                    removeFromList={remove}
                                />
                            )}
                            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                >
                                    {`Add ${existingGroups.length + fields.length === 0 ? 'your first' : ''} task group`}
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                    <Button type="primary" htmlType="submit">Save groups</Button>
                </Form.Item>
            </Form>
        </Spin>
    );
}

export default TaskGroupsForm;