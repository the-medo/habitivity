import React, { useMemo } from 'react';
import styled from 'styled-components';
import { OverviewBoxColumn } from './OverviewBox';
import { DateRange, dateRangeStringToDayjs } from '../../helpers/types/DateRange';
import { StyledStatistic } from './StyledStatistic';
import { RowGapCentered } from './RowGap';
import { SegmentedLabeledOption } from 'antd/es/segmented';
import { Segmented } from './Segmented';

const DateRow = styled.div`
  background-color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;

const DateRowDates = styled.span`
  font-weight: 500;
  font-size: 1.25rem;
`;

const DateRowDescription = styled.span`
  font-size: 0.9rem;
  font-style: italic;
`;

const segmentedUnitOptions: SegmentedLabeledOption[] = [
  {
    label: 'Show points',
    value: 'points',
  },
  {
    label: 'Show values',
    value: 'units',
  },
];

interface StatisticBoxProps {
  dateRange: DateRange;
  description?: string;
  units: string;
  total?: number | string;
  max?: number | string;
  average?: number | string;
  displayUnits?: boolean;
  setDisplayUnits?: (value: SegmentedLabeledOption['value']) => void;
}

const StatisticBoxDisplay: React.FC<StatisticBoxProps> = ({
  dateRange,
  description,
  units,
  total,
  max,
  average,
  displayUnits,
  setDisplayUnits,
}) => {
  const dates = useMemo(() => dateRangeStringToDayjs(dateRange), [dateRange]);

  return (
    <OverviewBoxColumn>
      <DateRow>
        <DateRowDates>
          {dates.startDate.format('MMMM DD')} - {dates.endDate.format('MMMM DD')}
        </DateRowDates>
        {description && <DateRowDescription>{description}</DateRowDescription>}
      </DateRow>

      {setDisplayUnits !== undefined && (
        <Segmented
          options={segmentedUnitOptions}
          onChange={setDisplayUnits}
          value={displayUnits ? 'units' : 'points'}
          block
        />
      )}
      <RowGapCentered>
        <StyledStatistic title="&nbsp;" value={`${units}:`} />
        {total !== undefined && <StyledStatistic title="Total" value={total} precision={2} />}
        {max !== undefined && <StyledStatistic title="Max" value={max} precision={2} />}
        {average !== undefined && <StyledStatistic title="Average" value={average} precision={2} />}
      </RowGapCentered>
    </OverviewBoxColumn>
  );
};

export default StatisticBoxDisplay;
