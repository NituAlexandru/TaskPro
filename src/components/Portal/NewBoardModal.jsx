import { useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import loadingIcon from "../../assets/icons/loading.svg";
import colorsIcon from "../../assets/icons/colors.svg";
import containerIcon from "../../assets/icons/container.svg";
import hexagonIcon from "../../assets/icons/hexagon.svg";
import lightningIcon from "../../assets/icons/lightning.svg";
import projectIcon from "../../assets/icons/project.svg";
import puzzlePieceIcon from "../../assets/icons/puzzle-piece.svg";
import starIcon from "../../assets/icons/star.svg";
import block from "../../assets/portal-img/block.webp";
import abstractSpheres from "../../assets/portal-img/abstract-spheres.webp";
import balloonFestival from "../../assets/portal-img/BalloonFestival.webp";
import cherryBlossomTree from "../../assets/portal-img/CherryBlossomTree.webp";
import cloudySky from "../../assets/portal-img/CloudySky.webp";
import crescentMoon from "../../assets/portal-img/CrescentMoon.webp";
import desertArch from "../../assets/portal-img/DesertArch.webp";
import hotAirBalloon from "../../assets/portal-img/HotAirBalloon.webp";
import milkyWayCamp from "../../assets/portal-img/MilkyWayCamp.webp";
import moonEclipse from "../../assets/portal-img/moon-eclipse.webp";
import palmLeaves from "../../assets/portal-img/PalmLeaves.webp";
import pinkFlowers from "../../assets/portal-img/PinkFlowers.webp";
import rockyCoast from "../../assets/portal-img/RockyCoast.webp";
import sailboat from "../../assets/portal-img/Sailboat.webp";
import turquoiseBay from "../../assets/portal-img/TurquoiseBay.webp";
import starryMountains from "../../assets/portal-img/StarryMountains.webp";
import { AuthContext } from "../../contexts/AuthContext";
import BoardService from "../../service/boardService";
import { getCollaboratorIdByName } from "../../service/collaboratorService";

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.modalTextColor};
  margin: 0;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.modalTextColor};
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

const ModalBody = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  border: 1px solid #bedbb0;
  border-radius: 8px;
  width: 100%;
  height: 49px;
  box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  opacity: 0.4;
  margin: 0;
  padding: 10px;
`;

const Section = styled.div``;

const Icons = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0;
  margin-top: 10px;
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  background: transparent;
  border-radius: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  opacity: 0.8;

  img {
    width: 20px;
    height: 20px;
    stroke: #fff;
    transition: all 250ms ease-in-out;
    border: ${({ selected }) => (selected ? "2px solid #fff" : "none")};
  }

  &:hover {
    opacity: 1.2;
    transform: scale(1.2);
  }
`;

const Backgrounds = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
  width: 270px;
`;

const Background = styled.div`
  width: 28px;
  height: 28px;
  background: url(${({ src }) => src}) no-repeat center center;
  background-size: cover;
  border-radius: 8px;
  cursor: pointer;
  border: ${({ selected }) => (selected ? "2px solid #fff" : "none")};

  &:hover {
    opacity: 1.2;
    transform: scale(1.2);
  }
`;

const CreateButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 6px;
  border: none;
  background-color: ${({ theme }) => theme.modalCreateBtnBackgroundColor};
  color: ${({ theme }) => theme.modalCreateBtnColor};
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  letter-spacing: -0.02em;
`;

const CreateButtonAdd = styled.span`
  width: 28px;
  height: 28px;
  background-color: ${({ theme }) => theme.modalCreateBtnAddBackgroundColor};
  color: ${({ theme }) => theme.modalCreateBtnAddColor};
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  const [title, setTitle] = useState('');
  const [collaborator, setCollaborator] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const boardService = new BoardService(token);

  const handleSubmit = async () => {
    if (!title || selectedIcon === null || selectedBackground === null) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Fetch collaborator IDs
      let collaboratorIds = [];
      if (collaborator) {
        const id = await getCollaboratorIdByName(collaborator);
        collaboratorIds = [id];
      }

      const boardData = {
        titleBoard: title,
        background: selectedBackground, // Use background name
        icon: selectedIcon, // Use icon name
        collaborators: collaboratorIds,
      };

      const response = await boardService.createBoard(boardData);
      console.log('Board created:', response);
      closeModal();
    } catch (error) {
      console.error('Error creating board:', error);
      setError('Failed to create board');
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
          {loading ? <img src={loadingIcon} alt="loading" /> : (
            <>
              <CreateButtonAdd>+</CreateButtonAdd> Create
            </>
          )}
        </CreateButton>
      </ModalBody>
    </div>
  );
};

NewBoardModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default NewBoardModal;
