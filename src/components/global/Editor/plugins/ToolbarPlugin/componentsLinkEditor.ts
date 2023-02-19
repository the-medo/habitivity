import styled from 'styled-components';
import { COLORS } from '../../../../../styles/CustomStyles';

export const LinkEditor = styled.div`
  position: absolute;
  z-index: 100;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  max-width: 300px;
  width: 100%;
  opacity: 0;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  transition: opacity 0.5s;
`;

export const LinkEditorInput = styled.input`
  display: block;
  width: calc(100% - 1rem);
  height: 2.5rem;
  box-sizing: border-box;
  margin: 0.5rem 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  background-color: #eee;
  font-size: 1rem;
  color: rgb(5, 5, 5);
  border: 0;
  outline: 0;
  position: relative;
  font-family: inherit;
`;

export const LinkEditorDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 1rem);
  height: 2.5rem;
  box-sizing: border-box;
  margin: 0.5rem 0.5rem;
  padding: 0.25rem 0.25rem 0.25rem 0.5rem;
  border-radius: 0.5rem;
  background-color: #eee;
  font-size: 1rem;
  color: rgb(5, 5, 5);
  border: 0;
  outline: 0;
  position: relative;
  font-family: inherit;
`;

export const LinkEditorLink = styled.a`
  color: rgb(33, 111, 219);
  text-decoration: none;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 30px;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

export const LinkEditIcon = styled.button`
  display: flex;
  width: 2rem;
  height: 2rem;
  justify-content: center;
  align-items: center;

  background-color: ${COLORS.PRIMARY_LIGHT};
  border: 1px solid ${COLORS.PRIMARY_LIGHT};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.5rem;
  margin: 0;

  &:hover {
    background-color: ${COLORS.PRIMARY_LIGHT};
  }
`;
