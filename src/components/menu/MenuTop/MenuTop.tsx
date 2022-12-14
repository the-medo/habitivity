import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Dropdown, DropdownProps } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSlider } from '../../../hooks/useSlider';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import UserAvatar from '../../global/UserAvatar';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import LogoWithTaskList from '../../global/LogoWithTaskList';
import { useSelectedTaskList } from '../../../hooks/useSelectedTaskList';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useGetTaskListsQuery } from '../../../apis/apiTaskList';
import {
  FullMenuWrapper,
  TopMenuLeftPart,
  TopMenuLeftPartWrapper,
  RightMenuWrapper,
  TopMenuHeader,
  TopMenuNavLink,
} from './MenuTopComponents';
import { width100percent } from '../../forms/AntdFormComponents';
import DynamicIcon from '../../global/DynamicIcon';

export const menuTopItemsLeftDefault: ItemType[] = [
  {
    key: 'today',
    label: (
      <TopMenuNavLink to="/today">
        <DynamicIcon icon="AiOutlineCarryOut" />
        Today
      </TopMenuNavLink>
    ),
  },
  {
    key: 'dashboard',
    label: (
      <TopMenuNavLink to="/dashboard">
        <DynamicIcon icon="AiOutlineLineChart" />
        Dashboard
      </TopMenuNavLink>
    ),
  },
  {
    key: 'calendar',
    label: (
      <TopMenuNavLink to="/calendar">
        <DynamicIcon icon="AiOutlineCalendar" />
        Calendar
      </TopMenuNavLink>
    ),
  },
];

export const menuTopItemsLeftWhenNoTaskList: ItemType[] = [
  {
    key: 'create-task-list',
    label: (
      <TopMenuNavLink to="/task-list/create">
        <DynamicIcon icon="AiOutlinePlus" />
        Create new task list
      </TopMenuNavLink>
    ),
  },
];

const DivPointerCursor = styled.div`
  cursor: pointer;
`;

const MenuTop: React.FC = () => {
  const { isLeftMenuCollapsed } = useSlider();
  const navigate = useNavigate();

  const { data: taskLists = [] } = useGetTaskListsQuery();

  // const taskLists = useSelector((state: ReduxState) => selectTaskLists(state));
  const selectedTaskListId = useSelector(
    (state: ReduxState) => state.taskReducer.selectedTaskListId,
  );
  const selectedTaskList = useSelectedTaskList();
  const [leftTopMenuItems, setLeftTopMenuItems] = useState<ItemType[]>(
    selectedTaskListId !== undefined ? menuTopItemsLeftDefault : menuTopItemsLeftWhenNoTaskList,
  );

  useEffect(() => {
    if (selectedTaskListId) {
      setLeftTopMenuItems(menuTopItemsLeftDefault);
    } else {
      setLeftTopMenuItems(menuTopItemsLeftWhenNoTaskList);
    }
  }, [selectedTaskListId, taskLists]);

  const logoutHandler = useCallback(() => {
    signOut(auth).then(() => navigate('/'));
  }, [navigate]);

  const taskListDropdownItems: ItemType[] = useMemo(() => {
    return taskLists
      .filter(tl => tl.id !== selectedTaskListId)
      .map(
        (tl): ItemType => ({
          label: tl.name,
          key: `tl-${tl.id}`,
          onClick: () => navigate(`/task-list/${tl.id}`),
          icon: <DynamicIcon icon="AiOutlineRight" />,
          style: { marginLeft: '.5rem' },
        }),
      )
      .concat(
        [
          {
            type: 'divider',
          },
        ],
        selectedTaskList
          ? [
              {
                label: (
                  <Button style={width100percent} icon={<DynamicIcon icon="AiOutlineEdit" />}>
                    Edit current task list
                  </Button>
                ),
                key: `tl-edit`,
                onClick: () => navigate(`/task-list/edit`),
              },
            ]
          : [],
        [
          {
            label: (
              <Button
                type="primary"
                style={width100percent}
                icon={<DynamicIcon icon="AiOutlinePlus" />}
              >
                Create new task list
              </Button>
            ),
            key: `tl-create`,
            onClick: () => navigate(`/task-list/create`),
          },
        ],
      );
  }, [navigate, selectedTaskList, selectedTaskListId, taskLists]);

  const dropdownTrigger: DropdownProps['trigger'] = useMemo(() => ['click', 'hover'], []);
  const dropdownLeftMenu: DropdownProps['menu'] = useMemo(
    () => ({ items: taskListDropdownItems }),
    [taskListDropdownItems],
  );
  const dropdownLeftAlign: DropdownProps['align'] = useMemo(
    () => ({ targetOffset: [0, isLeftMenuCollapsed ? 0 : -5] }),
    [isLeftMenuCollapsed],
  );

  const dropdownRightMenu: DropdownProps['menu'] = useMemo(
    () => ({
      items: [
        {
          label: 'Settings',
          key: '1',
          icon: <DynamicIcon icon="AiOutlineSetting" />,
          onClick: () => navigate('/settings'),
        },
        {
          type: 'divider',
        },
        {
          label: 'Logout',
          key: '3',
          icon: <DynamicIcon icon="AiOutlineLogout" />,
          onClick: logoutHandler,
        },
      ],
    }),
    [logoutHandler, navigate],
  );
  const dropdownRightAlign: DropdownProps['align'] = useMemo(() => ({ offset: [0, -1] }), []);
  const dropdownRightOverlayStyle: DropdownProps['overlayStyle'] = useMemo(
    () => ({ width: '200px' }),
    [],
  );

  return (
    <TopMenuHeader $isCollapsed={isLeftMenuCollapsed}>
      <FullMenuWrapper>
        <TopMenuLeftPartWrapper>
          <Dropdown trigger={dropdownTrigger} menu={dropdownLeftMenu} align={dropdownLeftAlign}>
            <DivPointerCursor>
              <LogoWithTaskList
                version={isLeftMenuCollapsed ? 'small' : 'big'}
                title={selectedTaskList?.name}
              />
            </DivPointerCursor>
          </Dropdown>
          <TopMenuLeftPart mode="horizontal" items={leftTopMenuItems} />
        </TopMenuLeftPartWrapper>
        <RightMenuWrapper>
          <Dropdown
            trigger={dropdownTrigger}
            menu={dropdownRightMenu}
            overlayStyle={dropdownRightOverlayStyle}
            align={dropdownRightAlign}
          >
            <DivPointerCursor>
              <UserAvatar />
            </DivPointerCursor>
          </Dropdown>
        </RightMenuWrapper>
      </FullMenuWrapper>
    </TopMenuHeader>
  );
};

export default MenuTop;
