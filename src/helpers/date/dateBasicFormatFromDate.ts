import { Dayjs } from 'dayjs';

export const dateBasicFormatFromDayjs = (d: Dayjs): string => d.format('YYYY-MM-DD');
export const dateBasicFormatFromDate = (d: Date): string => d.toISOString().split('T')[0];
export const dateBasicFormatFromISOString = (d: string): string => d.split('T')[0];
