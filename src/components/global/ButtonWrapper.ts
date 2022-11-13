import styled from "styled-components";

const ButtonWrapper = styled.div`
  button:not(:first-of-type) {
    margin-left: .5rem;
  }
  
  button:not(:last-of-type) {
    margin-right: .5rem;
  }
`;

export default ButtonWrapper;