import React, {useEffect} from "react";
import {TaskList, TaskListType} from "../../types/TaskLists";
import {Button, Form, Input, Select, Spin} from "antd";
import {FormTaskListCreate} from "./TaskListCreate";

interface TaskListFormProps {
    taskList?: TaskList;
    isLoading?: boolean;
    isEdit?: boolean;
    onFinish: (args: FormTaskListCreate) => void;
}

const TaskListForm: React.FC<TaskListFormProps> = ({taskList, isLoading, onFinish, isEdit}) => {
    useEffect(() => {
        console.log("TASK LIST CHANGED!!! ", taskList);
    }, [taskList])

    if ( taskList?.userId === "temp-user-id") {
        return <Spin tip="Loading..."><TaskListForm onFinish={onFinish} /></Spin>;
    }

    return (
        <Form
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
            </Form.Item>
        </Form>
    );
}

export default TaskListForm;