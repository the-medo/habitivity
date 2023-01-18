import React, { useCallback, useMemo, useState } from 'react';
import { useSelectedTaskList } from '../../hooks/useSelectedTaskList';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import styled from 'styled-components';
import TodayTaskGroup from './TaskGroup/TodayTaskGroup';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import Title from 'antd/es/typography/Title';
import { Button, DatePicker, Radio, RadioChangeEvent, Tooltip } from 'antd';
import { setDisplayMode, setSelectedDate, toggleEditMode } from './todaySlice';
import { RowGap } from '../../components/global/RowGap';
import { TaskDisplayMode } from '../../components/global/TaskComponent/TaskComponent';
import DynamicIcon from '../../components/global/DynamicIcon';
import TodayEditMode from './TaskGroup/TodayEditMode';
import dayjs, { Dayjs } from 'dayjs';
import { datepickerFormat } from '../../components/forms/AntdFormComponents';
import { PickerDateProps } from 'antd/es/date-picker/generatePicker';
import { dateBasicFormatFromDayjs } from '../../helpers/date/dateBasicFormatFromDate';

const TodayTaskGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TodayDefault: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTaskListId = useSelectedTaskList()?.id ?? 'undefined';
  const isEditMode = useSelector((state: ReduxState) => state.todayReducer.isEditMode);
  const displayMode = useSelector((state: ReduxState) => state.todayReducer.displayMode);
  const selectedDate = useSelector((state: ReduxState) => dayjs(state.todayReducer.selectedDate));
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
    <TodayTaskGroupWrapper>
      <TitleRow>
        <Title level={2}>Your day</Title>
        <RowGap>
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
      {isEditMode && <TodayEditMode />}
      {!isEditMode && existingGroups.map(g => <TodayTaskGroup key={g.id} group={g} />)}
    </TodayTaskGroupWrapper>
  );
};

export default TodayDefault;
