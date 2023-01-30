import dayjs from 'dayjs';

export const getDateLabel = (d: string) => {
  const diff = dayjs(dayjs().format('YYYY-MM-DD')).diff(dayjs(d), 'day');
  if (diff === 0) {
    return 'Today';
  } else if (diff === 1) {
    return 'Yesterday';
  } else if (diff === -1) {
    return 'Tomorrow';
  } else {
    const day = Math.abs(diff) === 1 ? 'day' : 'days';
    if (diff < 0) {
      return `In ${Math.abs(diff)} ${day}`;
    }
    return `${diff} ${day} ago`;
  }
};
