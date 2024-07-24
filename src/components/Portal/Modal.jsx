import styled from "styled-components";
import Portal from "./Portal";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../../utils/ThemeProvider";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ background }) => background || "rgba(0, 0, 0, 0.5)"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: ${({ modalBackgroundColor }) => modalBackgroundColor};
  padding: 20px;
  border-radius: ${({ borderRadius }) => borderRadius || "8px"};
  max-width: ${({ maxWidth }) => maxWidth || "500px"};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "auto"};
  border: ${({ border }) => border || "none"};
`;

const Modal = ({
  children,
  isOpen,
  onClose,
  width,
  maxWidth,
  height,
  border,
  borderRadius,
  modalBackgroundColor,
}) => {
  const { theme } = useContext(ThemeContext);

  console.log(theme.modalBackgroundColor);

  if (!isOpen) return null;

  return (
    <Portal>
      <ModalOverlay onClick={onClose} background="rgba(0, 0, 0, 0.5)">
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          width={width}
          maxWidth={maxWidth}
          height={height}
          border={border}
          borderRadius={borderRadius}
          modalBackgroundColor={
            modalBackgroundColor || theme.modalBackgroundColor
          }
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
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  modalBackgroundColor: PropTypes.string,
};

export default Modal;
