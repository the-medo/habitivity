import React, { CSSProperties, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import {
  itemDeselect,
  itemSelect,
  setItemsSelected,
  setItemsSelectedInitialized,
  setLeftMenuAutomaticallyCollapsed,
  setMenuLeftItems,
  toggleLeftMenuManuallyCollapsed,
} from '../../../store/menuSlice';
import { useLeftMenu } from '../../../hooks/useLeftMenu';
import {
  BottomLabel,
  BottomPoints,
  BottomWrapper,
  LeftMenu,
  LeftSider,
  MenuCollapsor,
  MenuCollapsorIcon,
} from './MenuLeftComponents';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import LeftMenuItem from './LeftMenuItem';
import { LEFT_MENU_WIDTH, SIDER_COLLAPSED_SIZE } from '../../../styles/CustomStyles';
import DynamicIcon from '../../global/DynamicIcon';
import { useGetTaskGroupsByTaskListQuery } from '../../../apis/apiTaskGroup';
import { useSelectedTaskListId } from '../../../hooks/useSelectedTaskListId';
import { useGetCompletedDayQuery, useGetTasksByTaskListQuery } from '../../../apis/apiTasks';
import { MenuProps } from 'antd/es/menu';
import { useLeftMenuSelected } from '../../../hooks/useLeftMenuSelected';
import { AvailablePages } from '../../../routes/routerSlice';
import dayjs from 'dayjs';
import { formatPoints } from '../../../helpers/numbers/formatPoints';
import { Tooltip } from 'antd';
import { getDateLabel } from '../../../helpers/date/getDateLabel';

export interface MenuLeftItem {
  type: 'task-group' | 'task';
  key: string;
  label: string;
  icon?: string;
  points?: number;
  color?: CSSProperties['color'];
  isDefault?: boolean;
}

const parseMenuLeftItem = (item: MenuLeftItem): ItemType => {
  return {
    key: item.key,
    title: item.label,
    label: <LeftMenuItem item={item} />,
    className: `${item.type}-type`,
  };
};

const MenuLeft: React.FC = () => {
  const dispatch = useDispatch();

  const selectedTaskListId = useSelectedTaskListId();
  const { itemsSelectedInitialized, itemsSelectedArray } = useLeftMenuSelected();
  const { isLeftMenuCollapsed, isLeftMenuWithContent, leftMenuAutomaticallyCollapsed } =
    useLeftMenu();
  const items = useSelector((state: ReduxState) => state.menuReducer.items);
  const openedPage = useSelector((state: ReduxState) => state.router.openedPage);
  const selectedDateDay = useSelector((state: ReduxState) => state.dayReducer.selectedDate);

  const selectedDate = useMemo(
    () => (openedPage === AvailablePages.DAY ? selectedDateDay : dayjs().format('YYYY-MM-DD')),
    [selectedDateDay, openedPage],
  );

  const { data: existingGroups = [], isFetching: isFetchingTaskGroups } =
    useGetTaskGroupsByTaskListQuery(selectedTaskListId);
  const { data: existingTasks = [], isFetching: isFetchingTasks } =
    useGetTasksByTaskListQuery(selectedTaskListId);
  const { data: completedDay, isFetching: isFetchingCompletedDay } = useGetCompletedDayQuery({
    date: selectedDate,
  });

  const isReady = useMemo(
    () => !isFetchingTaskGroups && !isFetchingTasks && !isFetchingCompletedDay,
    [isFetchingTaskGroups, isFetchingTasks, isFetchingCompletedDay],
  );

  const taskListPoints = useMemo(
    () =>
      completedDay && selectedTaskListId ? completedDay.taskLists[selectedTaskListId] : undefined,
    [completedDay, selectedTaskListId],
  );

  const bottomLabel = useMemo(() => getDateLabel(selectedDate), [selectedDate]);

  useEffect(() => {
    if (isReady) {
      const menuItems: MenuLeftItem[] = existingGroups
        .map(g => {
          const result: MenuLeftItem[] = [];
          result.push({
            type: 'task-group',
            key: g.id,
            label: g.name,
            icon: g.icon,
            color: g.color,
            points: completedDay !== false ? completedDay?.taskGroups[g.id] : undefined,
          });

          existingTasks
            .filter(t => t.taskGroupId === g.id && t.isActive)
            .map(t => {
              let icon: MenuLeftItem['icon'] = 'RiCheckboxBlankCircleLine';
              let points: MenuLeftItem['points'] = undefined;

              if (completedDay !== false) {
                const completedDayTask = completedDay?.tasks[t.id];
                if (completedDayTask !== undefined) {
                  icon = 'BsCheck';
                  points = completedDayTask.points;
                }
              }

              result.push({
                type: 'task',
                key: t.id,
                label: t.taskName,
                points,
                icon, //'BsSquare', //BsCheckSquare
              });
            });

          return result;
        })
        .flat();

      if (!itemsSelectedInitialized) {
        const allGroups = existingGroups.map(g => g.id);
        console.log(allGroups);
        dispatch(setItemsSelectedInitialized(true));
        dispatch(setItemsSelected(allGroups));
      }
      dispatch(setMenuLeftItems(menuItems));
    }
  }, [
    dispatch,
    isReady,
    existingGroups,
    existingTasks,
    itemsSelectedInitialized,
    openedPage,
    selectedDate,
    completedDay,
  ]);

  const leftMenuItems = useMemo(() => items.map(i => parseMenuLeftItem(i)), [items]);

  const onBreakHandler = useCallback(
    (broken: boolean) => dispatch(setLeftMenuAutomaticallyCollapsed(broken)),
    [dispatch],
  );

  const onCollapseHandler = useCallback(
    () => dispatch(toggleLeftMenuManuallyCollapsed()),
    [dispatch],
  );

  //some weird problem with typing...
  const onSelectHandler: MenuProps['onSelect'] = useCallback(
    (x: { key: string }) => {
      dispatch(itemSelect(x.key));
    },
    [dispatch],
  );

  const onDeselectHandler: MenuProps['onSelect'] = useCallback(
    (x: { key: string }) => {
      dispatch(itemDeselect(x.key));
    },
    [dispatch],
  );

  if (!isLeftMenuWithContent) {
    return null;
  }

  return (
    <LeftSider
      width={`${LEFT_MENU_WIDTH}rem`}
      collapsedWidth={`${SIDER_COLLAPSED_SIZE}rem`}
      breakpoint="lg"
      onBreakpoint={onBreakHandler}
      collapsed={isLeftMenuCollapsed}
      $isCollapsed={isLeftMenuCollapsed}
      $isAutomaticallyCollapsed={leftMenuAutomaticallyCollapsed}
    >
      {leftMenuItems.length > 0 && (
        <LeftMenu
          mode="inline"
          multiple
          selectedKeys={itemsSelectedArray}
          items={leftMenuItems}
          onSelect={onSelectHandler}
          onDeselect={onDeselectHandler}
        />
      )}
      <BottomWrapper
        $isCollapsed={isLeftMenuCollapsed}
        $isAutomaticallyCollapsed={leftMenuAutomaticallyCollapsed}
      >
        <BottomLabel>
          <Tooltip title={new Date(selectedDate).toLocaleDateString()}>{bottomLabel}</Tooltip>
        </BottomLabel>
        <BottomPoints>{formatPoints(taskListPoints)}</BottomPoints>
      </BottomWrapper>
      {!leftMenuAutomaticallyCollapsed && (
        <MenuCollapsor $isCollapsed={isLeftMenuCollapsed} onClick={onCollapseHandler}>
          <MenuCollapsorIcon $isCollapsed={isLeftMenuCollapsed}>
            <DynamicIcon icon="AiOutlineDoubleLeft" showWrapper={false} />
          </MenuCollapsorIcon>
        </MenuCollapsor>
      )}
    </LeftSider>
  );
};

export default MenuLeft;
