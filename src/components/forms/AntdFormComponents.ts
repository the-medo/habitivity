import styled, {css} from "styled-components";
import {Form} from "antd";

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