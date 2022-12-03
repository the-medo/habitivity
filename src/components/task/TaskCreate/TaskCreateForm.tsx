import React from "react";
import {TaskListType} from "../../../types/TaskLists";
import {Button, Form, Input, Select} from "antd";
import ButtonWrapper from "../../global/ButtonWrapper";
import TaskTypeSelector from "./TaskType/TaskTypeSelector";

interface TaskCreateFormProps {

}

const TaskCreateForm: React.FC<TaskCreateFormProps> = () => {

    return (
        <>
            <TaskTypeSelector />
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                name="new-task"
                initialValues={{

                }}
            >
                <Form.Item
                    label="Task name"
                    name="taskName"
                    rules={[{ required: true, message: 'Please input name of your task!' }]}
                >
                    <Input placeholder="Task name" />
                </Form.Item>
                <Form.Item
                    label="Task type"
                    name="taskType"
                >
                    <Select disabled={false}>
                        <Select.Option value={TaskListType.DAILY}>Daily</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 18, sm: {offset: 6}, xs: {offset: 0} }}>
                    <ButtonWrapper>
                        <Button type="primary" htmlType="submit">Create</Button>
                    </ButtonWrapper>
                </Form.Item>
            </Form>
        </>
    );
}

export default TaskCreateForm;