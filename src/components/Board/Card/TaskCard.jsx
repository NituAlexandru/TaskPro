import { useState } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { FiEdit, FiTrash2, FiArrowRightCircle, FiBell } from "react-icons/fi";
import { toast } from "react-toastify";
import EditCardForm from "../../Portal/editCard/EditCardModal";
import StatusModal from "../../Portal/CardStatusModal/CardStatusModal";
import { useCards } from "../../../contexts/CardContext";
import {
  CardContainer,
  CardContentContainer,
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

const ItemTypes = {
  CARD: "card",
};

const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

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

  const toggleModal = (setModalState) => () => setModalState((prev) => !prev);

  const handleStatusChange = (status) => {
    setCurrentStatus(status);
    setIsStatusModalOpen(false);
  };

  const handleEditCard = async (values) => {
    try {
      await updateCard(boardId, columnId, cardId, values);
      fetchCardsForColumn(boardId, columnId);
      toast.success("Card updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update card. Please try again.");
    }
  };

  const handleDeleteCard = async () => {
    try {
      await deleteCard(boardId, columnId, cardId);
      fetchCardsForColumn(boardId, columnId);
      toast.success("Card deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete card. Please try again.");
    }
  };

  const formattedDeadline = formatDate(deadline);
  const deadlineDate = new Date(deadline);
  const isDeadlineToday = isToday(deadlineDate);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { cardId, sourceColumnId: columnId, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <CardContainer>
        <CardPriorityColor color={priorityColor} />
        <CardContentContainer>
          <CardTitle>{titleCard}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardFooter>
            <Priority>
              <PriorityType>
                <PriorityItem>Priority</PriorityItem>
                <PriorityColor>
                  <PriorityColorOne color={priorityColor} />
                  <PriorityColorTwo>{priority}</PriorityColorTwo>
                </PriorityColor>
              </PriorityType>
              <PriorityType>
                <PriorityItem>Deadline</PriorityItem>
                <PriorityDate>{formattedDeadline}</PriorityDate>
              </PriorityType>
            </Priority>
            <Actions>
              {isDeadlineToday && (
                <FiBell style={{ marginLeft: "8px", stroke: "#BEDBB0" }} />
              )}
              <FiArrowRightCircle onClick={toggleModal(setIsStatusModalOpen)} />
              <FiEdit onClick={toggleModal(setIsEditModalOpen)} />
              <FiTrash2 onClick={handleDeleteCard} />
            </Actions>
          </CardFooter>
        </CardContentContainer>
        {isEditModalOpen && (
          <ModalWrapper>
            <ModalContent>
              <EditCardForm
                closeModal={toggleModal(setIsEditModalOpen)}
                initialValues={{
                  titleCard,
                  description,
                  priority,
                  deadline: new Date(deadline),
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
            onClose={toggleModal(setIsStatusModalOpen)}
            onStatusChange={handleStatusChange}
            currentStatus={currentStatus}
          />
        )}
      </CardContainer>
    </div>
  );
};

Card.propTypes = {
  titleCard: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  priorityColor: PropTypes.string,
  deadline: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
