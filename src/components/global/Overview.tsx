import React, { MouseEventHandler } from 'react';
import { ArrowDiv } from './ArrowDiv';
import { OverviewBox } from './OverviewBox';

interface OverviewProps {
  arrowContent: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Overview: React.FC<OverviewProps> = ({ arrowContent, children, isActive, onClick }) => {
  return (
    <OverviewBox $hover={true} onClick={onClick} $isActive={isActive}>
      <ArrowDiv $height={5}>{arrowContent}</ArrowDiv>
      {children}
    </OverviewBox>
  );
};

export default Overview;
