export type ArrayElement<ArrayType extends unknown[]> = ArrayType extends (infer ElementType)[]
  ? ElementType
  : never;
