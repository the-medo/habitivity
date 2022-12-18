import React, { useCallback, useMemo } from 'react';
import { Button, Form, Input, Tooltip } from 'antd';
import { DeleteOutlined, DragOutlined, MinusCircleOutlined, RestOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getLabelColWidth, getLabelOffsetSM, getLabelOffsetXS } from '../../../helpers/formHelpers';
import { COLORS } from '../../../styles/CustomStyles';
import { ReorderTaskGroupType } from './TaskGroupsForm';
import { validateTriggerDefault } from '../../../components/forms/AntdFormComponents';

interface TaskGroupInputProps {
  item: ReorderTaskGroupType;
  isFirst?: boolean;
  isDeleted?: boolean;
  removeFromItems?: (item: ReorderTaskGroupType) => void;
  returnToItems?: (item: ReorderTaskGroupType) => void;
}

const StyledInput = styled(Input)``;
const StyledInputGroup = styled(Input.Group)``;
const HandleIcon = styled(DragOutlined)``;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${HandleIcon} {
    transition: 0.3s all;
    cursor: grab;
    //opacity: 0;
  }

  &:hover ${HandleIcon} {
    opacity: 1;
  }

  svg {
    margin: 0.25rem;
  }

  ${StyledInputGroup} {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    ${StyledInput} svg {
      margin-left: -0.25rem;
    }

    ${HandleIcon} {
      font-size: 0.9rem;
      color: ${COLORS.GREY_MEDIUM};
    }

    &:hover ${HandleIcon} {
      color: ${COLORS.BLUE_GREY_DARK};
    }
  }
`;

const TaskGroupInput: React.FC<TaskGroupInputProps> = ({
  item,
  isFirst = false,
  isDeleted = false,
  removeFromItems,
  returnToItems,
}) => {
  const name = item.inputName;
  const taskGroup = item.taskGroup;
  const isNew = taskGroup === undefined;
  const initialValue = !isNew ? taskGroup.name : undefined;

  const labelCol = useMemo(() => ({ span: getLabelColWidth(isFirst) }), [isFirst]);
  const wrapperCol = useMemo(
    () => ({
      span: 18,
      sm: { offset: getLabelOffsetSM(isFirst) },
      xs: { offset: getLabelOffsetXS(isFirst) },
    }),
    [isFirst],
  );
  const rules = useMemo(
    () => [{ required: !isDeleted, message: `Please input name of task group or delete it` }],
    [isDeleted],
  );

  const returnToItemsHandler = useCallback(
    () => (returnToItems ? returnToItems(item) : undefined),
    [item, returnToItems],
  );
  const removeFromItemsHandler = useCallback(
    () => (removeFromItems ? removeFromItems(item) : undefined),
    [item, removeFromItems],
  );

  const deleteOutlinedIcon = useMemo(() => <DeleteOutlined />, []);
  const restOutlinedIcon = useMemo(() => <RestOutlined />, []);
  const minusCircleOutlinedIcon = useMemo(() => <MinusCircleOutlined />, []);
  const handleIcon = useMemo(() => <HandleIcon />, []);

  return (
    <Form.Item
      validateTrigger={validateTriggerDefault}
      label={isFirst && (isDeleted ? 'Will be deleted' : 'Groups')}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      // wrapperCol={ !isFirst ? { offset: 0, span: 18 } : undefined}
      colon={false}
      name={name}
      rules={rules}
      initialValue={initialValue}
      tooltip={isDeleted && 'You need to save changes to apply deletion of groups'}
    >
      <StyledRow>
        <StyledInputGroup compact>
          <StyledInput
            prefix={isDeleted ? deleteOutlinedIcon : handleIcon}
            placeholder="Task group name"
            defaultValue={initialValue}
            disabled={isDeleted}
          />
          {isDeleted && (
            <Tooltip placement="left" title="Restore">
              <Button onClick={returnToItemsHandler} icon={restOutlinedIcon}></Button>
            </Tooltip>
          )}
          {!isDeleted && isNew && (
            <Tooltip placement="left" title="Remove">
              <Button
                danger
                onClick={removeFromItemsHandler}
                icon={minusCircleOutlinedIcon}
              ></Button>
            </Tooltip>
          )}
          {!isDeleted && !isNew && (
            <Tooltip placement="left" title="Delete">
              <Button danger onClick={removeFromItemsHandler} icon={deleteOutlinedIcon}></Button>
            </Tooltip>
          )}
        </StyledInputGroup>
      </StyledRow>
    </Form.Item>
  );
};

export default TaskGroupInput;
