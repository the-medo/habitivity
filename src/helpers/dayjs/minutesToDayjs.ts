import dayjs, {Dayjs} from "dayjs";

export const minutesToDayjs = (m: number): Dayjs => dayjs().hour(Math.floor(m / 60)).minute(m % 60);