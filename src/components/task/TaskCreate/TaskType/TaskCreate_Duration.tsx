import React, {useEffect} from "react";
import {Button, Form, Input, Select} from "antd";
import {DurationUnits} from "../../../../types/Tasks";
import {FormItem, FormItemInline, FormInlineText, FormWrapper, SForm} from "../../../forms/AntdFormComponents";
import {useDispatch} from "react-redux";
import {setExamples} from "./taskCreationSlice";

const currentSetupExamples = (taskName: string = "Task name", unitCountForPoint: number | undefined, pointCount: number | undefined, units: DurationUnits): string[] => {
    const examples: string[] = [];
    if (unitCountForPoint && pointCount) {
        if (units === DurationUnits.MINUTE) {
            console.log(typeof unitCountForPoint);

            if (pointCount !== 1) {
                examples.push(`Get ${1} point for ${(unitCountForPoint / pointCount).toFixed(2)} minutes of "${taskName}"`);
            }
            examples.push(`Get ${(pointCount).toFixed(2)} point for ${(unitCountForPoint).toFixed(2)} minutes of "${taskName}"`);
            examples.push(`Get ${(pointCount*2).toFixed(2)} points for ${(unitCountForPoint*2).toFixed(2)} minutes of "${taskName}"`);
            examples.push(`For one hour of "${taskName}", get ${(60 / unitCountForPoint * pointCount).toFixed(2)} points`);
            examples.push(`For one minute of "${taskName}", get ${(1 / unitCountForPoint * pointCount).toFixed(2)} points`);
        }
    } else {
        examples.push(`Examples of your setup will be shown here after filling the form.`);
    }

    return examples;
}

const TaskCreate_Duration: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const taskName = Form.useWatch<string>('taskName', form);
    const unitCountForPoint = Form.useWatch<string>('unitCountForPoint', form);
    const pointCount = Form.useWatch<string>('pointCount', form);
    const units = Form.useWatch<DurationUnits>('units', form);

    useEffect(() => {
        dispatch(setExamples(currentSetupExamples(taskName, parseFloat(unitCountForPoint), parseFloat(pointCount), units)));
    }, [taskName, unitCountForPoint, pointCount, units]);

    return (
        <FormWrapper>
            <SForm
                form={form}
                layout="vertical"
                name="new-task"
                requiredMark={false}
                colon={false}
                initialValues={{
                    units: DurationUnits.MINUTE,
                }}
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
                    <FormInlineText $isItalic $minWidth="1rem">points for each</FormInlineText>
                    <FormItem $width="4rem" name="unitCountForPoint" rules={[{ required: true, message: '' }]} >
                        <Input placeholder="15" type="number" />
                    </FormItem>
                    <FormItem name="units" $width="8rem">
                        <Select disabled={false}>
                            <Select.Option value={DurationUnits.HOUR}>Hours</Select.Option>
                            <Select.Option value={DurationUnits.MINUTE}>Minutes</Select.Option>
                            <Select.Option value={DurationUnits.SECOND}>Seconds</Select.Option>
                        </Select>
                    </FormItem>
                    <FormInlineText $isItalic $minWidth="1rem">of this action</FormInlineText>
                </FormItemInline>
                <Button type="primary" htmlType="submit">Create</Button>
            </SForm>
        </FormWrapper>
    );
}

export default TaskCreate_Duration;