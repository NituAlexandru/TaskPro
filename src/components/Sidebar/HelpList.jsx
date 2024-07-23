import styled from "styled-components";

const HelpListWrapper = styled.ul`
  list-style: none;
  border-radius: 8px;
  width: 212px;
  height: 272px;
  padding: 10px;
  margin: 0;
  background-color: ${({ theme }) => theme.helpListBackground};
`;

const HelpListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  width: 100%;
`;

const HelpParagraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.42857;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.sidebarTextColor};
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
`;

const FlowerImage = styled.img`
  width: 54px;
  height: 78px;
`;

const HelpList = () => (
  <HelpListWrapper>
    <HelpListItem>
      <FlowerImage src="/src/assets/utils/flower.png" alt="happy flower" />
    </HelpListItem>
    <HelpListItem>
      <HelpParagraph>
        If you need help with <strong>TaskPro</strong>, check out our support
        resources or reach out to our customer support team.
      </HelpParagraph>
    </HelpListItem>
    <HelpListItem>
      <Image src="/src/assets/utils/help-circle.png" alt="help" />
      <span>Need help?</span>
    </HelpListItem>
  </HelpListWrapper>
);

export default HelpList;
