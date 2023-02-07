import { HabitivityUser } from '../types/HabitivityUser';
import { RightDrawerStatus } from '../components/menu/DrawerRight/RightDrawer';
import { TaskDisplayMode } from '../components/global/TaskComponent/TaskComponent';
import { DashboardSubpage } from '../screens/Dashboard/dashboardSlice';
import { DateRange } from '../helpers/types/DateRange';
import { GroupsOrTasks } from '../types/GroupsOrTasks';
import { GraphView } from '../types/GraphView';

export enum LSKey {
  USER = '1',
  MENU_COLLAPSED = '2',
  RIGHT_DRAWER_COLLAPSED = '3',
  SELECTED_TASK_LIST_ID = '4',
  DAY_DISPLAY_MODE = '5',
  SELECTED_TASK_GROUPS = '6',
  SELECTED_DATE_SCREEN_DAY = '7',
  DASHBOARD_SUBPAGE = '8',
  SCREEN_SEGMENT_GRAPHS_VIEW = '12',
  SCREEN_DATERANGE = '9',
  SCREEN_SEGMENT_TASK_GROUP = '10',
  SCREEN_SEGMENT_GROUPS_OR_TASKS = '11',
  SCREEN_SEGMENT_TASK = '13',
}

export interface LSValues {
  [LSKey.USER]?: HabitivityUser;
  [LSKey.MENU_COLLAPSED]?: boolean;
  [LSKey.RIGHT_DRAWER_COLLAPSED]?: RightDrawerStatus;
  [LSKey.SELECTED_TASK_LIST_ID]?: string;
  [LSKey.DAY_DISPLAY_MODE]?: TaskDisplayMode;
  [LSKey.SELECTED_TASK_GROUPS]?: Record<string, boolean | undefined>;
  [LSKey.SELECTED_DATE_SCREEN_DAY]?: Record<string, string | undefined>;
  [LSKey.DASHBOARD_SUBPAGE]?: DashboardSubpage;
  [LSKey.SCREEN_DATERANGE]?: DateRange;
  [LSKey.SCREEN_SEGMENT_TASK_GROUP]?: string;
  [LSKey.SCREEN_SEGMENT_GROUPS_OR_TASKS]?: GroupsOrTasks;
  [LSKey.SCREEN_SEGMENT_GRAPHS_VIEW]?: GraphView;
  [LSKey.SCREEN_SEGMENT_TASK]?: string;
}

export function setItem<T extends LSKey>(key: T, value: LSValues[T]): void {
  if (value !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.removeItem(key);
  }
}

export function getItem<T extends LSKey>(key: T): LSValues[T] | undefined {
  const savedItem = localStorage.getItem(key);
  if (savedItem && savedItem !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return JSON.parse(savedItem) as LSValues[T];
  }
  return undefined;
}

export const setUser = (user: HabitivityUser | undefined): void => setItem(LSKey.USER, user);
export const getUser = (): HabitivityUser | undefined => getItem(LSKey.USER);
