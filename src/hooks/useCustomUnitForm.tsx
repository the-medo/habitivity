import { Form, FormInstance } from 'antd';
import { useMemo } from 'react';
import { UnitSyntax } from '../helpers/unitSyntaxHelpers';

export function useCustomUnitForm(
  form: FormInstance,
  inputNames: string[] = ['unit0', 'unit1', 'unit2'],
): UnitSyntax {
  if (inputNames.length !== 3) throw Error('Input names array must have 3 elements');

  const unit0 = Form.useWatch<string | undefined>(inputNames[0], form);
  const unit1 = Form.useWatch<string | undefined>(inputNames[1], form);
  const unit2 = Form.useWatch<string | undefined>(inputNames[2], form);

  return useMemo(
    () => ({
      zero: unit0 === '' || !unit0 ? '<units>' : unit0,
      one: unit1 === '' || !unit1 ? '<unit>' : unit1,
      twoAndMore: unit2 === '' || !unit2 ? '<units>' : unit2,
    }),
    [unit0, unit1, unit2],
  );
}
