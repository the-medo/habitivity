import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export function providesList<R extends { id: string | number }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T,
  otherIdentifier?: string,
): { id: string | number; type: T }[] {
  return resultsWithIds
    ? [
        { type: tagType, id: `LIST${otherIdentifier ?? ''}` },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: `LIST${otherIdentifier ?? ''}` }];
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
});
