import styled from 'styled-components';

export const OverviewBox = styled.div`
  display: flex;
  background-color: #eee;
  padding: 0.75rem;
  border-radius: 0.5rem;
  gap: 0.5rem;
  align-items: center;
`;

export const OverviewBoxColumn = styled(OverviewBox)`
  flex-direction: column;
`;
