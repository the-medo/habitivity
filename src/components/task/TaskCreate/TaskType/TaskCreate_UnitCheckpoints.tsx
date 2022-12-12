import React, {useEffect} from "react";
import {Button, Form, Input} from "antd";
import {FormItem, SForm, FormWrapper, FormItemInline, FormInlineText} from "../../../forms/AntdFormComponents";
import {useDispatch} from "react-redux";
import {setExamples} from "../taskCreationSlice";
import CustomUnitDefinition from "./CustomUnitDefinition";
import {useCustomUnitForm} from "../../../../hooks/useCustomUnitForm";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {countableString, pointCountable} from "../../../../helpers/unitSyntaxHelpers";

const currentSetupExamples = (taskName: string = "Task name",): string[] => {
    const examples: string[] = [];
    examples.push(`Examples of your setup will be shown here after filling the form.`);
    return examples;
}

const TaskCreate_UnitCheckpoints: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const units = useCustomUnitForm(form);
    const taskName = Form.useWatch<string>('taskName', form);
    const checkpoints = Form.useWatch<({
        unitCountForPoint: string,
        pointCount: string,
    } | undefined )[]>('checkpoints', form);

    useEffect(() => {
        dispatch(setExamples(currentSetupExamples(taskName)));
    }, [taskName]);

    useEffect(() => {
        console.log(checkpoints);
    }, [checkpoints]);

    return (
        <FormWrapper>
            <SForm
                form={form}
                layout="vertical"
                name="new-task"
                requiredMark={false}
                colon={false}
                initialValues={{
                    checkpoints: [undefined],
                }}
            >
                <FormItem
                    label="Task name:"
                    name="taskName"
                    rules={[{ required: true, message: 'Please input name of your task!' }]}
                >
                    <Input placeholder="Task name" />
                </FormItem>
                <CustomUnitDefinition />
                <FormItem label="Units and points:">
                    <Form.List name="checkpoints">
                        {(fields, { add, remove,  },) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <FormItemInline key={key}>
                                        <FormInlineText $isItalic $minWidth="1rem">For</FormInlineText>
                                        <FormItem
                                            {...restField}
                                            $width="4rem"
                                            name={[name, 'unitCountForPoint']}
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder="2" type="number" />
                                        </FormItem>
                                        <FormInlineText $isItalic $minWidth="1rem"> <b>{ countableString(checkpoints[key]?.unitCountForPoint ?? 0, units) }</b> you will get  </FormInlineText>
                                        <FormItem
                                            {...restField}
                                            $width="4rem"
                                            name={[name, 'pointCount']}
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder="10" type="number" />
                                        </FormItem>
                                        <FormInlineText $isItalic $minWidth="1rem"> <b>{ countableString(checkpoints[key]?.pointCount ?? 0, pointCountable) }</b> </FormInlineText>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </FormItemInline>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add unit checkpoint
                                </Button>
                            </>
                        )}
                    </Form.List>
                </FormItem>
                <Button type="primary" htmlType="submit">Create</Button>
            </SForm>
        </FormWrapper>
    );
}

export default TaskCreate_UnitCheckpoints;