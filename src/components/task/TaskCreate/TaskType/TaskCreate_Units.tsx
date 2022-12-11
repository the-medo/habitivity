import React, {useEffect} from "react";
import {Button, Form, Input} from "antd";
import {DurationUnits} from "../../../../types/Tasks";
import {FormItem, SForm, FormWrapper} from "../../../forms/AntdFormComponents";
import {useDispatch} from "react-redux";
import {setExamples} from "./taskCreationSlice";

const currentSetupExamples = (taskName: string = "Task name",): string[] => {
    const examples: string[] = [];
    examples.push(`Examples of your setup will be shown here after filling the form.`);
    return examples;
}

const TaskCreate_Units: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const taskName = Form.useWatch<string>('taskName', form);

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
                <Button type="primary" htmlType="submit">Create</Button>
            </SForm>
        </FormWrapper>
    );
}

export default TaskCreate_Units;