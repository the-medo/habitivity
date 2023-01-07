import styled from 'styled-components';

const ButtonWrapper = styled.div`
  button:not(:first-of-type) {
    margin-left: 0.5rem;
  }

  button:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`;

export default ButtonWrapper;
