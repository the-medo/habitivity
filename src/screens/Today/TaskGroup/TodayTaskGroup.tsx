import React from "react";
import {TaskGroup} from "../../../types/TaskGroup";
import styled from "styled-components";
import {ExampleTasks} from "../../../examples/taskTypes";
import TodayTask from "./TodayTask";
import {useTasksByGroup} from "../../../hooks/useTasksByGroup";
import {Button} from "antd";
import ButtonWrapper from "../../../components/global/ButtonWrapper";
import {COLORS} from "../../../styles/CustomStyles";
import {icons, IconType} from "../../../components/icons/icons";
import EmptyGroupMessage from "./EmptyGroupMessage";

interface TodayTaskGroupProps {
    group: TaskGroup;
}

const TaskGroupWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const LeftPart = styled.div`
  flex-basis: 20%;
  background-color: ${COLORS.PRIMARY_LIGHT};
  
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  
  padding: 1rem;
`

const MiddlePart = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  
  justify-content: center;
  
  flex: 1;
  
  border-top: 1px solid ${COLORS.PRIMARY_LIGHT};
  border-bottom: 1px solid ${COLORS.PRIMARY_LIGHT};
`

const RightPart = styled.div`
  flex-basis: 10%;
  background-color: ${COLORS.PRIMARY_LIGHT};

  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  
  display: flex;
  align-items: center;
  justify-content: center;
`

const TodayTaskGroup: React.FC<TodayTaskGroupProps> = ({group}) => {
    const taskInfo = useTasksByGroup(group.id);

    return (
        <TaskGroupWrapper>
            <LeftPart>
                <h2>{group.name}</h2>
            </LeftPart>
            <MiddlePart>
                {taskInfo.tasks.length === 0 && <EmptyGroupMessage taskGroupId={group.id} />}
                {taskInfo.tasks.map(t => <TodayTask key={t.id} task={t} />)}
            </MiddlePart>
            <RightPart>
                20
            </RightPart>
        </TaskGroupWrapper>

    );
}

export default TodayTaskGroup;