import { Dayjs } from 'dayjs';

export const dayjsToMinutes = (t: Dayjs): number => t.hour() * 60 + t.minute();
