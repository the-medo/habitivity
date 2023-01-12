import { ReduxState } from '../store';
import { useSelector } from 'react-redux';
import { MenuLeftState } from '../store/menuSlice';
import { useMemo } from 'react';

interface LeftMenuSelectedState {
  itemsSelectedInitialized: boolean;
  itemsSelected: MenuLeftState['itemsSelected'];
  itemsSelectedArray: string[];
}

export function useLeftMenuSelected(): LeftMenuSelectedState {
  const itemsSelectedInitialized = useSelector(
    (state: ReduxState) => state.menuReducer.itemsSelectedInitialized,
  );
  const itemsSelected = useSelector((state: ReduxState) => state.menuReducer.itemsSelected);

  return useMemo(
    () => ({
      itemsSelectedInitialized,
      itemsSelected,
      itemsSelectedArray: Object.keys(itemsSelected).filter(k => itemsSelected[k]),
    }),
    [itemsSelected, itemsSelectedInitialized],
  );
}
