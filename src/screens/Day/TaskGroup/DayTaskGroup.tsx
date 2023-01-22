import React, { useEffect, useMemo, useState } from 'react';
import { TaskGroup } from '../../../types/TaskGroup';
import { useTasksByGroup } from '../../../hooks/useTasksByGroup';
import { COLORS } from '../../../styles/CustomStyles';
import TaskComponent from '../../../components/global/TaskComponent/TaskComponent';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import dayjs from 'dayjs';
import { useGetCompletedDayQuery } from '../../../apis/apiTasks';
import { generateColor } from '../../../helpers/generateColor';

interface DayTaskGroupProps {
  group: TaskGroup;
}

const DayTaskGroup: React.FC<DayTaskGroupProps> = ({ group }) => {
  const displayMode = useSelector((state: ReduxState) => state.dayReducer.displayMode);
  const selectedDate = useSelector((state: ReduxState) => state.dayReducer.selectedDate);

  const [selectedDateChanged, setSelectedDateChanged] = useState(true);
  const colorLight = useMemo(
    () => (group.color ? generateColor(group.color, 0) : COLORS.PRIMARY_LIGHT),
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

  if (completedDay === undefined) return null;

  return (
    <>
      {tasksActive.map(t => (
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
      ))}
    </>
  );
};

export default DayTaskGroup;
