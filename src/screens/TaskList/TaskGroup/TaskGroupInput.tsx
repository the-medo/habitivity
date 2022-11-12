import React, {useCallback} from "react";
import {Form, Input} from "antd";
import {DeleteOutlined, MinusCircleOutlined} from "@ant-design/icons";
import {TaskGroup} from "../../../types/TaskGroup";
import styled from "styled-components";


interface TaskGroupInputProps {
    position: number;
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

const TaskGroupInput: React.FC<TaskGroupInputProps> = ({position, name, taskGroup, remove}) => {
    const isExisting = taskGroup && !remove;

    const onDelete = useCallback(() => {

    }, [])

    return (
        <>
            <Form.Item
                wrapperCol={position > 0 ? { offset: 4, span: 14 } : undefined}
                validateTrigger={['onChange', 'onBlur']}
                label={position === 0 && "Task group name"}
                name={name}
                rules={[{ required: true, message: `Please input name of task group ${taskGroup ? '' : 'or delete it'}` }]}
                initialValue={taskGroup?.name}
            >
                <StyledRow>
                    <Input placeholder="Task group name" />
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