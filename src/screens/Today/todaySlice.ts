import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, LSKey, setItem } from '../../store/localStore';
import { TaskDisplayMode } from '../../components/global/TaskComponent/TaskComponent';
import { ReorderTask, TasksByGroup } from './TaskGroup/TodayEditMode';

interface SetEditItemsGroupPayload {
  taskGroupId: string;
  items: ReorderTask[];
}

interface SetEditItemsTaskPayload {
  taskGroupId: string;
  item: ReorderTask;
}

interface ChangeGroupOfEditItemPayload {
  originalTaskGroupId: string;
  newTaskGroupId: string;
  taskId: string;
}

export interface TodayState {
  isEditMode: boolean;
  displayMode: TaskDisplayMode;
  editItems: TasksByGroup;
}

const initialState: TodayState = {
  isEditMode: false,
  displayMode: getItem(LSKey.TODAY_DISPLAY_MODE) ?? TaskDisplayMode.BOXES,
  editItems: {},
};

export const todaySlice = createSlice({
  name: 'today',
  initialState,
  reducers: {
    toggleEditMode: state => {
      state.isEditMode = !state.isEditMode;
    },
    setDisplayMode: (state, action: PayloadAction<TaskDisplayMode>) => {
      setItem(LSKey.TODAY_DISPLAY_MODE, action.payload);
      state.displayMode = action.payload;
    },
    setEditItems: (state, action: PayloadAction<TasksByGroup>) => {
      state.editItems = action.payload;
    },
    setEditItemsGroup: (state, action: PayloadAction<SetEditItemsGroupPayload>) => {
      state.editItems[action.payload.taskGroupId] = action.payload.items;
    },
    setEditItemsTask: (state, action: PayloadAction<SetEditItemsTaskPayload>) => {
      state.editItems[action.payload.taskGroupId] = state.editItems[
        action.payload.taskGroupId
      ]?.map(t => {
        if (t.taskId === action.payload.item.taskId) {
          return action.payload.item;
        } else {
          return t;
        }
      });
    },
    setAdditionalActionToEditItem: (state, action: PayloadAction<SetEditItemsTaskPayload>) => {
      state.editItems[action.payload.taskGroupId] = [
        ...(state.editItems[action.payload.taskGroupId]?.filter(
          t => t.taskId !== action.payload.item.taskId,
        ) ?? []),
        action.payload.item,
      ];
    },
    changeGroupOfEditItem: (state, action: PayloadAction<ChangeGroupOfEditItemPayload>) => {
      const originalTaskGroup = state.editItems[action.payload.originalTaskGroupId];
      const newTaskGroup = state.editItems[action.payload.newTaskGroupId];
      if (originalTaskGroup && newTaskGroup) {
        //find original task and save its positions
        let indexToDelete = 0;
        let position = 0;
        let initialIndex = 0;
        const task = originalTaskGroup.find((t, i) => {
          const isCorrect = t.taskId === action.payload.taskId;
          if (isCorrect) {
            indexToDelete = i;
            position = t.position;
            initialIndex = t.initialIndex;
          }
          return isCorrect;
        });

        if (task) {
          //remove item from its original group
          originalTaskGroup.splice(indexToDelete, 1);
          //lower positions and initial indexes on tasks in original group, that were positioned after moved task
          originalTaskGroup.forEach(t => {
            if (t.initialIndex > initialIndex) t.initialIndex--;
            if (t.position > position) t.position--;
          });

          //calculate and set position in new group (it is added to the end)
          const newPosition = newTaskGroup.length + 1;
          task.position = newPosition;
          task.initialIndex = newPosition;
          newTaskGroup.push(task);
        }
      }
    },
  },
});

export const {
  toggleEditMode,
  setDisplayMode,
  setEditItems,
  setEditItemsGroup,
  setEditItemsTask,
  changeGroupOfEditItem,
} = todaySlice.actions;

export const todayReducer = todaySlice.reducer;
