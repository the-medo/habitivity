import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DynamicIcon from '../../../components/global/DynamicIcon';

interface EmptyGroupMessageProps {
  taskGroupId: string;
}

const EmptyGroupMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EmptyGroupMessage: React.FC<EmptyGroupMessageProps> = ({ taskGroupId }) => {
  return (
    <EmptyGroupMessageWrapper>
      <span>Oops, this group looks empty! </span>
      <Link to={`/new-task/${taskGroupId}`}>
        <Button icon={<DynamicIcon icon="AiOutlinePlus" />}>Create task</Button>
      </Link>
    </EmptyGroupMessageWrapper>
  );
};

export default EmptyGroupMessage;
