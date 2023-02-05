import React from 'react';
import { ArrowDiv } from './ArrowDiv';
import { OverviewBox } from './OverviewBox';

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
