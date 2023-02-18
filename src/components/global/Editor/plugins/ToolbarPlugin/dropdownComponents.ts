import styled from 'styled-components';
import { COLORS } from '../../../../../styles/CustomStyles';

export const DropdownContainer = styled.div`
  z-index: 5;
  display: block;
  position: absolute;
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  min-width: 100px;
  min-height: 40px;
  background-color: #fff;
`;

interface DropdownItemProps {
  $active?: boolean;
}

export const DropdownItem = styled.button<DropdownItemProps>`
  margin: 0 8px 0 8px;
  padding: 8px;
  color: #050505;
  cursor: pointer;
  line-height: 16px;
  font-size: 15px;
  display: flex;
  align-content: center;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: space-between;
  border-radius: 8px;
  border: 0;
  min-width: 268px;
  background-color: ${p => (p.$active ? COLORS.PRIMARY_LIGHT : '#fff')};

  &:first-child {
    margin-top: 8px;
  }

  &:last-child {
    margin-bottom: 8px;
  }

  &:hover {
    background-color: #eee;
  }
`;

export const DropdownItemIcon = styled.span`
  display: flex;
  width: 20px;
  height: 20px;
  user-select: none;
  margin-right: 12px;
  line-height: 16px;
  background-size: contain;
`;

export const DropdownItemText = styled.span`
  display: flex;
  line-height: 20px;
  flex-grow: 1;
  width: 200px;
`;
