import PropTypes from "prop-types";
import { FiArrowRightCircle } from "react-icons/fi";
import {
  ModalWrapper,
  ModalContent,
  StatusOption,
} from "./CardStatusModal.styled";

const StatusModal = ({
  closeModal,
  onStatusChange,
  currentStatus,
  columns,
}) => {
  // Prevent event propagation when clicking inside the modal content
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <ModalWrapper onClick={closeModal}>
      <ModalContent onClick={handleContentClick}>
        {columns.map((column) => (
          <StatusOption
            key={column._id}
            $active={currentStatus === column._id}
            onClick={() => onStatusChange(column._id)}
          >
            {column.titleColumn}
            <FiArrowRightCircle style={{ marginLeft: "8px" }} />
          </StatusOption>
        ))}
      </ModalContent>
    </ModalWrapper>
  );
};

StatusModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  currentStatus: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      titleColumn: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StatusModal;
