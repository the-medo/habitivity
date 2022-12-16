const alphanumericCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const generateID = (
  len: number,
  template: string | undefined = undefined,
  allowedChars: string = alphanumericCharacters,
): string =>
  (template ?? Array(len).fill('x').join('')).replace(
    /x/g,
    () => allowedChars[Math.floor(Math.random() * allowedChars.length)],
  );
