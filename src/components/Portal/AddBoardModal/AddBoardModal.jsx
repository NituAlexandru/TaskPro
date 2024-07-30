import { useState, useContext } from "react";
import PropTypes from "prop-types";
import loadingIcon from "../../../assets/icons/loading.svg";
import colorsIcon from "../../../assets/icons/colors.svg";
import containerIcon from "../../../assets/icons/container.svg";
import hexagonIcon from "../../../assets/icons/hexagon.svg";
import lightningIcon from "../../../assets/icons/lightning.svg";
import projectIcon from "../../../assets/icons/project.svg";
import puzzlePieceIcon from "../../../assets/icons/puzzle-piece.svg";
import starIcon from "../../../assets/icons/star.svg";
import block from "../../../assets/portal-img/block.webp";
import abstractSpheres from "../../../assets/portal-img/abstract-spheres.webp";
import balloonFestival from "../../../assets/portal-img/BalloonFestival.webp";
import cherryBlossomTree from "../../../assets/portal-img/CherryBlossomTree.webp";
import cloudySky from "../../../assets/portal-img/CloudySky.webp";
import crescentMoon from "../../../assets/portal-img/CrescentMoon.webp";
import desertArch from "../../../assets/portal-img/DesertArch.webp";
import hotAirBalloon from "../../../assets/portal-img/HotAirBalloon.webp";
import milkyWayCamp from "../../../assets/portal-img/MilkyWayCamp.webp";
import moonEclipse from "../../../assets/portal-img/moon-eclipse.webp";
import palmLeaves from "../../../assets/portal-img/PalmLeaves.webp";
import pinkFlowers from "../../../assets/portal-img/PinkFlowers.webp";
import rockyCoast from "../../../assets/portal-img/RockyCoast.webp";
import sailboat from "../../../assets/portal-img/Sailboat.webp";
import turquoiseBay from "../../../assets/portal-img/TurquoiseBay.webp";
import starryMountains from "../../../assets/portal-img/StarryMountains.webp";
import { AuthContext } from "../../../contexts/AuthContext";
import { useBoards } from "../../../contexts/BoardContext";
import { getCollaboratorIdByName } from "../../../service/collaboratorService";
import {
  ModalHeader,
  Title,
  CloseButton,
  ModalBody,
  Input,
  Section,
  Icons,
  Icon,
  Backgrounds,
  Background,
  CreateButton,
  CreateButtonAdd,
} from "../AddBoardModal/AddBoardModal.styled";
import { toast } from "react-toastify";

const icons = [
  { name: "loadingIcon", src: loadingIcon },
  { name: "colorsIcon", src: colorsIcon },
  { name: "containerIcon", src: containerIcon },
  { name: "hexagonIcon", src: hexagonIcon },
  { name: "lightningIcon", src: lightningIcon },
  { name: "projectIcon", src: projectIcon },
  { name: "puzzlePieceIcon", src: puzzlePieceIcon },
  { name: "starIcon", src: starIcon },
];

const backgrounds = [
  { name: "block", url: block },
  { name: "abstractSpheres", url: abstractSpheres },
  { name: "balloonFestival", url: balloonFestival },
  { name: "cherryBlossomTree", url: cherryBlossomTree },
  { name: "cloudySky", url: cloudySky },
  { name: "crescentMoon", url: crescentMoon },
  { name: "desertArch", url: desertArch },
  { name: "hotAirBalloon", url: hotAirBalloon },
  { name: "milkyWayCamp", url: milkyWayCamp },
  { name: "moonEclipse", url: moonEclipse },
  { name: "palmLeaves", url: palmLeaves },
  { name: "pinkFlowers", url: pinkFlowers },
  { name: "rockyCoast", url: rockyCoast },
  { name: "sailboat", url: sailboat },
  { name: "turquoiseBay", url: turquoiseBay },
  { name: "starryMountains", url: starryMountains },
];

const NewBoardModal = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [collaborator, setCollaborator] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { createBoard, fetchBoards } = useBoards();
  const { user } = useContext(AuthContext); 

  const handleSubmit = async () => {
    if (!title || selectedIcon === null || selectedBackground === null) {
      toast.error("Please select all fields");
      return;
    }

    setLoading(true);
    setError("");
    try {
      // Fetch collaborator IDs
      let collaboratorIds = [];
      if (collaborator) {
        const id = await getCollaboratorIdByName(collaborator);
        collaboratorIds = [id];
      }

      const boardData = {
        owner: user._id, // Ensure the user ID is included
        titleBoard: title,
        background: selectedBackground, // Use background name
        icon: selectedIcon, // Use icon name
        collaborators: collaboratorIds,
      };

      const newBoard = await createBoard(boardData);
      console.log("New Board Created:", newBoard); // Log the new board to see its format
      await fetchBoards(); // Refresh the board list
      toast.success("New board created successfully!");
      closeModal();
    } catch (error) {
      console.error("Error creating board:", error);
      setError("Failed to create board");
      toast.error("Failed to create board. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ModalHeader>
        <Title>New board</Title>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalHeader>
      <ModalBody>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Invite Collaborator"
          value={collaborator}
          onChange={(e) => setCollaborator(e.target.value)}
        />
        <Section>
          <Title as="h3">Icons</Title>
          <Icons>
            {icons.map((icon, index) => (
              <Icon
                key={index}
                selected={selectedIcon === icon.name}
                onClick={() => setSelectedIcon(icon.name)}
              >
                <img src={icon.src} alt={`icon-${index}`} />
              </Icon>
            ))}
          </Icons>
        </Section>
        <Section>
          <Title as="h3">Background</Title>
          <Backgrounds>
            {backgrounds.map(({ name, url }, index) => (
              <Background
                key={index}
                src={url}
                selected={selectedBackground === name}
                onClick={() => setSelectedBackground(name)}
              />
            ))}
          </Backgrounds>
        </Section>
        <CreateButton onClick={handleSubmit} disabled={loading}>
          <>
            <CreateButtonAdd>+</CreateButtonAdd> Create
          </>
        </CreateButton>
      </ModalBody>
    </div>
  );
};

NewBoardModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default NewBoardModal;
