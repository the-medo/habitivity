import styled from 'styled-components';

interface OverviewBoxProps {
  $hover?: boolean;
  $isActive?: boolean;
}

export const OverviewBox = styled.div<OverviewBoxProps>`
  display: flex;
  background-color: ${p => (p.$isActive ? '#ddd' : '#eee')};
  padding: 0.75rem;
  border-radius: 0.5rem;
  gap: 0.5rem;
  align-items: center;
  cursor: ${p => (p.$hover ? 'pointer' : 'default')};

  &:hover {
    background-color: ${p => (p.$hover ? '#dcdcdc' : 'auto')};
  }
`;

export const OverviewBoxColumn = styled(OverviewBox)`
  flex-direction: column;
  width: 100%;
`;
