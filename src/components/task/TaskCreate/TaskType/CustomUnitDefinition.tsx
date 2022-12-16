import React from 'react';
import {
  FormInlineText,
  FormItem,
  FormItemInline,
  ruleRequiredNoMessage,
} from '../../../forms/AntdFormComponents';
import { Input } from 'antd';

const CustomUnitDefinition: React.FC = () => {
  const labelWidth = '2.5rem';

  return (
    <FormItem label="Custom unit definition:">
      <FormInlineText $isItalic $minWidth="5rem">
        <b>Example</b> - reading a book with custom unit being <b>page</b>
      </FormInlineText>
      <FormItemInline>
        <FormInlineText $minWidth={labelWidth}>Zero </FormInlineText>
        <FormItemInline name="unit0" rules={ruleRequiredNoMessage}>
          <Input placeholder="units" />
        </FormItemInline>
        <FormInlineText $isItalic> (eg. zero &quot;pages&quot;) </FormInlineText>
      </FormItemInline>
      <FormItemInline>
        <FormInlineText $minWidth={labelWidth}>One </FormInlineText>
        <FormItemInline name="unit1" rules={ruleRequiredNoMessage}>
          <Input placeholder="unit" />
        </FormItemInline>
        <FormInlineText $isItalic> (eg. one &quot;page&quot;) </FormInlineText>
      </FormItemInline>
      <FormItemInline>
        <FormInlineText $minWidth={labelWidth}>More </FormInlineText>
        <FormItemInline name="unit2" rules={ruleRequiredNoMessage}>
          <Input placeholder="units" />
        </FormItemInline>
        <FormInlineText $isItalic> (eg. two and more &quot;pages&quot;) </FormInlineText>
      </FormItemInline>
    </FormItem>
  );
};

export default CustomUnitDefinition;
