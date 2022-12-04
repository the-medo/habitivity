import React from "react";
import {TaskListType} from "../../../types/TaskLists";
import {Button, Form, Input, Select} from "antd";
import ButtonWrapper from "../../global/ButtonWrapper";
import TaskTypeSelector from "./TaskType/TaskTypeSelector";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {ReduxState} from "../../../store";
import {taskTypesWithDescription} from "./TaskType/taskTypesWithDescription";
import TaskTypeItem from "./TaskType/TaskTypeItem";

interface TaskCreateFormProps {

}

const TaskCreateFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const FormWrapper = styled.div`
  //display: flex;
  flex-grow: 1;
`

const TaskCreateForm: React.FC<TaskCreateFormProps> = () => {
    const { selectedTaskType } = useSelector((state: ReduxState) => state.taskReducer);

    if (selectedTaskType === undefined) return <TaskTypeSelector />;

    return (
        <TaskCreateFormWrapper>
            <TaskTypeItem taskType={taskTypesWithDescription.find(tt => tt.id === selectedTaskType)!} />
            <FormWrapper>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
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
                    <Form.Item wrapperCol={{ span: 20, sm: {offset: 4}, xs: {offset: 0} }}>
                        <ButtonWrapper>
                            <Button type="primary" htmlType="submit">Create</Button>
                        </ButtonWrapper>
                    </Form.Item>
                </Form>
            </FormWrapper>
        </TaskCreateFormWrapper>
    );
}

export default TaskCreateForm;