import styled from "styled-components";

export const BoardContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-image: url(${(props) => props.$backgroundImage.desktop});
  background-size: cover;
  background-position: center;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    background-image: url(${(props) => props.$backgroundImage.tablet});
  }

  @media (max-width: 480px) {
    background-image: url(${(props) => props.$backgroundImage.mobile});
  }

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
  align-items: flex-start;
  background-color: ${({ theme }) => theme.cardBackgroundColor};
  padding: 5px 10px;
  border-radius: 8px;
  margin-bottom: 10px;

  h2 {
    margin: 0;
  }
`;

export const ColumnsContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  height: 100%;
  width: 100%;
`;

export const FilterButton = styled.button`
  background: none;
  border: none;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;
  margin-top: 0;
  height: 40px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  &:active {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  &:focus {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    outline: none;
  }
`;
