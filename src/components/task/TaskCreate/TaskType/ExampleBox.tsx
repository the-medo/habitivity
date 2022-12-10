import React from "react";
import styled from "styled-components";
import {COLORS} from "../../../../styles/CustomStyles";

interface ExampleBoxProps {
    examples: string[];
}

const Box = styled.div`
  flex: 1 1 250px;
  
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${COLORS.GREY_LIGHT};
  color: ${COLORS.PRIMARY_DARK};
  font-style: italic;
`

const BoxTitle = styled.h3``

const Example = styled.li`
  list-style: none;
`

const ExampleBox: React.FC<ExampleBoxProps> = ({examples}) => {
    if (examples.length === 0) return null;

    return (
        <Box>
            <BoxTitle>Current setup examples:</BoxTitle>
            {examples.map(e => <Example key={null}>{e}</Example>)}
        </Box>
    );
}

export default ExampleBox;