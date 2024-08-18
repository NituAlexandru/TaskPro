import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd"; // React DnD import for drag-and-drop functionality
import {
  FiEdit,
  FiTrash2,
  FiArrowRightCircle,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { toast } from "react-toastify";
import EditCardForm from "../../Portal/editCard/EditCardModal";
import StatusModal from "../../Portal/CardStatusModal/CardStatusModal";
import { useCards } from "../../../contexts/CardContext";
import { useColumns } from "../../../contexts/ColumnContext";
import Modal from "../../Portal/Modal";
import {
  CardMainContainer,
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
  AvatarsContainer,
  AvatarWrapper,
  Avatar,
  Tooltip,
  CollaboratorDropdown,
  CollaboratorItem,
} from "./TaskCard.styled";

// Define the item type for drag-and-drop
const ItemTypes = {
  CARD: "card",
};

// Function to format dates into a readable string
const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

// Function to check if a given date is today
const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

// Main TaskCard component
const TaskCard = ({
  titleCard,
  description,
  priority,
  deadline,
  priorityColor,
  boardId,
  columnId,
  cardId,
  index,
  collaborators,
  columns,
}) => {
  // State variables for modal visibility and card status
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(columnId);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [assignedCollaborator, setAssignedCollaborator] = useState(null);
  const statusButtonRef = useRef(null);

  const {
    fetchCardsForColumn,
    fetchCardData,
    updateCard,
    deleteCard,
    moveCardToColumn,
  } = useCards();
  const { fetchColumnsForBoard } = useColumns();

  // Fetch the card data when the component mounts or when certain props change
  useEffect(() => {
    const fetchCard = async () => {
      const card = await fetchCardData(boardId, columnId, cardId);
      if (card && card.collaborators && card.collaborators.length > 0) {
        setAssignedCollaborator(card.collaborators[0]);
      }
    };

    fetchCard();
  }, [boardId, columnId, cardId, fetchCardData]);

  const toggleModal = (setModalState) => () => setModalState((prev) => !prev);

  // Handle changing the status (column) of the card
  const handleStatusChange = async (newColumnId) => {
    try {
      await moveCardToColumn(boardId, columnId, cardId, newColumnId);
      setCurrentStatus(newColumnId);
      setIsModalOpen(false);
      fetchColumnsForBoard(boardId);
      toast.success("Card moved successfully!");
    } catch (error) {
      toast.error("Failed to move card. Please try again.");
    }
  };

  // Handle editing the card
  const handleEditCard = async (values) => {
    try {
      await updateCard(boardId, columnId, cardId, values);
      fetchCardData(boardId, columnId, cardId);
      toast.success("Card updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update card. Please try again.");
    }
  };

  // Handle deleting the card
  const handleDeleteCard = async () => {
    try {
      await deleteCard(boardId, columnId, cardId);
      fetchCardsForColumn(boardId, columnId);
      toast.success("Card deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete card. Please try again.");
    }
  };

  // Handle assigning a collaborator to the card
  const handleAssignCollaborator = async (collaborator) => {
    setAssignedCollaborator(collaborator);
    setIsDropdownOpen(false);

    try {
      const collaboratorData = {
        userId: collaborator._id,
        name: collaborator.name,
        avatarURL: collaborator.avatarURL,
      };

      const updatedCardData = {
        columnId,
        titleCard,
        description,
        priority,
        priorityColor,
        deadline,
        collaborators: [collaboratorData],
      };

      await updateCard(boardId, columnId, cardId, updatedCardData);
      fetchCardsForColumn(boardId, columnId);
      toast.success("Collaborator assigned successfully!");
    } catch (error) {
      toast.error("Failed to assign collaborator. Please try again.");
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
    <CardMainContainer ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <CardContainer>
        <CardPriorityColor color={priorityColor} />
        <CardContentContainer>
          <CardTitle>{titleCard}</CardTitle>
          <AvatarsContainer>
            {assignedCollaborator ? (
              <AvatarWrapper onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <Avatar
                  src={assignedCollaborator.avatarURL}
                  alt={assignedCollaborator.name}
                />
                <Tooltip className="tooltip">
                  {assignedCollaborator.name}
                </Tooltip>
              </AvatarWrapper>
            ) : (
              <FiChevronDown
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              />
            )}
            {isDropdownOpen && (
              <CollaboratorDropdown>
                {collaborators.length > 0 ? (
                  collaborators.map((collaborator) => (
                    <CollaboratorItem
                      key={collaborator._id}
                      onClick={() => handleAssignCollaborator(collaborator)}
                    >
                      {collaborator.name}
                    </CollaboratorItem>
                  ))
                ) : (
                  <CollaboratorItem>No Collaborators</CollaboratorItem>
                )}
              </CollaboratorDropdown>
            )}
          </AvatarsContainer>
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
              <div ref={statusButtonRef} onClick={toggleModal(setIsModalOpen)}>
                <FiArrowRightCircle />
              </div>
              <FiEdit onClick={toggleModal(setIsEditModalOpen)} />
              <FiTrash2 onClick={handleDeleteCard} />
            </Actions>
          </CardFooter>
        </CardContentContainer>
        {isEditModalOpen && (
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          >
            <EditCardForm
              closeModal={toggleModal(setIsEditModalOpen)}
              initialValues={{
                titleCard,
                description,
                priority,
                deadline: new Date(deadline),
                priorityColor,
                columnId,
              }}
              onSubmit={handleEditCard}
            />
          </Modal>
        )}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            padding="0"
          >
            <StatusModal
              closeModal={() => setIsModalOpen(false)}
              onStatusChange={handleStatusChange}
              currentStatus={currentStatus}
              buttonRef={statusButtonRef}
              columns={columns}
              padding="0"
            />
          </Modal>
        )}
      </CardContainer>
    </CardMainContainer>
  );
};

TaskCard.propTypes = {
  titleCard: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  priorityColor: PropTypes.string,
  deadline: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      avatarURL: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  columns: PropTypes.array.isRequired,
};

export default TaskCard;
