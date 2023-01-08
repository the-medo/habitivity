import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { MenuLeftItem } from './MenuLeft';
import React from 'react';
import { useSlider } from '../../../hooks/useSlider';
import { COLORS } from '../../../styles/CustomStyles';
import DynamicIcon from '../../global/DynamicIcon';

export interface LeftMenuNavLinkStyledProps {
  $isCollapsed: boolean;
}

const LeftLinkIcon = styled.span``;
const LeftLinkLabel = styled.span``;

export const LeftMenuNavLinkStyled = styled(NavLink)<LeftMenuNavLinkStyledProps>`
  border-radius: 0.5rem;
  padding: 0.5rem 0.25rem;

  display: flex;
  height: 2.25rem;

  font-size: 1rem;
  line-height: 1rem;
  transition: 0.3s all;

  align-items: center;
  justify-content: center;

  & > ${LeftLinkIcon} > span[role='img'].anticon {
    height: 1rem;
    line-height: 1rem;

    padding-left: 0.1rem;
    padding-right: 0.1rem;

    color: ${COLORS.PRIMARY_DARK};
  }

  ${LeftLinkLabel} {
    padding-left: 0.5rem;
    display: ${p => (p.$isCollapsed ? 'none' : 'flex')};
    width: calc(100% - 0.5rem);
    overflow: hidden;
    height: 100%;
    text-overflow: ellipsis;
    align-items: center;
  }

  &:hover,
  &[aria-current='page'].active {
    background-color: ${COLORS.PRIMARY_LIGHT};
  }
`;

interface LeftMenuNavLinkProps {
  item: MenuLeftItem;
}

const LeftMenuItem: React.FC<LeftMenuNavLinkProps> = ({ item }) => {
  const { isLeftMenuCollapsed } = useSlider();

  return (
    <LeftMenuNavLinkStyled to={item.to} $isCollapsed={isLeftMenuCollapsed}>
      <LeftLinkIcon>
        {item.icon && <DynamicIcon icon={item.icon} />}
        {!item.icon && isLeftMenuCollapsed && <DynamicIcon icon="AiOutlineRightCircle" />}
      </LeftLinkIcon>
      <LeftLinkLabel>{item.label}</LeftLinkLabel>
    </LeftMenuNavLinkStyled>
  );
};

export default LeftMenuItem;
