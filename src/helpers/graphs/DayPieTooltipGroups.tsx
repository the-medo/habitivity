import React from 'react';
import { PieTooltipProps } from '@nivo/pie';
import { GroupRawData } from '../../screens/Day/TaskGroup/DayPieGraph';
import styled from 'styled-components';
import { COLORS } from '../../styles/CustomStyles';
import SimpleOverviewTaskGroup from '../../components/global/SimpleOverviewTaskGroup';

const TooltipWrapper = styled.div`
  background-color: #f3f3f3;
  color: ${COLORS.PRIMARY_DARK};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.5rem;
  align-items: center;
`;

const DayPieTooltipGroups: React.FC<PieTooltipProps<GroupRawData>> = e => {
  const t = e.datum;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!t.data?.tasks) return null;

  const completedDay = t.data.completedDay;

  return (
    <TooltipWrapper>
      <SimpleOverviewTaskGroup
        completedDay={completedDay}
        tasks={t.data.tasks}
        groupId={t.id}
        groupColor={t.color}
        groupName={t.label}
        groupIcon={t.data.icon}
      />
    </TooltipWrapper>
  );
};

export default DayPieTooltipGroups;
