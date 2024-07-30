import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
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
import BoardService from "../../../service/boardService";
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
} from "./EditBoardModal.styled";

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
  { name: "block", src: block },
  { name: "abstractSpheres", src: abstractSpheres },
  { name: "balloonFestival", src: balloonFestival },
  { name: "cherryBlossomTree", src: cherryBlossomTree },
  { name: "cloudySky", src: cloudySky },
  { name: "crescentMoon", src: crescentMoon },
  { name: "desertArch", src: desertArch },
  { name: "hotAirBalloon", src: hotAirBalloon },
  { name: "milkyWayCamp", src: milkyWayCamp },
  { name: "moonEclipse", src: moonEclipse },
  { name: "palmLeaves", src: palmLeaves },
  { name: "pinkFlowers", src: pinkFlowers },
  { name: "rockyCoast", src: rockyCoast },
  { name: "sailboat", src: sailboat },
  { name: "turquoiseBay", src: turquoiseBay },
  { name: "starryMountains", src: starryMountains },
];

const EditBoardModal = ({ closeModal, boardId }) => {
  const [title, setTitle] = useState("");
  const [collaborator, setCollaborator] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchBoard = async () => {
      const boardService = new BoardService(token);
      setLoading(true);
      try {
        const board = await boardService.getBoard(boardId);
        setTitle(board.titleBoard);
        setSelectedIcon(board.icon);
        setSelectedBackground(board.background);
      } catch (error) {
        console.error("Error fetching board:", error);
        setError("Failed to fetch board data");
        toast.error("Failed to fetch board data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [boardId, token]);

  const handleSubmit = async () => {
    if (!title || selectedIcon === null || selectedBackground === null) {
      setError("Please fill all fields");
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const boardService = new BoardService(token);
      const updatedBoard = {
        titleBoard: title,
        background: selectedBackground,
        icon: selectedIcon,
      };

      // If a collaborator is added, fetch the collaborator ID
      if (collaborator) {
        const id = await getCollaboratorIdByName(collaborator);
        updatedBoard.collaborators = [id]; // Replace with logic to add to existing collaborators if needed
      }

      const response = await boardService.updateBoard(boardId, updatedBoard);
      console.log("Board updated:", response);
      toast.success("Board updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Error updating board:", error);
      setError("Failed to update board");
      toast.error("Failed to update board. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ModalHeader>
        <Title>Edit board</Title>
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
            {icons.map((icon) => (
              <Icon
                key={icon.name}
                selected={selectedIcon === icon.name}
                onClick={() => setSelectedIcon(icon.name)}
              >
                <img src={icon.src} alt={icon.name} />
              </Icon>
            ))}
          </Icons>
        </Section>
        <Section>
          <Title as="h3">Background</Title>
          <Backgrounds>
            {backgrounds.map(({ name, src }) => (
              <Background
                key={name}
                src={src}
                selected={selectedBackground === name}
                onClick={() => setSelectedBackground(name)}
              />
            ))}
          </Backgrounds>
        </Section>
        <CreateButton onClick={handleSubmit} disabled={loading}>
          <>
            <CreateButtonAdd>+</CreateButtonAdd> Edit
          </>
        </CreateButton>
      </ModalBody>
    </div>
  );
};

EditBoardModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired,
};

export default EditBoardModal;