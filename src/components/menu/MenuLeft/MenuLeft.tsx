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
import { LeftMenu, LeftSider, MenuCollapsor, MenuCollapsorIcon } from './MenuLeftComponents';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import LeftMenuItem from './LeftMenuItem';
import { LEFT_MENU_WIDTH, SIDER_COLLAPSED_SIZE } from '../../../styles/CustomStyles';
import DynamicIcon from '../../global/DynamicIcon';
import { useGetTaskGroupsByTaskListQuery } from '../../../apis/apiTaskGroup';
import { useSelectedTaskListId } from '../../../hooks/useSelectedTaskListId';
import { useGetTasksByTaskListQuery } from '../../../apis/apiTasks';
import { MenuProps } from 'antd/es/menu';
import { useLeftMenuSelected } from '../../../hooks/useLeftMenuSelected';

export interface MenuLeftItem {
  type: 'task-group' | 'task';
  key: string;
  label: string;
  icon?: string;
  color?: CSSProperties['color'];
  isDefault?: boolean;
  childItems: MenuLeftSubItem[];
}

const parseMenuLeftItem = (item: MenuLeftItem): ItemType => {
  return {
    key: item.key,
    title: item.label,
    label: <LeftMenuItem item={item} />,
    className: `${item.type}-type`,
  };
};

export type MenuLeftSubItem = Omit<MenuLeftItem, 'childItems'>;

const MenuLeft: React.FC = () => {
  const dispatch = useDispatch();

  const selectedTaskListId = useSelectedTaskListId();
  const { data: existingGroups = [], isFetching: isFetchingTaskGroups } =
    useGetTaskGroupsByTaskListQuery(selectedTaskListId);
  const { data: existingTasks = [], isFetching: isFetchingTasks } =
    useGetTasksByTaskListQuery(selectedTaskListId);

  const items = useSelector((state: ReduxState) => state.menuReducer.items);
  const { itemsSelectedInitialized, itemsSelectedArray } = useLeftMenuSelected();

  const { isLeftMenuCollapsed, isLeftMenuWithContent, leftMenuAutomaticallyCollapsed } =
    useLeftMenu();

  const isReady = useMemo(
    () => !isFetchingTaskGroups && !isFetchingTasks,
    [isFetchingTaskGroups, isFetchingTasks],
  );

  useEffect(() => {
    if (isReady) {
      const menuItems: MenuLeftItem[] = existingGroups
        .map(g => {
          const result: MenuLeftItem[] = [];
          result.push({
            type: 'task-group',
            key: g.id,
            label: g.name,
            childItems: [],
            icon: g.icon,
            color: g.color,
          });

          existingTasks
            .filter(t => t.taskGroupId === g.id && t.isActive)
            .map(t => {
              result.push({
                type: 'task',
                key: t.id,
                label: t.taskName,
                childItems: [],
                icon: Math.random() < 0.5 ? 'RiCheckboxBlankCircleLine' : 'BsCheck', //'BsSquare', //BsCheckSquare
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
  }, [dispatch, isReady, existingGroups, existingTasks, itemsSelectedInitialized]);

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
