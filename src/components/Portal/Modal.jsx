import styled from "styled-components";
import Portal from "./Portal";
import PropTypes from "prop-types";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #000;
  padding: 20px;
  border-radius: 8px;
  max-width: ${({ maxWidth }) => maxWidth || "500px"};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "auto"};
`;

const Modal = ({ children, isOpen, onClose, width, maxWidth, height }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <ModalOverlay onClick={onClose}>
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          width={width}
          maxWidth={maxWidth}
          height={height}
        >
          {children}
        </ModalContent>
      </ModalOverlay>
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  height: PropTypes.string,
};

export default Modal;
