import styled from "styled-components";

export const ColumnContainer = styled.div`
  background-color: ${({ theme }) => theme.columnBackground};
  border-radius: 8px;
  padding: 0;
  width: 347px;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 10px;
`;

export const ColumnSmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const ColumnTitleContainer = styled.div`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.elementBackgroundColor};
  margin: 0;
  border-radius: 8px;
  width: 334px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
`;

export const ColumnTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
`;
export const TitleButtonContainer = styled.div`
  display: flex;
  gap: 10px;

  svg {
    cursor: pointer;
    stroke: rgba(255, 255, 255, 0.5);
  }
`;

export const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 500px;
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;
  overflow-x: hidden;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #2d2d2d; /* adjust according to your theme */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555555; /* adjust according to your theme */
    border-radius: 10px;
    border: 2px solid #2d2d2d; /* adjust according to your theme */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #777777; /* adjust according to your theme */
  }
`;