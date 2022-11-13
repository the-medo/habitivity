import React, {useCallback} from "react";
import {Form, Input, Spin} from "antd";
import {DeleteOutlined, MinusCircleOutlined} from "@ant-design/icons";
import {TaskGroup} from "../../../types/TaskGroup";
import styled from "styled-components";
import {useDeleteTaskGroupMutation} from "../../../store/apis/apiTaskGroup";


interface TaskGroupInputProps {
    position: number;
    isFirst: boolean;
    name: string | number;
    taskGroup?: TaskGroup;
    removeFromList?: (index: (number | number[])) => void
}

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  
  svg {
    margin: .25rem;
  }
`

const TaskGroupInput: React.FC<TaskGroupInputProps> = ({position, isFirst, name, taskGroup, removeFromList}) => {
    const alreadyExists = taskGroup && !removeFromList;
    const initialValue = alreadyExists ? taskGroup.name : undefined;
    const [deleteTaskGroup, { isLoading: isDeleting }] = useDeleteTaskGroupMutation();

    const onDelete = useCallback(() => {
        if (alreadyExists) {
            deleteTaskGroup(taskGroup.id);
        } else if (removeFromList) {
            removeFromList(+name);
        }
    }, [alreadyExists, removeFromList, taskGroup, name]);

    return (
        <Spin spinning={isDeleting}>
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
                        alreadyExists
                            ? <DeleteOutlined onClick={onDelete} />
                            : <MinusCircleOutlined onClick={onDelete} />
                    }
                </StyledRow>
            </Form.Item>
        </Spin>
    );
}

export default TaskGroupInput;