import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: ${({ theme }) =>
    theme.loaderBackground || "rgba(255, 255, 255, 0.7)"};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

export const Spinner = styled.div`
  border: 8px solid
    ${({ theme }) => theme.spinnerBorder || "rgba(0, 0, 0, 0.1)"};
  border-left-color: ${({ theme }) =>
    theme.spinnerBorderLeftColor || "#22a6b3"};
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: ${spin} 1.2s linear infinite;
`;
