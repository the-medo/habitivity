import styled, {css} from "styled-components";
import {Form, FormRule} from "antd";
import {ValidatorRule} from "rc-field-form/lib/interface";

export interface FormItemProps {
    $isItalic?: boolean;
    $minWidth?: string;
    $width?: string;
}

export const SForm = styled(Form)``;

export const FormWrapper = styled.div`  
  flex: 18 0 250px;  
  padding: 1rem;
  
  ${SForm}{
    max-width: 500px;
  }
`;

export const RuleRequiredNoMessage: FormRule[] = [{ required: true, message: '' }];

export const changeableFieldValidator = (changeableFieldName: string, changeableFieldMinCount: number): ValidatorRule[] => [
    {
        validator: async (_, changeableField) => {
            if (!changeableField || changeableField.length < changeableFieldMinCount) return Promise.reject(new Error(`At least 2 ${changeableFieldName} are required`));
        },
    },
];

export const FormItem = styled(Form.Item)<FormItemProps>`
  ${({$minWidth}) => $minWidth && css`min-width: ${$minWidth};` };
  ${({$width}) => $width && css`width: ${$width};` };

  label {
    font-weight: bold;
  }
`;

export const FormInlineText = styled.div<FormItemProps>`
  display: inline-block;
  ${({$isItalic}) => $isItalic && css`font-style: italic` };
  ${({$minWidth}) => $minWidth && css`min-width: ${$minWidth};` };
  ${({$width}) => $width && css`width: ${$width};` };
  margin-right: .25rem;
  line-height: 2rem;
`;


export const FormItemInline = styled(FormItem)`
  margin-bottom: 0;
  
  ${FormItem} {
    display: inline-block;
    margin-bottom: .5rem;
    margin-right: .25rem;

    label {
      font-weight: normal;
    }    
  }
`;