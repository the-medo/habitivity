import React, {useCallback} from "react";
import {Col, PageHeader} from "antd";
import {useUser} from "../../hooks/useUser";
import {stringToPretty} from "../../helpers/stringToPretty";
import {generateID} from "../../helpers/generateID";
import {TaskList, TaskListType} from "../../types/TaskLists";
import {useNavigate} from "react-router-dom";
import {setSelectedTaskListId} from "../../store/taskSlice";
import {useDispatch} from "react-redux";
import {useCreateTaskListMutation} from "../../store/apis/apiTaskList";
import TaskListForm from "./TaskListForm";

export interface FormTaskListCreate {
    taskListName: string;
    taskListType: TaskListType;
}

const TaskListCreate: React.FC = () => {
    const user = useUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createTaskList, { isLoading }] = useCreateTaskListMutation();

    const onFinish = useCallback(async (values: FormTaskListCreate) => {
        if (user) {
            const newId = stringToPretty(values.taskListName) + '-' + generateID(4);

            const newTaskList: TaskList = {
                id: newId,
                userId: user.id,
                name: values.taskListName,
                type: values.taskListType
            }

            await createTaskList(newTaskList).then(() => {
                dispatch(setSelectedTaskListId(newId));
                navigate(`/task-list/${newId}`);
            });
        }
    }, [user]);

    return (
        <>
            <Col offset={6}>
                <PageHeader
                    title="Create new task list"
                />
            </Col>
            <TaskListForm isLoading={isLoading} onFinish={onFinish}/>
        </>
    );
}

export default TaskListCreate;