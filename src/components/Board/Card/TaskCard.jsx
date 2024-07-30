import { useState } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { FiEdit, FiTrash2, FiArrowRightCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import EditCardForm from "../../Portal/editCard/EditCardModal";
import StatusModal from "../../Portal/CardStatusModal";
import { useCards } from "../../../contexts/CardContext";
import {
  CardContainer,
  CardContentConteiner,
  CardPriorityColor,
  CardTitle,
  CardDescription,
  CardFooter,
  Priority,
  PriorityType,
  PriorityItem,
  PriorityDate,
  PriorityColor,
  PriorityColorOne,
  PriorityColorTwo,
  Actions,
  ModalWrapper,
  ModalContent,
} from "./TaskCard.styled";

const Card = ({
  cardId,
  titleCard,
  description,
  priority,
  deadline,

  priorityColor,
  boardId,
  columnId,
  index,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("In progress");
  const { fetchCardsForColumn, updateCard, deleteCard } = useCards();

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

  const handleEditCard = async (values) => {
    try {
      await updateCard(boardId, columnId, cardId, values);
      fetchCardsForColumn(boardId, columnId); // Fetch cards again after editing
      toast.success("Card updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Error editing card:", error);
      toast.error("Failed to update card. Please try again.");
    }
  };

  const handleDeleteCard = async () => {
    try {
      await deleteCard(boardId, columnId, cardId);
      fetchCardsForColumn(boardId, columnId); // Fetch cards again after deletion
      toast.success("Card deleted successfully!");
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete card. Please try again.");
    }
  };

  const formattedDeadline = new Date(deadline).toLocaleDateString();

  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
                <FiTrash2 onClick={handleDeleteCard} />
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
  boardId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
