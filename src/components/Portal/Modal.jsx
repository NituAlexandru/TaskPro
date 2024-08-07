import { useContext } from "react";
import PropTypes from "prop-types";
import styled, { ThemeContext } from "styled-components";
import Portal from "./Portal";

// Styled components for the modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ $background }) => $background || "rgba(0, 0, 0, 0.5)"};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  top: ${({ $top }) => $top || "50%"};
  left: ${({ $left }) => $left || "50%"};
  transform: ${({ $transform }) => $transform || "translate(-50%, -50%)"};
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  color: ${({ theme }) => theme.modalTextColor};
  padding: ${({ $padding }) => $padding || "20px"};
  border-radius: ${({ $borderRadius }) => $borderRadius || "8px"};
  width: ${({ $width }) => $width || "auto"};
  height: ${({ $height }) => $height || "auto"};
  border: ${({ $border }) => $border || "none"};
  z-index: 1000;

  @media (max-width: 400px) {
    width: 95%;
    margin: 0 auto;
  }
`;

// Modal component
const Modal = ({
  children,
  isOpen,
  onClose,
  width,
  height,
  border,
  borderRadius,
  top,
  left,
  transform,
}) => {
  const theme = useContext(ThemeContext);

  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <Portal>
      <ModalOverlay onClick={onClose} $background="rgba(0, 0, 0, 0.5)">
        <ModalContent
          onClick={(e) => e.stopPropagation()} // Prevent click propagation to the overlay
          $width={width}
          $height={height}
          $border={border}
          $borderRadius={borderRadius}
          $top={top}
          $left={left}
          $transform={transform}
          theme={theme}
        >
          {children}
        </ModalContent>
      </ModalOverlay>
    </Portal>
  );
};

// Prop types for the Modal component
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  transform: PropTypes.string,
};

export default Modal;
