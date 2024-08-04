import styled from "styled-components";

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.modalTextColor};
  margin: 0;
`;

export const CloseButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.modalTextColor};
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  margin: 0;

  &:hover {
    background-color: transparent;
    transform: scale(1.2);
  }
`;

export const ModalBody = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Input = styled.input`
  border: 1px solid #bedbb0;
  border-radius: 8px;
  width: 100%;
  height: 49px;
  box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  opacity: 0.4;
  margin: 0;
  padding: 10px;
  color: #797676;
`;

export const Section = styled.div``;

export const Icons = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1px;
  margin-top: 10px;
`;

export const Icon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
  border-radius: 8px;
  background-color: rgba(32, 32, 32, 0.2);

  img {
    width: 18px;
    height: 18px;
    transition: all 250ms ease-in-out;
    border: ${({ selected }) => (selected ? "2px solid #fff" : "none")};
  }

  &:hover {
    opacity: 1.2;
    transform: scale(1.2);
  }
`;

export const Backgrounds = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
  width: 270px;
`;

export const Background = styled.div`
  width: 28px;
  height: 28px;
  background: url(${({ src }) => src}) no-repeat center center;
  background-size: cover;
  border-radius: 8px;
  cursor: pointer;
  border: ${({ selected }) => (selected ? "2px solid #fff" : "none")};

  &:hover {
    opacity: 1.2;
    transform: scale(1.2);
  }
`;

export const CreateButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 6px;
  border: none;
  background-color: ${({ theme }) => theme.modalCreateBtnBackgroundColor};
  color: ${({ theme }) => theme.modalCreateBtnColor};
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  letter-spacing: -0.02em;
`;

export const CreateButtonAdd = styled.span`
  width: 28px;
  height: 28px;
  background-color: ${({ theme }) => theme.modalCreateBtnAddBackgroundColor};
  color: ${({ theme }) => theme.modalCreateBtnAddColor};
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-35%);
`;

export const SearchButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  color: ${({ theme }) => theme.modalTextColor};
  padding: 0;
  margin: 0;

  &:hover {
    color: ${({ theme }) => theme.modalTextColorHover};
    background-color: transparent;
  }

  &:focus {
    color: ${({ theme }) => theme.modalTextColorHover};
    background-color: transparent;
  }

  &:active {
    color: ${({ theme }) => theme.modalTextColorHover};
    background-color: transparent;
  }
`;
