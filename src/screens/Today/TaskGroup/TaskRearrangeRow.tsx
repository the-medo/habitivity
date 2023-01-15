import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { ReorderTask } from './TodayEditMode';
import TaskGroupSelect from '../../../components/global/TaskGroupSelect/TaskGroupSelect';
import { FormItem, validateTriggerDefault } from '../../../components/forms/AntdFormComponents';
import { Input } from 'antd';
import DynamicIcon from '../../../components/global/DynamicIcon';
import { COLORS } from '../../../styles/CustomStyles';

const StyledInput = styled(Input)``;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.25rem;
  gap: 0.5rem;

  ${FormItem} {
    margin-bottom: 0;
    width: 20rem;
  }

  &:hover {
    background-color: ${COLORS.PRIMARY_LIGHT};
  }
`;

interface TaskRearrangeRowProps {
  taskReorder: ReorderTask;
  taskGroupId: string;
}

const HandleIcon = styled(DynamicIcon).attrs({ icon: 'AiOutlineDrag', small: true })``;

const TaskRearrangeRow: React.FC<TaskRearrangeRowProps> = ({ taskReorder, taskGroupId }) => {
  const onChangeHandler = useCallback(() => {}, []);
  const handleIcon = useMemo(() => <HandleIcon />, []);
  const initialValue = taskReorder.taskName;
  const rules = useMemo(() => [{ required: true, message: `Please input name of task` }], []);

  return (
    <RowWrapper>
      <FormItem
        name={taskReorder.taskId}
        validateTrigger={validateTriggerDefault}
        colon={false}
        rules={rules}
        initialValue={initialValue}
      >
        <StyledInput prefix={handleIcon} placeholder="Task name" />
      </FormItem>
      <TaskGroupSelect value={taskGroupId} onChangeHandler={onChangeHandler} />
    </RowWrapper>
  );
};

export default TaskRearrangeRow;
