import dayjs, { Dayjs } from 'dayjs';

export const dayjsToMiddayDate = (d?: Dayjs): Date =>
  (d ?? dayjs()).hour(12).minute(0).second(0).toDate();
