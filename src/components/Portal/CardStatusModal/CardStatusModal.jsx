import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { FiArrowRightCircle } from "react-icons/fi";
import {
  ModalWrapper,
  ModalContent,
  StatusOption,
} from "./CardStatusModal.styled";

const StatusModal = ({
  isOpen,
  onClose,
  onStatusChange,
  currentStatus,
  buttonRef,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (buttonRef && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [buttonRef]);

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [updatePosition]);

  if (!isOpen) return null;

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <StatusOption
          $active={currentStatus === "In progress"}
          onClick={() => onStatusChange("In progress")}
        >
          In progress <FiArrowRightCircle />
        </StatusOption>
        <StatusOption
          $active={currentStatus === "Done"}
          onClick={() => onStatusChange("Done")}
        >
          Done <FiArrowRightCircle />
        </StatusOption>
      </ModalContent>
    </ModalWrapper>
  );
};

StatusModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  currentStatus: PropTypes.string.isRequired,
  buttonRef: PropTypes.object,
};

export default StatusModal;
