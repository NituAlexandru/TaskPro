import styled from "styled-components";

export const HomePageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

export const HomeParagraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.28571;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin: auto auto;
  max-width: 486px;
`;