import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../../styles/CustomStyles';
import {useSelector} from "react-redux";
import {ReduxState} from "../../../../store";

export type ExampleType = {
  key: string,
  example: string;
}

const Box = styled.div`
  flex: 1 1 250px;
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${COLORS.GREY_LIGHT};
  color: ${COLORS.PRIMARY_DARK};
  font-style: italic;
`;

const BoxTitle = styled.h3``;

const Example = styled.li`
  list-style: none;
  margin-bottom: 0.5rem;
`;

const ExampleBox: React.FC = () => {
  const { examples } = useSelector((state: ReduxState) => state.taskCreationReducer);
  if (examples.length === 0) return null;

  return (
    <Box>
      <BoxTitle>Current setup examples:</BoxTitle>
      {examples.map(e => (
        <Example key={e.key}>{e.example}</Example>
      ))}
    </Box>
  );
};

export default ExampleBox;
