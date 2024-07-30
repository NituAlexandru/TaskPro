import styled from "styled-components";

export const BoardListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

export const BoardListItem = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const BoardListItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const IconImage = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 10px;
`;

export const Paragraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.sidebarTextColor};
  margin: 0;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.sidebarTextColor};

    &:hover {
      color: ${({ theme }) => theme.sidebarTextColor};
    }
  }

  &.edit-button svg,
  &.delete-button svg {
    color: ${({ theme }) => theme.sidebarTextColor};
    background-color: transparent;
  }

  &:hover {
    background-color: transparent;
  }
`;
