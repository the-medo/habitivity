import { ReduxState } from '../store';
import { useSelector } from 'react-redux';

interface SliderState {
  leftMenuAutomaticallyCollapsed: boolean;
  leftMenuManuallyCollapsed: boolean;
  isLeftMenuCollapsed: boolean;
  isLeftMenuWithContent: boolean;
}

export function useLeftMenu(): SliderState {
  const leftMenuAutomaticallyCollapsed = useSelector(
    (state: ReduxState) => state.menuReducer.leftMenuAutomaticallyCollapsed,
  );
  const leftMenuManuallyCollapsed = useSelector(
    (state: ReduxState) => state.menuReducer.leftMenuManuallyCollapsed,
  );
  const items = useSelector((state: ReduxState) => state.menuReducer.items);

  return {
    leftMenuAutomaticallyCollapsed,
    leftMenuManuallyCollapsed,
    isLeftMenuCollapsed: leftMenuAutomaticallyCollapsed || leftMenuManuallyCollapsed,
    isLeftMenuWithContent: items.length > 0,
  };
}
