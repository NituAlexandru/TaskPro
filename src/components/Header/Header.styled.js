import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.headerBackground};
  color: ${({ theme }) => theme.headerText};
  height: 60px;
  width: 100%;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const UserAvatar = styled.img`
  border-radius: 8px;
  width: 32px;
  height: 32px;
`;

export const UserName = styled.span`
  color: ${({ theme }) => theme.headerText};

  @media (max-width: 400px) {
    font-size: 14px;
    letter-spacing: -0.02em;
  }
`;
