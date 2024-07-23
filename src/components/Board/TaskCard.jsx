import styled from "styled-components";
import { FiEdit, FiTrash2, FiArrowRightCircle } from "react-icons/fi";

const CardContainer = styled.div`
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

const CardContentConteiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  color: ${({ theme }) => theme.cardTextColor};
`;

const CardPriorityColor = styled.div`
  background-color: green;
  width: 8px;
  border-radius: 8px 0 0 8px;
`;

const CardTitle = styled.h3`
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.cardTextColor};
  margin: 0;
`;

const CardDescription = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.33333;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.cardTextSecondaryColor};
  margin: 0;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Priority = styled.ul`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  font-size: 14px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const PriorityType = styled.li`
  display: flex;
  flex-direction: column;
`;

const PriorityItem = styled.div`
  font-size: 8px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.cardTextSecondaryColor};
`;
const PriorityDate = styled.div`
  font-size: 10px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.cardTextColor};
`;

const PriorityColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PriorityColorOne = styled.div`
  background-color: red;
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;
const PriorityColorTwo = styled.div`
  font-size: 10px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.cardTextColor};
`;

const Actions = styled.div`
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

const Card = () => {
  return (
    <CardContainer>
      <CardPriorityColor></CardPriorityColor>
      <CardContentConteiner>
        <CardTitle>The Watch Spot Design</CardTitle>
        <CardDescription>
          Create a visually stunning and eye-catching watch dial design that
          embodies our brand&apos;s...
        </CardDescription>
        <CardFooter>
          <Priority>
            <PriorityType>
              <PriorityItem>Priority</PriorityItem>
              <PriorityColor>
                <PriorityColorOne></PriorityColorOne>
                <PriorityColorTwo>Medium</PriorityColorTwo>
              </PriorityColor>
            </PriorityType>
            <PriorityType>
              <PriorityItem>Deadline</PriorityItem>
              <PriorityDate>12/05/2023</PriorityDate>
            </PriorityType>
          </Priority>

          <Actions>
            <FiArrowRightCircle />
            <FiEdit />
            <FiTrash2 />
          </Actions>
        </CardFooter>
      </CardContentConteiner>
    </CardContainer>
  );
};

export default Card;
