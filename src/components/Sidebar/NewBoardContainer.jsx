import styled from "styled-components";
import Modal from "../Portal/Modal";
import NewBoardModal from "../Portal/NewBoardModal";
import { useState } from "react";

const NewBoardContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 15px;
`;

const Paragraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.sidebarTextColor};
  margin: 0;
`;

const AddBoardBtn = styled.button`
  border-radius: 6px;
  width: 40px;
  height: 36px;
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.addBoardBtn};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewBoardContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <NewBoardContainerWrapper>
        <Paragraph>
          Create a <br /> new board
        </Paragraph>
        <AddBoardBtn onClick={openModal}>+</AddBoardBtn>
      </NewBoardContainerWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        background="#fff"
        width="350px"
        height="500px"
        border="1px solid rgba(190, 219, 176, 0.5)"
        border-radius="8px"
      >
        <NewBoardModal closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default NewBoardContainer;
