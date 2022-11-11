import React, {useCallback} from "react";
import {
    Button,
    Form,
    Input,
    PageHeader, Result,
    Select,
} from "antd";
import {useUser} from "../../../hooks/useUser";
import {stringToPretty} from "../../../helpers/stringToPretty";
import {generateID} from "../../../helpers/generateID";
import {TaskList, TaskListType} from "../../../types/TaskLists";
import {useNavigate} from "react-router-dom";
import {setSelectedTaskListId} from "../../../store/taskSlice";
import {useDispatch} from "react-redux";
import {useCreateTaskListMutation} from "../../../store/api";

interface FormTaskListCreate {
    taskListName: string;
    taskListType: TaskListType;
}

const TaskListCreate: React.FC = () => {
    const user = useUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createTaskList, { isLoading, isSuccess }] = useCreateTaskListMutation();

    const onFinish = useCallback(async (values: FormTaskListCreate) => {
        if (user) {
            const newId = stringToPretty(values.taskListName) + '-' + generateID(4);

            const newTaskList: TaskList = {
                id: newId,
                userId: user.id,
                name: values.taskListName,
                type: values.taskListType
            }

            console.log('Trying to create this task list: ', newTaskList);

            await createTaskList(newTaskList).then(() => {
                dispatch(setSelectedTaskListId(newId));
                navigate(`/task-list/${newId}`);
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
                disabled={isLoading}
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
                {
                    isSuccess && <Result
                        status="success"
                        title="Good job!"
                        subTitle="Your new task list was created!"
                      />
                }
            </Form>
        </>
    );
}

export default TaskListCreate;