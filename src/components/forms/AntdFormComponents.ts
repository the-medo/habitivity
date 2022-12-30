import styled, { css } from 'styled-components';
import { ColProps, Form, FormRule } from 'antd';
import { ValidatorRule } from 'rc-field-form/lib/interface';
import { InternalFieldProps } from 'rc-field-form/lib/Field';

export interface FormItemProps {
  $isItalic?: boolean;
  $minWidth?: string;
  $width?: string;
}

export interface UnitsFormFields {
  unit0?: string;
  unit1?: string;
  unit2?: string;
}

export interface ModifierFields {
  modifierPercentage: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseTaskCreationFormFields extends ModifierFields {}

export const FormWrapper = styled.div`
  flex: 18 0 250px;
  padding: 1rem;

  form {
    max-width: 500px;
  }
`;

export const validateTriggerDefault: InternalFieldProps['validateTrigger'] = ['onChange', 'onBlur'];
export const ruleRequiredNoMessage: FormRule[] = [{ required: true, message: '' }];
export const colSpan6: ColProps | undefined = { span: 6 };
export const colSpan18: ColProps | undefined = { span: 18 };
export const wrapperColSpanMovedButton: ColProps | undefined = {
  span: 18,
  sm: { offset: 6 },
  xs: { offset: 0 },
};

export const changeableFieldValidator = (
  changeableFieldName: string,
  changeableFieldMinCount: number,
): ValidatorRule[] => [
  {
    validator: async (_, changeableField) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!changeableField || changeableField.length < changeableFieldMinCount)
        return Promise.reject(new Error(`At least 2 ${changeableFieldName} are required`));
    },
  },
];

export const FormItem = styled(Form.Item)<FormItemProps>`
  ${({ $minWidth }) =>
    $minWidth &&
    css`
      min-width: ${$minWidth};
    `};
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `};

  label {
    font-weight: bold;
  }
`;

export const FormInlineText = styled.div<FormItemProps>`
  display: inline-block;
  ${({ $isItalic }) =>
    $isItalic &&
    css`
      font-style: italic;
    `};
  ${({ $minWidth }) =>
    $minWidth &&
    css`
      min-width: ${$minWidth};
    `};
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `};
  margin-right: 0.25rem;
  line-height: 2rem;
`;

export const FormItemInline = styled(FormItem)`
  margin-bottom: 0;

  ${FormItem} {
    display: inline-block;
    margin-bottom: 0.5rem;
    margin-right: 0.25rem;

    label {
      font-weight: normal;
    }
  }
`;
