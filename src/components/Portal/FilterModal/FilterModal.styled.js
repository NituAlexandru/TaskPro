import styled from "styled-components";

export const FilterTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
  margin-top: 0;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 10px;
  display: flex;
`;

export const FilterOption = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color};
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 0;
  cursor: pointer;
`;

export const ColorIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 10px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    transform: scale(1.2);
    background-color: transparent;
  }
`;

export const ShowAllButton = styled.button`
  background: none;
  border: none;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.02em;
  text-decoration: underline;
  text-decoration-skip-ink: none;
  color: ${({ theme }) => theme.filterShowAllBtn};
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin: 0;
  margin-left: auto;

  &:hover {
    transform: scale(1.05);
    background-color: transparent;
  }
`;
