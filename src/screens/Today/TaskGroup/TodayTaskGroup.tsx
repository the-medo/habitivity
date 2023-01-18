import React, { useEffect, useMemo, useState } from 'react';
import { TaskGroup } from '../../../types/TaskGroup';
import styled from 'styled-components';
import { useTasksByGroup } from '../../../hooks/useTasksByGroup';
import { COLORS } from '../../../styles/CustomStyles';
import EmptyGroupMessage from './EmptyGroupMessage';
import { Button, Spin, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import TaskComponent from '../../../components/global/TaskComponent/TaskComponent';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import TaskComponentWrapper from '../../../components/global/TaskComponent/TaskComponentWrapper';
import DynamicIcon from '../../../components/global/DynamicIcon';
import dayjs from 'dayjs';
import { useGetCompletedDayQuery } from '../../../apis/apiTasks';
import { formatPoints } from '../../../helpers/numbers/formatPoints';
import { generate } from '@ant-design/colors';

interface TodayTaskGroupProps {
  group: TaskGroup;
}

const TaskGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid ${COLORS.GREY_BORDER};
`;

const TaskGroupHeader = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;

const HeaderTitle = styled.h2`
  margin-bottom: 0;
`;

const HeaderPoints = styled.div`
  background-color: ${COLORS.PRIMARY_LIGHT};
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 1rem;
  font-size: 90%;
  font-weight: bold;
  border-radius: 50%;
`;

const HeaderPart = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`;

const TodayTaskGroup: React.FC<TodayTaskGroupProps> = ({ group }) => {
  const displayMode = useSelector((state: ReduxState) => state.todayReducer.displayMode);
  const selectedDate = useSelector((state: ReduxState) => state.todayReducer.selectedDate);

  const [selectedDateChanged, setSelectedDateChanged] = useState(true);
  const colorLight = useMemo(
    () => (group.color ? generate(group.color)[0] : COLORS.PRIMARY_LIGHT),
    [group.color],
  );
  const colorDark = useMemo(() => group.color ?? COLORS.PRIMARY, [group.color]);

  useEffect(() => {
    setSelectedDateChanged(true);
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDateChanged) setSelectedDateChanged(false);
  }, [selectedDateChanged]);

  const { tasksActive } = useTasksByGroup(group.id);
  const { data: completedDay, isFetching } = useGetCompletedDayQuery({
    date: selectedDate,
  });

  return (
    completedDay !== undefined &&
    tasksActive.map(t => (
      <Spin spinning={completedDay === undefined && isFetching}>
        <TaskComponent
          key={t.id}
          task={t}
          displayMode={displayMode}
          selectedDate={dayjs(selectedDate)}
          completedDayTask={completedDay === false ? undefined : completedDay.tasks[t.id]}
          isEmpty={selectedDateChanged || isFetching}
          colorLight={colorLight}
          colorDark={colorDark}
        />
      </Spin>
    ))
  );
};

export default TodayTaskGroup;

/*

<TaskGroupWrapper>
      <TaskGroupHeader>
        <HeaderPart>
          <HeaderTitle>{group.name}</HeaderTitle>
          <HeaderPoints>
            {formatPoints(completedDay === false ? undefined : completedDay?.taskGroups[group.id])}
          </HeaderPoints>
    </HeaderPart>
    <HeaderPart>
      {tasksActive.length === 0 && <EmptyGroupMessage taskGroupId={group.id} />}
      {tasksActive.length > 0 && (
        <Tooltip title="New task">
          <Link to={`/new-task/${group.id}`}>
            <Button icon={<DynamicIcon icon="AiOutlinePlus" />} />
          </Link>
        </Tooltip>
      )}
    </HeaderPart>
      <TaskComponentWrapper displayMode={displayMode}>
      </TaskComponentWrapper>
    </TaskGroupHeader>
    </TaskGroupWrapper>

 */
