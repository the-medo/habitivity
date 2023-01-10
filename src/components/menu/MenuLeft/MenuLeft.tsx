import React, { CSSProperties, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import {
  setLeftMenuAutomaticallyCollapsed,
  toggleLeftMenuManuallyCollapsed,
} from '../../../store/menuSlice';
import { useSlider } from '../../../hooks/useSlider';
import { LeftMenu, LeftSider, MenuCollapsor, MenuCollapsorIcon } from './MenuLeftComponents';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import LeftMenuItem from './LeftMenuItem';
import { LEFT_MENU_WIDTH, SIDER_COLLAPSED_SIZE } from '../../../styles/CustomStyles';
import DynamicIcon from '../../global/DynamicIcon';

export interface MenuLeftItem {
  key: string;
  to: string;
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
  };
};

export type MenuLeftSubItem = Omit<MenuLeftItem, 'childItems'>;

const MenuLeft: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: ReduxState) => state.menuReducer.items);
  const { isLeftMenuCollapsed, isLeftMenuWithContent, leftMenuAutomaticallyCollapsed } =
    useSlider();

  const leftMenuItems = useMemo(() => items.map(i => parseMenuLeftItem(i)), [items]);

  const onBreakHandler = useCallback(
    (broken: boolean) => dispatch(setLeftMenuAutomaticallyCollapsed(broken)),
    [dispatch],
  );

  const onCollapseHandler = useCallback(
    () => dispatch(toggleLeftMenuManuallyCollapsed()),
    [dispatch],
  );

  console.log('MenuLeft render - isLeftMenuCollapsed', isLeftMenuCollapsed);

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
      {leftMenuItems.length > 0 && <LeftMenu mode="inline" items={leftMenuItems} />}
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
