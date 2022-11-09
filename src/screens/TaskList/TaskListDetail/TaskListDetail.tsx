import React from "react";
import {useSelectedTaskList} from "../../../hooks/useSelectedTaskList";

interface TaskListDetailProps {

}

const TaskListDetail: React.FC<TaskListDetailProps> = () => {
    const selectedTaskList = useSelectedTaskList();

    return (
        <div>TaskListDetail - {selectedTaskList?.id} - {selectedTaskList?.name}</div>
    );
}

export default TaskListDetail;