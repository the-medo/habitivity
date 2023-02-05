import { getDateRange } from '../date/getDateRange';
import { DateRange } from '../types/DateRange';
import { CompletedDays } from '../types/CompletedDay';
import dayjs from 'dayjs';
import { getValueFromDay } from './getValueFromDay';

export interface DateRangeStats {
  max?: number;
  total?: number;
  avg?: number;
  count: number;
  dateRange: DateRange;
}

interface GetStatsInDateRangeParams {
  dateRange: DateRange;
  completedDaysData: CompletedDays;
  includeLastDay: boolean;
  selectedTaskListId: string;
  taskGroup: string;
  task: string;
  takeUnits: boolean;
}

export const getStatsInDateRange = ({
  dateRange,
  completedDaysData,
  includeLastDay = false,
  selectedTaskListId,
  taskGroup,
  task,
  takeUnits,
}: GetStatsInDateRangeParams): DateRangeStats => {
  let sum = 0;
  let count = 0;
  let max = 0;

  const range = { ...dateRange };

  if (!includeLastDay) {
    range.endDate = dayjs(dateRange.endDate).subtract(1, 'day').format('YYYY-MM-DD');
  }

  getDateRange(range).forEach(date => {
    const completedDay = completedDaysData[date.format('YYYY-MM-DD')];
    if (completedDay !== undefined) {
      const v = getValueFromDay(completedDay, selectedTaskListId, taskGroup, task, takeUnits);
      sum += v;
      count++;
      if (v > max) max = v;
    }
  });

  return {
    max,
    total: sum,
    avg: count > 0 ? sum / count : 0,
    count,
    dateRange: {
      startDate: range.startDate,
      endDate: range.endDate,
    },
  };
};
