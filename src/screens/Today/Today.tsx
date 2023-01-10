import React, { useEffect } from 'react';
import { generatePath, Outlet } from 'react-router-dom';
import { MenuLeftItem } from '../../components/menu/MenuLeft/MenuLeft';
import { setMenuLeftItems } from '../../store/menuSlice';
import { useDispatch } from 'react-redux';
import { useSelectedTaskList } from '../../hooks/useSelectedTaskList';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';

const Today: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTaskListId = useSelectedTaskList()?.id ?? 'undefined';
  const { data: existingGroups = [], isLoading } =
    useGetTaskGroupsByTaskListQuery(selectedTaskListId);

  useEffect(() => {
    if (!isLoading) {
      const menuItems: MenuLeftItem[] = existingGroups.map(g => {
        return {
          key: `today${g.id}`,
          to: generatePath(`/today/:groupId`, { groupId: g.id }),
          label: g.name,
          childItems: [],
          icon: g.icon,
          color: g.color,
        };
      });
      dispatch(setMenuLeftItems(menuItems));
    }
  }, [isLoading, existingGroups, dispatch]);

  return <Outlet />;
};

export default Today;
