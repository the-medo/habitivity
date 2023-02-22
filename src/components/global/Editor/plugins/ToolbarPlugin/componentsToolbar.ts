import styled from 'styled-components';
import { COLORS } from '../../../../../styles/CustomStyles';

interface ToolbarItemButtonProps {
  $active?: boolean;
}

export const ToolbarItemButton = styled.button<ToolbarItemButtonProps>`
  border: 0;
  display: flex;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
  vertical-align: middle;
  font-size: 18px;
  gap: 0.25rem;

  background-color: ${p => (p.$active ? COLORS.PRIMARY_LIGHT : '#fff')};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }

  &:hover:not([disabled]) {
    background-color: #eee;
  }
`;

export const Divider = styled.div`
  width: 1px;
  background-color: #eee;
  display: inline-block;
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1px;
  background: #fff;
  padding: 4px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #ccc;
  vertical-align: middle;
  gap: 2px;
`;

export const ToolbarSelect = styled.select`
  border: 0;
  display: flex;
  background: none;
  border-radius: 10px;
  padding: 8px;
  vertical-align: middle;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 70px;
  font-size: 14px;
  color: #777;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  &:focus {
    outline: none;
  }
`;
