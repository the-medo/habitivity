export type PartialWithId<O extends { id: string }> = Partial<O> & Pick<O, 'id'>;
