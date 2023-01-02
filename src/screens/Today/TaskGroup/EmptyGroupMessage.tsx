import React from 'react';
import { Button } from 'antd';
import { icons, IconType } from '../../../components/icons/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
      <Link to={`new-task/${taskGroupId}`}>
        <Button icon={icons[IconType.PLUS_OUTLINED]}>Create task</Button>
      </Link>
    </EmptyGroupMessageWrapper>
  );
};

export default EmptyGroupMessage;
