import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { MenuLeftItem } from './MenuLeft';
import React, { CSSProperties } from 'react';
import { useSlider } from '../../../hooks/useSlider';
import { COLORS } from '../../../styles/CustomStyles';
import DynamicIcon from '../../global/DynamicIcon';
import { generate } from '@ant-design/colors';

export interface LeftMenuNavLinkStyledProps {
  $isCollapsed: boolean;
  $color?: CSSProperties['color'];
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
  color: ${p => (p.$color ? p.$color : COLORS.PRIMARY_DARK)} !important;

  & > ${LeftLinkIcon} > span[role='img'].anticon {
    height: 1rem;
    line-height: 1rem;

    padding-left: 0.1rem;
    padding-right: 0.1rem;
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
    background-color: ${p => (p.$color ? generate(p.$color)[0] : COLORS.PRIMARY_LIGHT)};
  }
`;

interface LeftMenuNavLinkProps {
  item: MenuLeftItem;
}

const LeftMenuItem: React.FC<LeftMenuNavLinkProps> = ({ item }) => {
  const { isLeftMenuCollapsed } = useSlider();

  return (
    <LeftMenuNavLinkStyled to={item.to} $isCollapsed={isLeftMenuCollapsed} $color={item.color}>
      <LeftLinkIcon>
        {item.icon && <DynamicIcon icon={item.icon} />}
        {!item.icon && isLeftMenuCollapsed && <DynamicIcon icon="AiOutlineRightCircle" />}
      </LeftLinkIcon>
      <LeftLinkLabel>{item.label}</LeftLinkLabel>
    </LeftMenuNavLinkStyled>
  );
};

export default LeftMenuItem;
