export const stringToPretty = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s+]/g, '')
    .replace(/\s+/g, '-');
