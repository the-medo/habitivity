import React, { useMemo } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/CustomStyles';
import dayjs from 'dayjs';

const DateDisplayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //border: 1px solid red;
  flex-grow: 1;
  gap: 0.5rem;
  color: ${COLORS.BLUE_GREY_DARK};
`;

const DDLabel = styled.span`
  font-size: 1rem;
`;

const DDPoints = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;

interface DateDisplayProps {
  date: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
  const day = useMemo(() => dayjs(date), [date]);

  return (
    <DateDisplayWrapper>
      <DDLabel>{day.format('ddd')}</DDLabel>
      <DDPoints>{day.format('D')}</DDPoints>
    </DateDisplayWrapper>
  );
};

export default DateDisplay;
