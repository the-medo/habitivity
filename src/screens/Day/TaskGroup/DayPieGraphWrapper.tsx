import React, { useCallback, useMemo, useState } from 'react';
import DayPieGraph from './DayPieGraph';
import styled from 'styled-components';
import { Dayjs } from 'dayjs';
import DynamicIcon from '../../../components/global/DynamicIcon';
import { Segmented } from '../../../components/global/Segmented';
import { SegmentedLabeledOption } from 'antd/es/segmented';

const DayGraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
`;

export enum DayPieGraphDisplayType {
  GROUPS = 'groups',
  TASKS = 'tasks',
}

const segmentedOptions: SegmentedLabeledOption[] = [
  {
    label: 'Task groups',
    value: DayPieGraphDisplayType.GROUPS.toString(),
    icon: <DynamicIcon icon="AiOutlineGroup" />,
  },
  {
    label: 'Tasks',
    value: DayPieGraphDisplayType.TASKS.toString(),
    icon: <DynamicIcon icon="FaTasks" />,
  },
];

interface DayPieGraphWrapperProps {
  selectedDate?: Dayjs;
}

const DayPieGraphWrapper: React.FC<DayPieGraphWrapperProps> = ({ selectedDate }) => {
  const [displayTypeString, setDisplayTypeString] = useState<string>(DayPieGraphDisplayType.GROUPS);

  const displayType = useMemo(() => {
    if (displayTypeString === DayPieGraphDisplayType.GROUPS) return DayPieGraphDisplayType.GROUPS;
    return DayPieGraphDisplayType.TASKS;
  }, [displayTypeString]);

  const handleDisplayTypeChange = useCallback((value: SegmentedLabeledOption['value']) => {
    setDisplayTypeString(`${value}`);
  }, []);

  return (
    <DayGraphWrapper>
      <Segmented
        defaultValue={displayTypeString}
        options={segmentedOptions}
        onChange={handleDisplayTypeChange}
      />
      <DayPieGraph selectedDate={selectedDate} dayPieGraphDisplayType={displayType} />
    </DayGraphWrapper>
  );
};

export default DayPieGraphWrapper;
