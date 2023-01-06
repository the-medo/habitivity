import React from 'react';
import { Input, Typography } from 'antd';
import { TaskModifier } from '../../../types/Tasks';
import styled from 'styled-components';

const { Text } = Typography;

interface TaskModifiersProps {
  value: number;
  taskModifiers: TaskModifier;
}

const ModifiersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`;

const ModifiersTitle = styled(Text)``;

const ModifiersInput = styled(Input)`
  width: 4.5rem;
`;

const TaskModifiers: React.FC<TaskModifiersProps> = ({ value, taskModifiers }) => {
  if (!taskModifiers.percentageModifier) return null;

  return (
    <ModifiersWrapper>
      <ModifiersTitle strong> Modifiers: </ModifiersTitle>
      <ModifiersInput type="number" defaultValue={value} suffix="%" />
    </ModifiersWrapper>
  );
};

export default TaskModifiers;
