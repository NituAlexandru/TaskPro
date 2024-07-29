import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { FiEdit, FiTrash2, FiArrowRightCircle } from "react-icons/fi";
import EditCardForm from "../../Portal/editCard/EditCardModal";
import StatusModal from "../../Portal/CardStatusModal";
import CardService from "../../../service/cardService";
import { CardContainer, CardContentConteiner, CardPriorityColor, CardTitle, CardDescription, CardFooter, Priority, PriorityType, PriorityItem, PriorityDate, PriorityColor, PriorityColorOne, PriorityColorTwo, Actions, ModalWrapper, ModalContent } from "./TaskCard.styled";
import { AuthContext } from "../../../contexts/AuthContext";

const Card = ({
  cardId,
  titleCard,
  description,
  priority,
  deadline,
  onDelete,
  priorityColor,
  columnId,
  index,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("In progress");
  const { token } = useContext(AuthContext);
  const cardService = new CardService(token);

  const openModal = () => {
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  const openStatusModal = () => {
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
  };

  const handleStatusChange = (status) => {
    setCurrentStatus(status);
    setIsStatusModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await cardService.deleteCard(cardId);
      onDelete(cardId);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleEditCard = async (values) => {
    try {
      await cardService.updateCard(cardId, values);
      fetchCardsForColumn(columnId); // Fetch cards again after editing
      closeModal();
    } catch (error) {
      console.error("Error editing card:", error);
    }
  };

  const formattedDeadline = new Date(deadline).toLocaleDateString();

  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        <CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <CardPriorityColor color={priorityColor}></CardPriorityColor>
          <CardContentConteiner>
            <CardTitle>{titleCard}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <CardFooter>
              <Priority>
                <PriorityType>
                  <PriorityItem>Priority</PriorityItem>
                  <PriorityColor>
                    <PriorityColorOne color={priorityColor}></PriorityColorOne>
                    <PriorityColorTwo>{priority}</PriorityColorTwo>
                  </PriorityColor>
                </PriorityType>
                <PriorityType>
                  <PriorityItem>Deadline</PriorityItem>
                  <PriorityDate>{formattedDeadline}</PriorityDate>
                </PriorityType>
              </Priority>
              <Actions>
                <FiArrowRightCircle onClick={openStatusModal} />
                <FiEdit onClick={openModal} />
                <FiTrash2 onClick={handleDelete} />
              </Actions>
            </CardFooter>
          </CardContentConteiner>
          {isEditModalOpen && (
            <ModalWrapper>
              <ModalContent>
                <EditCardForm
                  closeModal={closeModal}
                  initialValues={{
                    titleCard,
                    description,
                    priority,
                    deadline: new Date(deadline), // Convert deadline to Date object
                    priorityColor,
                  }}
                  onSubmit={handleEditCard}
                />
              </ModalContent>
            </ModalWrapper>
          )}
          {isStatusModalOpen && (
            <StatusModal
              isOpen={isStatusModalOpen}
              onClose={closeStatusModal}
              onStatusChange={handleStatusChange}
              currentStatus={currentStatus}
            />
          )}
        </CardContainer>
      )}
    </Draggable>
  );
};

Card.propTypes = {
  cardId: PropTypes.string.isRequired,
  titleCard: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  priorityColor: PropTypes.string,
  columnId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;