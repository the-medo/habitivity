import React, { useCallback } from 'react';
import { SegmentedLabeledOption } from 'antd/es/segmented';
import DynamicIcon from '../../components/global/DynamicIcon';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { DashboardSubpage } from './dashboardSlice';
import { useNavigate } from 'react-router-dom';
import { Segmented } from '../../components/global/Segmented';
import { RowGap } from '../../components/global/RowGap';
import styled from 'styled-components';

const segmentedOptions: SegmentedLabeledOption[] = [
  {
    label: 'Overview',
    value: DashboardSubpage.OVERVIEW,
    icon: <DynamicIcon icon="AiOutlineLineChart" />,
  },
  {
    label: 'Month',
    value: DashboardSubpage.MONTH,
    icon: <DynamicIcon icon="AiOutlineCalendar" />,
  },
  {
    label: 'Targets',
    value: DashboardSubpage.TARGETS,
    icon: <DynamicIcon icon="BiTask" />,
  },
];

const Wrapper = styled(RowGap)`
  align-items: center;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Title = styled.span`
  font-size: 120%;
`;

const DashboardSubpageSelector: React.FC = () => {
  const navigate = useNavigate();
  const subpage = useSelector((state: ReduxState) => state.dashboard.subpage);

  const handleSegmentedChange = useCallback(
    (value: SegmentedLabeledOption['value']) => {
      navigate(`${value}`);
    },
    [navigate],
  );

  return (
    <Wrapper>
      <Title>Dashboard view:</Title>
      {subpage && (
        <Segmented
          // block={true}
          options={segmentedOptions}
          onChange={handleSegmentedChange}
          value={subpage}
        />
      )}
    </Wrapper>
  );
};

export default DashboardSubpageSelector;
