import styled from "styled-components";

export const HelpListWrapper = styled.ul`
  list-style: none;
  border-radius: 8px;
  width: 212px;
  height: 272px;
  padding: 10px;
  margin: 0;
  background-color: ${({ theme }) => theme.helpListBackground};
`;

export const HelpListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  width: 100%;

  span {
    cursor: pointer;
  }
`;

export const HelpParagraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.42857;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.sidebarTextColor};
`;

export const Image = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const FlowerImage = styled.img`
  width: 54px;
  height: 78px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.modalTextColor};
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 10px;
  width: 10px;
  height: 10px;
  z-index: 100;

  &:hover {
    transform: scale(1.2);
    background-color: ${({ theme }) => theme.modalBackgroundColor};
  }
`;
