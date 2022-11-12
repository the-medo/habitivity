import React, {useCallback} from "react";
import {Form, Input} from "antd";
import {DeleteOutlined, MinusCircleOutlined} from "@ant-design/icons";
import {TaskGroup} from "../../../types/TaskGroup";
import styled from "styled-components";


interface TaskGroupInputProps {
    position: number;
    isFirst: boolean;
    name: string | number;
    taskGroup?: TaskGroup;
    remove?: (index: (number | number[])) => void
}

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  
  svg {
    margin: .25rem;
  }
`

const TaskGroupInput: React.FC<TaskGroupInputProps> = ({position, isFirst, name, taskGroup, remove}) => {
    const alreadyExists = taskGroup && !remove;
    const initialValue = alreadyExists ? taskGroup.name : undefined;

    const onDelete = useCallback(() => {

    }, []);

    return (
        <>
            <Form.Item
                wrapperCol={!isFirst ? { offset: 4, span: 14 } : undefined}
                validateTrigger={['onChange', 'onBlur']}
                label={isFirst && (alreadyExists ? "Existing groups" : "New groups")}
                name={name}
                rules={[{ required: alreadyExists, message: `Please input name of task group or delete it` }]}
                initialValue={initialValue}
            >
                <StyledRow>
                    <Input placeholder="Task group name" defaultValue={initialValue} />
                    {
                        !remove
                            ? <DeleteOutlined onClick={onDelete} />
                            : <MinusCircleOutlined onClick={() => remove(+name)} />
                    }
                </StyledRow>
            </Form.Item>
        </>
    );
}

export default TaskGroupInput;