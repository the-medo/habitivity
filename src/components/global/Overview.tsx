import React from 'react';
import styled from 'styled-components';
import { ArrowDiv } from './ArrowDiv';

const OverviewBox = styled.div`
  display: flex;
  background-color: #eee;
  padding: 1rem;
  border-radius: 0.5rem;
  gap: 0.5rem;
  align-items: center;
`;

interface OverviewProps {
  arrowContent: React.ReactNode;
  children: React.ReactNode;
}

const Overview: React.FC<OverviewProps> = ({ arrowContent, children }) => {
  return (
    <OverviewBox>
      <ArrowDiv $height={5}>{arrowContent}</ArrowDiv>
      {children}
    </OverviewBox>
  );
};

export default Overview;
