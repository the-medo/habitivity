import React, { useCallback } from 'react';
import { useSelectedTaskList } from '../../hooks/useSelectedTaskList';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import styled from 'styled-components';
import DayTaskGroup from './TaskGroup/DayTaskGroup';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import Title from 'antd/es/typography/Title';
import { Avatar, Button, Card, DatePicker, Radio, RadioChangeEvent, Tooltip } from 'antd';
import { setDisplayMode, setSelectedDate, toggleEditMode } from './daySlice';
import { RowGap } from '../../components/global/RowGap';
import { TaskDisplayMode } from '../../components/global/TaskComponent/TaskComponent';
import DynamicIcon from '../../components/global/DynamicIcon';
import DayEditMode from './TaskGroup/DayEditMode';
import dayjs, { Dayjs } from 'dayjs';
import { datepickerFormat } from '../../components/forms/AntdFormComponents';
import { Link } from 'react-router-dom';
import { COLORS } from '../../styles/CustomStyles';
import TaskComponentWrapper, {
  TaskComponentWrapperBox,
  TaskComponentWrapperRow,
} from '../../components/global/TaskComponent/TaskComponentWrapper';
import DayPieGraphWrapper from './TaskGroup/DayPieGraphWrapper';
import TaskUserInputTime from '../../components/global/TaskComponent/TaskUserInput/TaskUserInputTime';

const DayTaskGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid ${COLORS.GREY_BORDER};

  ${TaskComponentWrapperBox}, ${TaskComponentWrapperRow} {
    flex-basis: max(35%, 20rem);
  }
`;

const DayDefault: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTaskListId = useSelectedTaskList()?.id ?? 'undefined';
  const isEditMode = useSelector((state: ReduxState) => state.dayReducer.isEditMode);
  const displayMode = useSelector((state: ReduxState) => state.dayReducer.displayMode);
  const selectedDate = useSelector((state: ReduxState) => dayjs(state.dayReducer.selectedDate));
  const { data: existingGroups = [] } = useGetTaskGroupsByTaskListQuery(selectedTaskListId);

  const editModeHandler = useCallback(() => dispatch(toggleEditMode()), [dispatch]);
  const displayModeHandler = useCallback(
    (e: RadioChangeEvent) => dispatch(setDisplayMode(e.target.value)),
    [dispatch],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDateChange = useCallback((value: any) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    if (value !== null) dispatch(setSelectedDate((value as Dayjs).format('YYYY-MM-DD')));
  }, []);

  return (
    <DayTaskGroupWrapper>
      <TitleRow>
        <RowGap>
          <Title level={2}>Your day</Title>
          <DatePicker
            size="large"
            bordered={false}
            format={datepickerFormat}
            defaultValue={selectedDate}
            clearIcon={false}
            onChange={onDateChange}
          />
        </RowGap>
        <RowGap>
          {!isEditMode && (
            <Button
              onClick={editModeHandler}
              type="default"
              icon={<DynamicIcon icon="AiOutlineEdit" />}
            >
              Edit mode
            </Button>
          )}
          <Link to={`/${selectedTaskListId}/new-task`}>
            <Button icon={<DynamicIcon icon="AiOutlinePlus" />}>Create task</Button>
          </Link>
          <Radio.Group defaultValue={displayMode} buttonStyle="solid" onChange={displayModeHandler}>
            <Tooltip title="Box mode">
              <Radio.Button value={TaskDisplayMode.BOXES}>
                <DynamicIcon icon="AiOutlineAppstore" />
              </Radio.Button>
            </Tooltip>
            <Tooltip title="Row mode">
              <Radio.Button value={TaskDisplayMode.ROWS}>
                <DynamicIcon icon="AiOutlineBars" />
              </Radio.Button>
            </Tooltip>
          </Radio.Group>
        </RowGap>
      </TitleRow>
      {isEditMode && <DayEditMode />}
      {!isEditMode && (
        <TaskWrapper>
          <TaskComponentWrapper displayMode={displayMode}>
            {existingGroups.map(g => (
              <DayTaskGroup key={g.id} group={g} />
            ))}
          </TaskComponentWrapper>
          <DayPieGraphWrapper selectedDate={selectedDate} />
        </TaskWrapper>
      )}
    </DayTaskGroupWrapper>
  );
};

export default DayDefault;
