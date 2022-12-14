import React, {useEffect, useMemo} from "react";
import {Button, Form, Input, TimePicker} from "antd";
import {
    FormInlineText,
    FormItem,
    FormItemInline,
    SForm,
    FormWrapper,
    RuleRequiredNoMessage, changeableFieldValidator
} from "../../../forms/AntdFormComponents";
import {useDispatch} from "react-redux";
import {setExamples} from "../taskCreationSlice";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {ValidatorRule} from "rc-field-form/lib/interface";

const currentSetupExamples = (taskName: string = "Task name",): string[] => {
    const examples: string[] = [];
    examples.push(`Examples of your setup will be shown here after filling the form.`);
    return examples;
}

const TaskCreate_Time: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const taskName = Form.useWatch<string>('taskName', form);
    const timepickerFormat = 'HH:mm';

    useEffect(() => {
        dispatch(setExamples(currentSetupExamples(taskName)));
    }, [taskName]);

    const checkpointValidator: ValidatorRule[] = useMemo(() => changeableFieldValidator('time points', 2), []);

    return (
        <FormWrapper>
            <SForm
                form={form}
                layout="vertical"
                name="new-task"
                requiredMark={false}
                colon={false}
                initialValues={{
                    checkpoints: [undefined, undefined],
                }}
            >
                <FormItem
                    label="Task name:"
                    name="taskName"
                    rules={[{ required: true, message: 'Please input name of your task!' }]}
                >
                    <Input placeholder="Task name" />
                </FormItem>
                <FormItem label="Units and points:">
                    <Form.List
                        name="checkpoints"
                        rules={checkpointValidator}
                    >
                        {(fields, { add, remove }, {errors}) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <FormItemInline key={key}>
                                        <FormInlineText $isItalic $minWidth="1rem">Get</FormInlineText>
                                        <FormItem
                                            {...restField}
                                            $width="4rem"
                                            name={[name, 'pointCount']}
                                            rules={RuleRequiredNoMessage}
                                        >
                                            <Input placeholder="2" type="number" />
                                        </FormItem>
                                        <FormInlineText $isItalic $minWidth="1rem">points when action is done at </FormInlineText>
                                        <FormItem
                                            {...restField}
                                            $width="6rem"
                                            name={[name, 'time']}
                                            rules={RuleRequiredNoMessage}
                                        >
                                            <TimePicker
                                                format={timepickerFormat}
                                                minuteStep={5}
                                                placeholder="06:00"
                                            />
                                        </FormItem>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </FormItemInline>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add time point
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </>
                        )}
                    </Form.List>
                </FormItem>
                <Button type="primary" htmlType="submit">Create</Button>
            </SForm>
        </FormWrapper>
    );
}

export default TaskCreate_Time;