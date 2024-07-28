import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "./Modal";

const FilterTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
  margin-top: 0;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 10px;
  display: flex;
`;

const FilterOption = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color};
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 0;
  cursor: pointer;
`;

const ColorIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    transform: scale(1.2);
    background-color: transparent;
  }
`;

const ShowAllButton = styled.button`
  background: none;
  border: none;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.02em;
  text-decoration: underline;
  text-decoration-skip-ink: none;
  color: ${({ theme }) => theme.filterShowAllBtn};
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin: 0;
  margin-left: auto;

  &:hover {
    transform: scale(1.05);
    background-color: transparent;
  }
`;

const FilterModal = ({ isOpen, onClose, onFilterChange, buttonRef }) => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  const updatePosition = () => {
    if (buttonRef && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let left = rect.left + window.scrollX;
      let top = rect.bottom + window.scrollY;

      // Adjust left and top to ensure the modal stays within the viewport
      if (left + 300 > windowWidth) {
        left = windowWidth - 300 - 20; // 20px padding from right edge
      }
      if (top + 200 > windowHeight) {
        top = windowHeight - 200 - 20; // 20px padding from bottom edge
      }

      setPosition({
        top: `${top}px`,
        left: `${left}px`,
      });
    }
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [buttonRef]);

  const handleFilterChange = (filter) => {
    onFilterChange(filter);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      top={position.top}
      left={position.left}
      width="300px"
      height="auto"
      transform="translateY(0)"
    >
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <FilterTitle>Filters</FilterTitle>
      <Label>
        Label color{" "}
        <ShowAllButton onClick={() => handleFilterChange(null)}>
          Show all
        </ShowAllButton>
      </Label>
      <FilterOption onClick={() => handleFilterChange("#797b78")}>
        <ColorIndicator color="#797b78" />
        Without priority
      </FilterOption>
      <FilterOption onClick={() => handleFilterChange("#8fa1d0")}>
        <ColorIndicator color="#8fa1d0" />
        Low
      </FilterOption>
      <FilterOption onClick={() => handleFilterChange("#e09cb5")}>
        <ColorIndicator color="#e09cb5" />
        Medium
      </FilterOption>
      <FilterOption onClick={() => handleFilterChange("#bedbb0")}>
        <ColorIndicator color="#bedbb0" />
        High
      </FilterOption>
    </Modal>
  );
};

FilterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  buttonRef: PropTypes.object.isRequired,
};

export default FilterModal;
