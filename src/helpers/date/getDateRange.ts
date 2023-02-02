import { DateRange } from '../types/DateRange';
import dayjs, { Dayjs } from 'dayjs';

export const getDateRange = (dateRange: DateRange): Dayjs[] => {
  const { startDate, endDate } = dateRange;
  const dateRangeArray = [];
  let currentDate = dayjs(startDate);

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    dateRangeArray.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  return dateRangeArray;
};
