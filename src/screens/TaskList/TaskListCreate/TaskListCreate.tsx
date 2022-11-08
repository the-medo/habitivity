import React, {useCallback} from "react";
import {
    Button,
    Form,
    Input,
    PageHeader,
    Select,
} from "antd";
import {useUser} from "../../../hooks/useUser";
import {stringToPretty} from "../../../helpers/stringToPretty";
import {generateID} from "../../../helpers/generateID";
import {TaskList, taskListConverter, TaskListType} from "../../../types/TaskLists";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../../firebase";

interface FormTaskListCreate {
    taskListName: string;
    taskListType: TaskListType;
}

const TaskListCreate: React.FC = () => {
    const user = useUser();

    const onFinish = useCallback((values: FormTaskListCreate) => {
        if (user) {
            const newId = stringToPretty(values.taskListName) + '-' + generateID(4);

            const newTaskList: TaskList = {
                id: newId,
                userId: user.id,
                name: values.taskListName,
                type: values.taskListType
            }


            console.log('Trying to create this task list: ', newTaskList);

            const taskListRef = doc(db, '/Users/' + user.id + '/TaskLists/' + newId).withConverter(taskListConverter);
            setDoc(taskListRef, newTaskList).then((response) => {
                console.log("RESPONSE: ", response)
            });

        }
    }, [user]);

    return (
        <>
            <PageHeader
                className="site-page-header"
                title="Create new task list"
            />
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                name="new-task-list"
                initialValues={{
                    taskListType: TaskListType.DAILY
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Task list name"
                    name="taskListName"
                    rules={[{ required: true, message: 'Please input name of your new task list!' }]}
                >
                    <Input placeholder="New task list name" />
                </Form.Item>
                <Form.Item
                    label="Task list type"
                    name="taskListType"
                >
                    <Select>
                        <Select.Option value={TaskListType.DAILY}>Daily</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default TaskListCreate;