import React, {Fragment, useCallback} from "react";
import {Button, Form, Input} from "antd";
import {TaskGroup} from "../../../types/TaskGroup";
import {ExampleTaskGroups} from "../../../examples/taskTypes";
import {PlusOutlined} from "@ant-design/icons";
import TaskGroupInput from "./TaskGroupInput";

const existingGroups: TaskGroup[] = ExampleTaskGroups;


const TaskGroupsEdit: React.FC = () => {
    const isLoading = false;

    const onFinish = useCallback((values: any) => {
        console.log(values);
    }, []);

    return (

        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            name="new-task-list"
            disabled={isLoading}
            onFinish={onFinish}
        >
            {existingGroups.map((tg, i) => <TaskGroupInput
                key={`tg-${tg.id}`}
                position={i}
                name={`tg-${tg.id}`}
                taskGroup={tg}
            />)}
            <Form.List name="tg" >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => <TaskGroupInput key={field.key} position={(existingGroups.length + index)} name={`${field.name}`} remove={remove} />) }

                        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                            >
                                Add task group
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                <Button type="primary" htmlType="submit">Edit & create</Button>
            </Form.Item>
        </Form>
    );
}

export default TaskGroupsEdit;