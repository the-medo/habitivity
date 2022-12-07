import React, {useEffect, useState} from "react";
import {Button, Form, Input, Select} from "antd";
import {DurationUnits} from "../../../../types/Tasks";
import {FormItem, FormItemInline, FormWrapper} from "../../../forms/AntdFormComponents";
import ButtonWrapper from "../../../global/ButtonWrapper";
import ExampleBox from "./ExampleBox";

interface TaskCreate_DurationProps {

}

const currentSetupExamplesTaskTypeDuration = (taskName: string = "Task name", unitCountForPoint: number, pointCount: number, units: DurationUnits): string[] => {
    const examples: string[] = [];
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

    return examples;
}

const TaskCreate_Duration: React.FC<TaskCreate_DurationProps> = () => {
    const [form] = Form.useForm();

    const taskName = Form.useWatch<string>('taskName', form);
    const unitCountForPoint = Form.useWatch<string>('unitCountForPoint', form);
    const pointCount = Form.useWatch<string>('pointCount', form);
    const units = Form.useWatch<DurationUnits>('units', form);
    const [examples, setExamples] = useState<string[]>([]);

    useEffect(() => {
        if (unitCountForPoint && pointCount) {
            setExamples(currentSetupExamplesTaskTypeDuration(taskName, parseFloat(unitCountForPoint), parseFloat(pointCount), units));
        }
    }, [taskName, unitCountForPoint, pointCount, units])



    return (
        <FormWrapper>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                layout="horizontal"
                name="new-task"
                colon={false}
                initialValues={{
                    units: DurationUnits.MINUTE,
                }}
            >
                <Form.Item
                    label="Task name:"
                    name="taskName"
                    rules={[{ required: true, message: 'Please input name of your task!' }]}
                >
                    <Input placeholder="Task name" />
                </Form.Item>
                <FormItemInline label="Units and points:">
                    <FormItem label="Get" $isItalic $minWidth="1rem" />
                    <FormItem $width="4rem" name="pointCount" rules={[{ required: true, message: '' }]} >
                        <Input placeholder="2" type="number" />
                    </FormItem>
                    <FormItem label="points for each" $isItalic $minWidth="1rem" />
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
                    <FormItem label="of this action" $isItalic $minWidth="1rem" />
                </FormItemInline>
                <Form.Item wrapperCol={{ span: 20, sm: {offset: 4}, xs: {offset: 0} }}>
                    <ButtonWrapper>
                        <Button type="primary" htmlType="submit">Create</Button>
                    </ButtonWrapper>
                    <ExampleBox examples={examples} />
                </Form.Item>
            </Form>
        </FormWrapper>
    );
}

export default TaskCreate_Duration;