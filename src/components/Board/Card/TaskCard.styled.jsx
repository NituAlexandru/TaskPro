import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.cardBackgroundColor};
  border-radius: 8px;
  width: 334px;
  height: 154px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  color: ${({ theme }) => theme.cardTextColor};
  cursor: grab;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const CardContentConteiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  height: 154px;
  width: 100%;
  color: ${({ theme }) => theme.cardTextColor};
`;

export const CardPriorityColor = styled.div`
  background-color: ${({ color }) => color};
  width: 8px;
  border-radius: 8px 0 0 8px;
`;

export const CardTitle = styled.h3`
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.cardTextColor};
  margin: 0;
`;

export const CardDescription = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.33333;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.cardTextSecondaryColor};
  margin: 0;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Priority = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  font-size: 14px;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 50%;
`;

export const PriorityType = styled.li`
  display: flex;
  flex-direction: column;
`;

export const PriorityItem = styled.div`
  font-size: 8px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.cardTextSecondaryColor};
`;
export const PriorityDate = styled.div`
  font-size: 10px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.cardTextColor};
`;

export const PriorityColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const PriorityColorOne = styled.div`
  background-color: ${({ color }) => color};
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;
export const PriorityColorTwo = styled.div`
  font-size: 10px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.cardTextColor};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    cursor: pointer;
    stroke-width: 1.3px;
    stroke: ${({ theme }) => theme.cardTextSecondaryColor};
    transition: transform 0.3s ease, stroke 0.3s ease;
    margin-top: 5px;

    &:hover {
      transform: scale(1.3);
      stroke: ${({ theme }) => theme.cardTextSecondaryColor};
    }
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  padding: 20px;
  border-radius: 8px;
`;