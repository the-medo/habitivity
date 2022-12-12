import React from "react";
import {FormInlineText, FormItem, FormItemInline} from "../../../forms/AntdFormComponents";
import {Input} from "antd";

const CustomUnitDefinition: React.FC = () => {

    const labelWidth = '2.5rem';

    return (
        <FormItem label="Custom unit definition:" >
            <FormInlineText $isItalic $minWidth="5rem"><b>Example</b> - reading a book with custom unit being <b>page</b></FormInlineText>
            <FormItemInline>
                <FormInlineText $minWidth={labelWidth}>Zero </FormInlineText>
                <FormItemInline name="unit0" rules={[{ required: true }]}><Input placeholder="units" /></FormItemInline>
                <FormInlineText $isItalic> (eg. zero "pages") </FormInlineText>
            </FormItemInline>
            <FormItemInline>
                <FormInlineText $minWidth={labelWidth}>One </FormInlineText>
                <FormItemInline name="unit1" rules={[{ required: true }]}><Input placeholder="unit" /></FormItemInline>
                <FormInlineText $isItalic> (eg. one "page") </FormInlineText>
            </FormItemInline>
            <FormItemInline>
                <FormInlineText $minWidth={labelWidth}>More </FormInlineText>
                <FormItemInline name="unit2" rules={[{ required: true }]}><Input placeholder="units" /></FormItemInline>
                <FormInlineText $isItalic> (eg. two and more "pages") </FormInlineText>
            </FormItemInline>
        </FormItem>
    );
}

export default CustomUnitDefinition;