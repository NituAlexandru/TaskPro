import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
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
  ModalWrapper,
  ModalContent,
  AvatarsContainer,
  AvatarWrapper,
  Avatar,
  Tooltip,
  CollaboratorDropdown,
  CollaboratorItem,
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
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("In progress");
  const { fetchCardsForColumn, fetchCardData, updateCard, deleteCard } = useCards();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [assignedCollaborator, setAssignedCollaborator] = useState(null);

  const toggleModal = (setModalState) => () => setModalState((prev) => !prev);

  const handleStatusChange = (status) => {
    setCurrentStatus(status);
    setIsStatusModalOpen(false);
  };

  useEffect(() => {
    const fetchCard = async () => {
      console.log('Fetching card with cardId:', cardId); // Debugging statement
      const card = await fetchCardData(boardId, columnId, cardId);
      console.log('Fetched card:', card); // Debugging statement
      if (card && card.collaborators && card.collaborators.length > 0) {
        setAssignedCollaborator(card.collaborators[0]);
      }
    };

    fetchCard();
  }, [boardId, columnId, cardId, fetchCardData]);


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

  const handleDeleteCard = async () => {
    try {
      await deleteCard(boardId, columnId, cardId);
      fetchCardsForColumn(boardId, columnId);
      toast.success("Card deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete card. Please try again.");
    }
  };

  const handleAssignCollaborator = async (collaborator) => {
    setAssignedCollaborator(collaborator);
    setIsDropdownOpen(false);
  
    try {
      const collaboratorData = {
        userId: collaborator._id,
        name: collaborator.name,
        avatarURL: collaborator.avatarURL
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
  
      console.log('Updated Card Data:', updatedCardData); // Log data to debug
      await updateCard(boardId, columnId, cardId, updatedCardData);
      fetchCardsForColumn(boardId, columnId);
      toast.success("Collaborator assigned successfully!");
    } catch (error) {
      console.error('Error:', error); // Log error to debug
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
                {collaborators.map((collaborator) => (
                  <CollaboratorItem
                    key={collaborator._id}
                    onClick={() => handleAssignCollaborator(collaborator)}
                  >
                    {collaborator.name}
                  </CollaboratorItem>
                ))}
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
                  columnId
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
};

export default TaskCard;
