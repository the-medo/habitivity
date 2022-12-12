import React, {useEffect} from "react";
import {Button, Form, Input} from "antd";
import {FormItem, FormItemInline, FormInlineText, FormWrapper, SForm} from "../../../forms/AntdFormComponents";
import {useDispatch} from "react-redux";
import {setExamples} from "../taskCreationSlice";

const currentSetupExamples = (taskName: string = "Task name", pointCount: string): string[] => {
    const examples: string[] = [];
    examples.push(`Complete "${taskName}" to get ${pointCount !== '' ? pointCount : 'X'} points`);
    examples.push(`You don't lose any points for not completing this task`);
    return examples;
}

const TaskCreate_Checkbox: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const taskName = Form.useWatch<string>('taskName', form);
    const pointCount = Form.useWatch<string>('pointCount', form);

    useEffect(() => {
        dispatch(setExamples(currentSetupExamples(taskName, pointCount)));
    }, [taskName, pointCount]);

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
                    rules={[{ required: true, message: 'Please input name of your task!' }]}
                >
                    <Input placeholder="Task name" />
                </FormItem>
                <FormItemInline label="Units and points:">
                    <FormInlineText $isItalic $minWidth="1rem">Get</FormInlineText>
                    <FormItem $width="4rem" name="pointCount" rules={[{ required: true, message: '' }]} >
                        <Input placeholder="2" type="number" />
                    </FormItem>
                    <FormInlineText $isItalic $minWidth="1rem">points for completing this task</FormInlineText>
                </FormItemInline>
                <Button type="primary" htmlType="submit">Create</Button>
            </SForm>
        </FormWrapper>
    );
}

export default TaskCreate_Checkbox;