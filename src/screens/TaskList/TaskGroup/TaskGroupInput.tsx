import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Form, FormInstance, Input, Tooltip } from 'antd';
import styled from 'styled-components';
import { getLabelColWidth, getLabelOffsetSM, getLabelOffsetXS } from '../../../helpers/formHelpers';
import { COLORS } from '../../../styles/CustomStyles';
import { ReorderTaskGroupType } from './TaskGroupsForm';
import { validateTriggerDefault } from '../../../components/forms/AntdFormComponents';
import DynamicIcon from '../../../components/global/DynamicIcon';
import ColorPicker from '../../../components/global/ColorPicker';

interface TaskGroupInputProps {
  item: ReorderTaskGroupType;
  isFirst?: boolean;
  isDeleted?: boolean;
  removeFromItems?: (item: ReorderTaskGroupType) => void;
  returnToItems?: (item: ReorderTaskGroupType) => void;
  form: FormInstance | undefined;
}

const StyledInput = styled(Input)``;
const StyledInputGroup = styled(Input.Group)``;
const HandleIcon = styled(DynamicIcon).attrs({ icon: 'AiOutlineDrag', small: true })``;

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
  form,
}) => {
  const name = item.inputName;
  const colorFieldName = `${item.inputName}-color`;
  const taskGroup = item.taskGroup;
  const isNew = taskGroup === undefined;
  const initialValue = !isNew ? taskGroup.name : undefined;

  const [color, setColor] = useState<CSSProperties['color']>(
    taskGroup?.color ?? COLORS.BLUE_GREY_DARK,
  );
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

  const deleteOutlinedIcon = useMemo(() => <DynamicIcon icon="AiOutlineDelete" />, []);
  const deleteSmallOutlinedIcon = useMemo(() => <DynamicIcon icon="AiOutlineDelete" small />, []);
  // const deleteOutlinedIcon = useMemo(() => <DeleteOutlined />, []);
  const restOutlinedIcon = useMemo(() => <DynamicIcon icon="AiOutlineRest" />, []);
  const minusCircleOutlinedIcon = useMemo(() => <DynamicIcon icon="AiOutlineMinusCircle" />, []);
  const handleIcon = useMemo(() => <HandleIcon />, []);

  useEffect(() => {
    form?.setFieldValue(colorFieldName, color);
  }, [color, form, colorFieldName]);

  return (
    <Form.Item
      validateTrigger={validateTriggerDefault}
      label={isFirst && (isDeleted ? 'Will be deleted' : 'Groups')}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      colon={false}
      name={name}
      rules={rules}
      initialValue={initialValue}
      tooltip={isDeleted && 'You need to save changes to apply deletion of groups'}
    >
      <StyledRow>
        <ColorPicker color={color} setColor={setColor} />
        <StyledInputGroup compact>
          <StyledInput
            prefix={isDeleted ? deleteSmallOutlinedIcon : handleIcon}
            placeholder="Task group name"
            defaultValue={initialValue}
            disabled={isDeleted}
          />
          {isDeleted && (
            <Tooltip placement="left" title="Restore">
              <Button onClick={returnToItemsHandler} icon={restOutlinedIcon} />
            </Tooltip>
          )}
          {!isDeleted && isNew && (
            <Tooltip placement="left" title="Remove">
              <Button danger onClick={removeFromItemsHandler} icon={minusCircleOutlinedIcon} />
            </Tooltip>
          )}
          {!isDeleted && !isNew && (
            <Tooltip placement="left" title="Delete">
              <Button danger onClick={removeFromItemsHandler} icon={deleteOutlinedIcon} />
            </Tooltip>
          )}
        </StyledInputGroup>
        <Form.Item noStyle name={colorFieldName} initialValue={color}>
          <Input type="hidden" />
        </Form.Item>
      </StyledRow>
    </Form.Item>
  );
};

export default TaskGroupInput;
