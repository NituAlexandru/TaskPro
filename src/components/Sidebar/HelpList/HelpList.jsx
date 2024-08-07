import { useState } from "react";
import Modal from "../../Portal/Modal";
import HelpForm from "../../Portal/helpModal/HelpModal";
import {
  HelpListWrapper,
  HelpListItem,
  HelpParagraph,
  Image,
  FlowerImage,
  CloseButton,
} from "./HelpList.styled";

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
          <FlowerImage
            src="https://i.ibb.co/2s4mJnP/flower.png"
            alt="happy flower"
          />
        </HelpListItem>
        <HelpListItem>
          <HelpParagraph>
            If you need help with <strong>TaskPro</strong>, check out our
            support resources or reach out to our customer support team.
          </HelpParagraph>
        </HelpListItem>
        <HelpListItem onClick={handleOpenModal}>
          <Image src="https://i.ibb.co/SRYmjrQ/help-circle.png" alt="help" />
          <span>Need help?</span>
        </HelpListItem>
      </HelpListWrapper>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
        <HelpForm onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};

export default HelpList;
