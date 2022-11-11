import React, {useCallback, useEffect} from "react";
import {
    PageHeader,
} from "antd";
import {useUser} from "../../hooks/useUser";
import {stringToPretty} from "../../helpers/stringToPretty";
import {generateID} from "../../helpers/generateID";
import {TaskList, taskListConverter, TaskListType} from "../../types/TaskLists";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {useNavigate} from "react-router-dom";
import {setSelectedTaskListId} from "../../store/taskSlice";
import {useDispatch} from "react-redux";
import TaskListForm from "./TaskListForm";
import {useSelectedTaskList} from "../../hooks/useSelectedTaskList";
import {useCreateTaskListMutation} from "../../store/api";

interface FormTaskListCreate {
    taskListName: string;
    taskListType: TaskListType;
}

const TaskListEdit: React.FC = () => {
    const user = useUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [createTaskList, { isLoading }] = useCreateTaskListMutation();
    const taskList = useSelectedTaskList();

    useEffect(() => {
        console.log("TASK LIST CHANGED!!! ", taskList);
    }, [taskList])

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
            setDoc(taskListRef, newTaskList).then(() => {
                dispatch(setSelectedTaskListId(newId));
                navigate(`/task-list/${newId}`);
            });

        }
    }, [user]);

    return (
        <>
            <PageHeader
                className="site-page-header"
                title="Edit this task list"
            />
            <TaskListForm
                onFinish={onFinish}
                isLoading={isLoading}
                taskList={taskList}
                isEdit
            />
        </>
    );
}

export default TaskListEdit;