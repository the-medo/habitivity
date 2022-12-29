import React from 'react';
import { FormInlineText, FormItem, FormItemInline } from '../../../forms/AntdFormComponents';
import { Switch } from 'antd';

const TaskModifiers: React.FC = () => {
  return (
    <FormItem label="Point modifiers:">
      <FormItemInline>
        <FormItemInline name="modifierPercentage" valuePropName="checked">
          <Switch />
        </FormItemInline>
        <FormInlineText> use percentage modifier </FormInlineText>
      </FormItemInline>
    </FormItem>
  );
};

export default TaskModifiers;
