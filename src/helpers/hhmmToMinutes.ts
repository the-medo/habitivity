export const hhmmToMinutes = (t: string): number => {
  const [hours, minutes] = t.split(':').map(Number);
  return hours * 60 + minutes;
};
