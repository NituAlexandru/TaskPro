import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import {
  FilterTitle,
  Label,
  FilterOption,
  ColorIndicator,
  CloseButton,
  ShowAllButton,
} from "./FilterModal.styled";

const FilterModal = ({ isOpen, onClose, onFilterChange, buttonRef }) => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  // Update the position of the modal based on the button's position
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

  // Handle filter change
  const handleFilterSelection = (filter) => {
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
        <ShowAllButton onClick={() => handleFilterSelection(null)}>
          Show all
        </ShowAllButton>
      </Label>
      <FilterOption onClick={() => handleFilterSelection("#797b78")}>
        <ColorIndicator color="#797b78" />
        Without
      </FilterOption>
      <FilterOption onClick={() => handleFilterSelection("#8fa1d0")}>
        <ColorIndicator color="#8fa1d0" />
        Low
      </FilterOption>
      <FilterOption onClick={() => handleFilterSelection("#e09cb5")}>
        <ColorIndicator color="#e09cb5" />
        Medium
      </FilterOption>
      <FilterOption onClick={() => handleFilterSelection("#bedbb0")}>
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
