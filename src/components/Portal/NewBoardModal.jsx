import { useState } from "react";
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
  color: #fff;
  margin: 0;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  color: #ffffff;
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
  background: #1f1f1f;
  opacity: 0.4;
  margin: 0;
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
  background-color: #a5d6a7;
  color: #161616;
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
  background: #161616;
  color: #fff;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const icons = [
  loadingIcon,
  colorsIcon,
  containerIcon,
  hexagonIcon,
  lightningIcon,
  projectIcon,
  puzzlePieceIcon,
  starIcon,
];

const backgrounds = [
  block,
  abstractSpheres,
  balloonFestival,
  cherryBlossomTree,
  cloudySky,
  crescentMoon,
  desertArch,
  hotAirBalloon,
  milkyWayCamp,
  moonEclipse,
  palmLeaves,
  pinkFlowers,
  rockyCoast,
  sailboat,
  turquoiseBay,
  starryMountains,
];

const NewBoardModal = ({ closeModal }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);

  return (
    <div>
      <ModalHeader>
        <Title>New board</Title>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalHeader>
      <ModalBody>
        <Input placeholder="Title" />
        <Input placeholder="Invite Collaborator" />
        <Section>
          <Title as="h3">Icons</Title>
          <Icons>
            {icons.map((icon, index) => (
              <Icon
                key={index}
                selected={selectedIcon === index}
                onClick={() => setSelectedIcon(index)}
              >
                <img src={icon} alt={`icon-${index}`} />
              </Icon>
            ))}
          </Icons>
        </Section>
        <Section>
          <Title as="h3">Background</Title>
          <Backgrounds>
            {backgrounds.map((src, index) => (
              <Background
                key={index}
                src={src}
                selected={selectedBackground === index}
                onClick={() => setSelectedBackground(index)}
              />
            ))}
          </Backgrounds>
        </Section>
        <CreateButton>
          <CreateButtonAdd>+</CreateButtonAdd> Create
        </CreateButton>
      </ModalBody>
    </div>
  );
};

NewBoardModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default NewBoardModal;
