import { useSelector } from 'react-redux';
import { ReduxState } from '../store';

export const useSelectedTaskListId = (): string | undefined =>
  useSelector((state: ReduxState) => state.router.selectedTaskListId);
