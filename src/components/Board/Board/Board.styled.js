import styled from "styled-components";

export const BoardContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  img {
    height: 30px;
    width: 30px;
  }
`;

export const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddTitleFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  height: 100%;
  width: 100%;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #2d2d2d;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555555;
    border-radius: 10px;
    border: 2px solid #2d2d2d;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #777777;
  }
`;

export const FilterButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.body};
  }
  &:active {
    background-color: ${({ theme }) => theme.body};
  }

  &:focus {
    background-color: ${({ theme }) => theme.body};
    outline: none;
  }
`;