import React from "react";
import {Button, Form, Input, Tooltip} from "antd";
import {DeleteOutlined, DragOutlined, MinusCircleOutlined, RestOutlined} from "@ant-design/icons";
import {TaskGroup} from "../../../types/TaskGroup";
import styled from "styled-components";
import {getLabelColWidth, getLabelOffsetSM, getLabelOffsetXS} from "../../../helpers/formHelpers";

interface TaskGroupInputProps {
    isFirst?: boolean;
    isDeleted?: boolean;
    name: string | number;
    taskGroup?: TaskGroup;
    removeFromItems?: () => void;
    returnToItems?: () => void;
}


const StyledInput = styled(Input)``;
const StyledInputGroup = styled(Input.Group)``;
const HandleIcon = styled(DragOutlined)``;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  .handle {
    transition: .3s all;
    cursor: grab;
    //opacity: 0;
  }
  
  &:hover .handle {
    opacity: 1;
  }

  svg {
    margin: .25rem;
  }
  
  ${StyledInputGroup} {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    ${StyledInput} svg {
      margin-left: -.25rem;
    }
    
    ${HandleIcon} {
      font-size: .9rem;
      color: #d9d9d9;
      //margin-left: -.5rem;
    }
    
    &:hover ${HandleIcon} {
      color: black;
    }
  }
  
`


const TaskGroupInput: React.FC<TaskGroupInputProps> = ({ isFirst = false, isDeleted= false, name, taskGroup, removeFromItems, returnToItems}) => {
    const isNew = taskGroup === undefined;
    const initialValue = !isNew && taskGroup ? taskGroup.name : undefined;


    return (
        <Form.Item
            validateTrigger={['onChange', 'onBlur']}
            label={isFirst && (isDeleted ? "Will be deleted" : "Groups")}
            labelCol={{span: getLabelColWidth(isFirst)}}
            wrapperCol={{span: 18, sm: {offset: getLabelOffsetSM(isFirst)}, xs: {offset: getLabelOffsetXS(isFirst)}}}
            // wrapperCol={ !isFirst ? { offset: 0, span: 18 } : undefined}
            colon={false}
            name={name}
            rules={[{ required: !isDeleted, message: `Please input name of task group or delete it` }]}
            initialValue={initialValue}
            tooltip={isDeleted && "You need to save changes to apply deletion of groups"}
        >
            <StyledRow>
                <StyledInputGroup compact>
                    <StyledInput
                        prefix={isDeleted ? <DeleteOutlined /> : <HandleIcon className="handle" /> }
                        placeholder="Task group name"
                        defaultValue={initialValue}
                        disabled={isDeleted}
                    />
                    {
                        isDeleted
                            ? <Tooltip placement="left" title="Restore"><Button onClick={returnToItems} icon={<RestOutlined />}></Button></Tooltip>
                            : (isNew
                                ? <Tooltip placement="left" title="Remove"><Button danger onClick={removeFromItems} icon={<MinusCircleOutlined />}></Button></Tooltip>
                                : <Tooltip placement="left" title="Delete"><Button danger onClick={removeFromItems} icon={<DeleteOutlined />}></Button></Tooltip>
                            )
                    }
                </StyledInputGroup>
            </StyledRow>
        </Form.Item>
    );
}

export default TaskGroupInput;