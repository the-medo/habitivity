import styled, {css} from "styled-components";
import {Form} from "antd";

export interface FormItemProps {
    $isItalic?: boolean;
    $minWidth?: string;
    $width?: string;
}

export const FormWrapper = styled.div`
  //display: flex;
  flex-grow: 1;
`

export const FormItem = styled(Form.Item)<FormItemProps>`
  ${({$isItalic}) => $isItalic && css`font-style: italic` }
  ${({$minWidth}) => $minWidth && css`min-width: ${$minWidth};` };
  ${({$width}) => $width && css`width: ${$width};` };
`;

export const FormItemInline = styled(FormItem)`
  margin-bottom: 0;
  
  ${FormItem} {
    display: inline-block;
    margin-right: .25rem;
  }
`;