import styled from "styled-components";

const StyledComponent = styled.div`
  background: ${({ theme }) => theme.elementBackgroundColor};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
`;

const SomeComponent = () => {
  return <StyledComponent>Acesta este un component stilizat</StyledComponent>;
};

export default SomeComponent;
