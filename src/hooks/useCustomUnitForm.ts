import { Form, FormInstance } from 'antd';
import { useMemo } from 'react';
import { UnitSyntax } from '../helpers/unitSyntaxHelpers';
import { UnitsFormFields } from '../components/forms/AntdFormComponents';

export const defaultUnitSyntax: UnitSyntax = {
  zero: '<units>', //units   seconds
  one: '<unit>', //unit    second
  twoAndMore: '<units>', //units   seconds
};

const initialUnits: UnitsFormFields = {
  unit0: undefined,
  unit1: undefined,
  unit2: undefined,
};

export function useCustomUnitForm<T extends UnitsFormFields>(form: FormInstance<T>): UnitSyntax {
  const formData = Form.useWatch<FormInstance<T | undefined>>([], form);

  const { unit0, unit1, unit2 } = formData ?? initialUnits;

  return useMemo(
    () => ({
      zero: unit0 === '' || !unit0 ? defaultUnitSyntax.zero : unit0,
      one: unit1 === '' || !unit1 ? defaultUnitSyntax.one : unit1,
      twoAndMore: unit2 === '' || !unit2 ? defaultUnitSyntax.twoAndMore : unit2,
    }),
    [unit0, unit1, unit2],
  );
}
