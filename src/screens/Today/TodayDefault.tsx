import React, { useCallback } from 'react';
import { useSelectedTaskList } from '../../hooks/useSelectedTaskList';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import styled from 'styled-components';
import TodayTaskGroup from './TaskGroup/TodayTaskGroup';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import Title from 'antd/es/typography/Title';
import { Button, Radio, RadioChangeEvent, Tooltip } from 'antd';
import { icons, IconType } from '../../components/icons/icons';
import { setDisplayMode, toggleEditMode } from './todaySlice';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { RowGap } from '../../components/global/RowGap';
import { TaskDisplayMode } from '../../components/global/TaskComponent/TaskComponent';

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
  const { data: existingGroups = [] } = useGetTaskGroupsByTaskListQuery(selectedTaskListId);

  const editModeHandler = useCallback(() => dispatch(toggleEditMode()), [dispatch]);
  const displayModeHandler = useCallback(
    (e: RadioChangeEvent) => dispatch(setDisplayMode(e.target.value)),
    [dispatch],
  );

  return (
    <TodayTaskGroupWrapper>
      <TitleRow>
        <Title level={2}>Your day</Title>
        <RowGap>
          {!isEditMode && (
            <Button onClick={editModeHandler} type="default" icon={icons[IconType.EDIT_OUTLINED]}>
              Edit mode
            </Button>
          )}
          {isEditMode && (
            <>
              <Button
                onClick={editModeHandler}
                type="primary"
                icon={icons[IconType.CHECK_OUTLINED]}
              >
                Save and continue
              </Button>
              <Tooltip title="Close">
                <Button
                  onClick={editModeHandler}
                  type="default"
                  danger
                  icon={icons[IconType.CLOSE_OUTLINED]}
                />
              </Tooltip>
            </>
          )}
          <Radio.Group defaultValue={displayMode} buttonStyle="solid" onChange={displayModeHandler}>
            <Tooltip title="Box mode">
              <Radio.Button value={TaskDisplayMode.BOXES}>
                <AppstoreOutlined />
              </Radio.Button>
            </Tooltip>
            <Tooltip title="Row mode">
              <Radio.Button value={TaskDisplayMode.ROWS}>
                <BarsOutlined />
              </Radio.Button>
            </Tooltip>
          </Radio.Group>
        </RowGap>
      </TitleRow>

      {existingGroups.map(g => (
        <TodayTaskGroup key={g.id} group={g} />
      ))}
    </TodayTaskGroupWrapper>
  );
};

export default TodayDefault;
