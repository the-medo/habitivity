import dayjs, { Dayjs } from 'dayjs';

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface DateRangeDayjs {
  startDate: Dayjs;
  endDate: Dayjs;
}

export const dateRangeStringToDayjs = (dateRange: DateRange): DateRangeDayjs => {
  return {
    startDate: dayjs(dateRange.startDate),
    endDate: dayjs(dateRange.endDate),
  };
};

export const dateRangeDayjsToString = (dateRange: DateRangeDayjs): DateRange => {
  return {
    startDate: dateRange.startDate.format('YYYY-MM-DD'),
    endDate: dateRange.endDate.format('YYYY-MM-DD'),
  };
};
