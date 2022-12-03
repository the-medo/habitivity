import React from "react";
import {Task} from "../../../types/Tasks";
import styled from "styled-components";

interface TodayTaskProps {
    task: Task;
}

const TaskWrapper = styled.div`
  display: flex;
  margin: .25rem;
  border: 1px solid lightgrey;
`

const TodayTask: React.FC<TodayTaskProps> = ({task}) => {

    return (
        <TaskWrapper>{task.taskName}</TaskWrapper>
    );
}

export default TodayTask;