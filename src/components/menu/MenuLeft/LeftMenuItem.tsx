import styled, { css } from 'styled-components';
import { MenuLeftItem } from './MenuLeft';
import React, { CSSProperties } from 'react';
import { useSlider } from '../../../hooks/useSlider';
import { COLORS } from '../../../styles/CustomStyles';
import DynamicIcon from '../../global/DynamicIcon';
import { generate } from '@ant-design/colors';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';

export interface LeftMenuNavLinkStyledProps {
  $isSubmenu: boolean;
  $isCollapsed: boolean;
  $isSelected: boolean;
  $color?: CSSProperties['color'];
}

const LeftLinkIcon = styled.span``;
const LeftLinkLabel = styled.span``;

export const LeftMenuItemStyled = styled.div<LeftMenuNavLinkStyledProps>`
  display: flex;
  border-radius: 0.5rem;
  transition: 0.3s all;
  align-items: center;
  justify-content: center;

  ${p =>
    p.$isSubmenu
      ? css`
          height: 1.75rem;
          font-size: 0.75rem;
          line-height: 0.75rem;
          padding: 0.25rem 0.25rem 0.25rem ${p.$isCollapsed ? 0.25 : 0.75}rem;
          background-color: transparent;
        `
      : css`
          height: 2.25rem;
          font-size: 1rem;
          line-height: 1rem;
          padding: 0.5rem 0.25rem;
          ${p.$isSelected &&
          css`
            background-color: ${p.$color ? generate(p.$color)[0] : COLORS.PRIMARY_LIGHT};
          `};

          &:hover,
          &[aria-current='page'].active {
            background-color: ${p.$color ? generate(p.$color)[0] : COLORS.PRIMARY_LIGHT};
          }
        `}

  color: ${p => (p.$color ? p.$color : COLORS.PRIMARY_DARK)} !important;

  ${LeftLinkLabel} {
    padding-left: 0.5rem;
    display: ${p => (p.$isCollapsed ? 'none' : 'flex')};
    width: calc(100% - 0.5rem);
    overflow: hidden;
    height: 100%;
    text-overflow: ellipsis;
    align-items: center;
  }
`;

interface LeftMenuNavLinkProps {
  item: MenuLeftItem;
}

const LeftMenuItem: React.FC<LeftMenuNavLinkProps> = ({ item }) => {
  const { isLeftMenuCollapsed } = useSlider();
  const isSelected =
    useSelector((state: ReduxState) => state.menuReducer.itemsSelected[item.key]) ?? false;

  return (
    <LeftMenuItemStyled
      $isCollapsed={isLeftMenuCollapsed}
      $color={item.color}
      $isSelected={isSelected}
      $isSubmenu={item.type === 'task'}
    >
      <LeftLinkIcon>
        {item.icon &&
          (item.type === 'task-group' || item.icon === 'BsCheck' || isLeftMenuCollapsed ? (
            <DynamicIcon icon={item.icon} />
          ) : (
            <DynamicIcon icon={item.icon} color="transparent" />
          ))}
        {!item.icon && isLeftMenuCollapsed && <DynamicIcon icon="AiOutlineRightCircle" />}
      </LeftLinkIcon>
      <LeftLinkLabel>{item.label}</LeftLinkLabel>
    </LeftMenuItemStyled>
  );
};

export default LeftMenuItem;
