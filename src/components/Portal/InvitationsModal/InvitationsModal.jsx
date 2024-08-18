import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "../Modal.jsx";

const InvitationsContainer = styled.div`
  padding: 0;
  color: ${({ theme }) => theme.modalTextColor};
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 30px;
  height: 100%;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 70px;
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 30px;
  margin: 0;
`;

const InvitationText = styled.p`
  color: ${({ theme }) => theme.modalTextColor};
  font-size: 16px;
  margin: 0;
`;

const BoardName = styled.b`
  color: ${({ theme }) => theme.text};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 0;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: ${({ theme }) => theme.modalCreateBtnBackgroundColor};
  color: ${({ theme }) => theme.modalCreateBtnColor};
  transition: background-color 0.3s ease;
  margin: 0;

  &:hover {
    background-color: ${({ theme }) => theme.buttonBackgroundHover};
  }

  &:focus,
  &:active {
    background-color: ${({ theme }) => theme.buttonBackgroundActive};
  }
`;

const DeclineButton = styled(Button)`
  background-color: ${({ theme }) => theme.modalCreateBtnBackgroundColor};
  color: ${({ theme }) => theme.modalCreateBtnColor};
`;

const InvitationsModal = ({
  isOpen,
  onClose,
  invitations,
  onAccept,
  onDecline,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px" height="300px">
      <InvitationsContainer>
        <Title>Invitation</Title>
        {invitations.map((inv) => (
          <ContentContainer key={inv._id}>
            <InvitationText>
              You have been invited to collaborate on{" "}
              <BoardName>
                {inv.boardId.titleBoard || "Untitled Board"}
              </BoardName>{" "}
              board
            </InvitationText>
            <ButtonContainer>
              <Button onClick={() => onAccept(inv._id)}>Accept</Button>
              <DeclineButton onClick={() => onDecline(inv._id)}>
                Decline
              </DeclineButton>
            </ButtonContainer>
          </ContentContainer>
        ))}
      </InvitationsContainer>
    </Modal>
  );
};

InvitationsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  invitations: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      boardTitle: PropTypes.string,
    })
  ).isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

export default InvitationsModal;
