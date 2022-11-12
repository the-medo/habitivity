import React, {useEffect} from "react";
import {TaskList, TaskListType} from "../../types/TaskLists";
import {Button, Form, Input, Select, Spin} from "antd";
import {FormTaskListCreate} from "./TaskListCreate";
import {FormTaskListEdit} from "./TaskListEdit";
import styled from "styled-components";

interface TaskListFormProps {
    taskList?: TaskList;
    isLoading?: boolean;
    isEdit?: boolean;
    onFinish: (values: FormTaskListCreate | FormTaskListEdit) => void;
    onDelete?: () => void;
}

const StyledForm = styled(Form<FormTaskListCreate | FormTaskListEdit>)`
  button:not(:first-of-type) {
    margin-left: .5rem;
  }
  
  button:not(:last-of-type) {
    margin-right: .5rem;
  }
`;

const TaskListForm: React.FC<TaskListFormProps> = ({taskList, isLoading, isEdit, onFinish, onDelete}) => {
    useEffect(() => {
        console.log("TASK LIST CHANGED!!! ", taskList);
    }, [taskList])

    if ( taskList?.userId === "temp-user-id") {
        return <Spin tip="Loading..."><TaskListForm onFinish={onFinish} /></Spin>;
    }

    return (
        <StyledForm
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            name="new-task-list"
            initialValues={{
                taskListName: taskList && isEdit ? taskList.name : undefined,
                taskListType: TaskListType.DAILY
            }}
            disabled={isLoading}
            onFinish={onFinish}
        >
            <Form.Item
                label="Task list name"
                name="taskListName"
                rules={[{ required: true, message: 'Please input name of your task list!' }]}
            >
                <Input placeholder="Task list name" />
            </Form.Item>
            <Form.Item
                label="Task list type"
                name="taskListType"
                tooltip={isEdit && "It is not possible to change task list type"}
            >
                <Select disabled={isEdit}>
                    <Select.Option value={TaskListType.DAILY}>Daily</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                <Button type="primary" htmlType="submit">{isEdit ? 'Edit' : 'Create'}</Button>
                {isEdit && <Button danger htmlType="reset" onClick={onDelete}>Delete</Button>}
            </Form.Item>
        </StyledForm>
    );
}

export default TaskListForm;