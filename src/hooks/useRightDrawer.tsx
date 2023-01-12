import { ReduxState } from '../store';
import { useSelector } from 'react-redux';
import { RightDrawerStatus } from '../components/menu/DrawerRight/RightDrawer';

interface SliderState {
  rightDrawerStatus: RightDrawerStatus;
  isRightDrawerCollapsed: boolean;
  isRightDrawerHidden: boolean;
}

export function useRightDrawer(): SliderState {
  const rightDrawerStatus = useSelector((state: ReduxState) => state.menuReducer.rightDrawerStatus);

  return {
    rightDrawerStatus,
    isRightDrawerCollapsed: ['collapsed', 'automaticallyCollapsed'].includes(rightDrawerStatus),
    isRightDrawerHidden: rightDrawerStatus === 'hidden',
  };
}
