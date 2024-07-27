import styled from "styled-components";
import Modal from "../Portal/Modal";
import HelpForm from "../Portal/HelpModal";
import { useState } from "react";

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

  span {
    cursor: pointer;
  }
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
  cursor: pointer;
`;

const FlowerImage = styled.img`
  width: 54px;
  height: 78px;
`;

const CloseButton = styled.button`
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

  z-index: 1000;

  &:hover {
    transform: scale(1.2);
    background-color: ${({ theme }) => theme.modalBackgroundColor};
  }
`;

const HelpList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // Send email logic here
    handleCloseModal();
  };

  return (
    <>
      <HelpListWrapper>
        <HelpListItem>
          <FlowerImage src="/src/assets/utils/flower.png" alt="happy flower" />
        </HelpListItem>
        <HelpListItem>
          <HelpParagraph>
            If you need help with <strong>TaskPro</strong>, check out our
            support resources or reach out to our customer support team.
          </HelpParagraph>
        </HelpListItem>
        <HelpListItem onClick={handleOpenModal}>
          <Image src="/src/assets/utils/help-circle.png" alt="help" />
          <span>Need help?</span>
        </HelpListItem>
      </HelpListWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        width="400px"
        height="355px"
        borderRadius="8px"
      >
        <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
        <HelpForm onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};

export default HelpList;
