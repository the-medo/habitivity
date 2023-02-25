import styled from 'styled-components';

export const EditorContainer = styled.div`
  //margin: 20px auto 20px auto;
  border: 1px solid #ddd;

  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-self: stretch;

  //max-width: 400px;
  color: #000;
  position: relative;
  line-height: 20px;
  font-weight: 400;
  text-align: left;
  border-radius: 10px 10px 2px 2px;
`;

export const EditorInner = styled.div`
  background: #fff;
  position: relative;
`;

export const Placeholder = styled.div`
  color: #999;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 15px;
  left: 10px;
  font-size: 15px;
  user-select: none;
  display: inline-block;
  pointer-events: none;
`;
