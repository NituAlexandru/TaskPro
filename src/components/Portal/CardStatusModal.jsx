import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FiArrowRightCircle } from "react-icons/fi";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StatusOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${({ active, theme }) =>
    active ? theme.activeBackgroundColor : theme.inactiveBackgroundColor};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBackgroundColor};
  }
`;

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
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        top={position.top}
        left={position.left}
      >
        <StatusOption
          active={currentStatus === "In progress"}
          onClick={() => onStatusChange("In progress")}
        >
          In progress <FiArrowRightCircle />
        </StatusOption>
        <StatusOption
          active={currentStatus === "Done"}
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
  buttonRef: PropTypes.object.isRequired,
};

export default StatusModal;
