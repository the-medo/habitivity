import styled from 'styled-components';
import { Segmented as S } from 'antd';

export const Segmented = styled(S)`
  ${p => p.block && 'width: 100% !important;'}
  .ant-segmented-item-icon {
    margin-right: 0.5rem;
  }
`;
