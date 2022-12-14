import React, {useEffect} from "react";
import {Button, Form, Input} from "antd";
import {
    FormItem,
    SForm,
    FormWrapper,
    FormItemInline,
    FormInlineText,
    RuleRequiredNoMessage
} from "../../../forms/AntdFormComponents";
import {useDispatch} from "react-redux";
import {setExamples} from "../taskCreationSlice";
import CustomUnitDefinition from "./CustomUnitDefinition";
import {useCustomUnitForm} from "../../../../hooks/useCustomUnitForm";
import {countableString, pointCountable} from "../../../../helpers/unitSyntaxHelpers";

const currentSetupExamples = (taskName: string = "Task name",): string[] => {
    const examples: string[] = [];
    examples.push(`Examples of your setup will be shown here after filling the form.`);
    return examples;
}

const TaskCreate_Units: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const units = useCustomUnitForm(form);
    const taskName = Form.useWatch<string>('taskName', form);
    const unitCountForPoint = Form.useWatch<string>('unitCountForPoint', form);
    const pointCount = Form.useWatch<string>('pointCount', form);

    useEffect(() => {
        dispatch(setExamples(currentSetupExamples(taskName)));
    }, [taskName]);

    return (
        <FormWrapper>
            <SForm
                form={form}
                layout="vertical"
                name="new-task"
                requiredMark={false}
                colon={false}
            >
                <FormItem
                    label="Task name:"
                    name="taskName"
                    rules={RuleRequiredNoMessage}
                >
                    <Input placeholder="Task name" />
                </FormItem>
                <CustomUnitDefinition />
                <FormItemInline label="Units and points:">
                    <FormInlineText $isItalic $minWidth="1rem">Get</FormInlineText>
                    <FormItem $width="4rem" name="pointCount" rules={RuleRequiredNoMessage} >
                        <Input placeholder="2" type="number" />
                    </FormItem>
                    <FormInlineText $isItalic $minWidth="1rem">{countableString(pointCount, pointCountable)} for each</FormInlineText>
                    <FormItem $width="4rem" name="unitCountForPoint" rules={RuleRequiredNoMessage} >
                        <Input placeholder="10" type="number" />
                    </FormItem>
                    <FormInlineText $isItalic $minWidth="1rem"> <b>{countableString(unitCountForPoint, units)}</b> of "{taskName?.length > 0 ? taskName : `this action`}"</FormInlineText>
                </FormItemInline>
                <Button type="primary" htmlType="submit">Create</Button>
            </SForm>
        </FormWrapper>
    );
}

export default TaskCreate_Units;