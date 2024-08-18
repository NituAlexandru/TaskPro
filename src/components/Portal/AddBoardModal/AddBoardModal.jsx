import { useState, useContext } from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";
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
import { getUserDetailsByEmail } from "../../../service/authService";
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
  CollaboratorsInputWrapper,
  CollaboratorsInput,
  CollaboratorsList,
  CollaboratorItem,
  RemoveCollaboratorButton,
  StyledForm,
  SearchButtonWrapper,
  SearchButton,
  StyledErrorMessage,
  FormWrapper,
} from "../AddBoardModal/AddBoardModal.styled";
import axios from "axios";
import API_BASE_URL from "../../../utils/apiConfig";

// Icons and Backgrounds arrays
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

// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  collaborators: Yup.array().of(
    Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      userId: Yup.string().required("User ID is required"),
      name: Yup.string().required("Name is required"),
      avatar: Yup.string().required("Avatar is required"),
    })
  ),
});

const NewBoardModal = ({ closeModal }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { createBoard, fetchBoards } = useBoards();
  const { user, token } = useContext(AuthContext);

  // Handle adding a collaborator by email
  const handleAddCollaborator = async (email, arrayHelpers) => {
    if (!email) return;

    try {
      // Caută detalii despre utilizator după email
      const userDetails = await getUserDetailsByEmail(email);
      if (userDetails) {
        arrayHelpers.push({
          email,
          userId: userDetails.userId,
          name: userDetails.name,
          avatar: userDetails.avatar,
        });

        // Adaugă colaboratorul local în starea componentului fără a trimite imediat invitația
        document.querySelector('input[name="collaborators"]').value = "";
      } else {
        toast.error(`User with email ${email} not found`);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    if (!selectedIcon || !selectedBackground) {
      toast.error("Please select an icon and a background");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const collaboratorIds = values.collaborators.map(
        (collaborator) => collaborator.userId
      );

      // Creează board-ul
      const boardData = {
        owner: user._id,
        titleBoard: values.title,
        background: selectedBackground,
        icon: selectedIcon,
        collaborators: collaboratorIds, // Adaugă colaboratorii la board
      };

      const newBoard = await createBoard(boardData);
      console.log("New Board Created:", newBoard);

      // Trimite invitațiile pentru colaboratori folosind ID-ul noului board
      await Promise.all(
        collaboratorIds.map((collaboratorId) =>
          axios.post(
            `${API_BASE_URL}/api/invitations`,
            {
              boardId: newBoard._id, // Folosește ID-ul boardului creat
              userId: collaboratorId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Trimite token-ul de autentificare
              },
            }
          )
        )
      );

      await fetchBoards();
      toast.success("New board created successfully!");
      closeModal();
    } catch (error) {
      console.error("Error creating board:", error);
      setError("Failed to create board");
      toast.error("Failed to create board. Please try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <FormWrapper>
      <ModalHeader>
        <Title>New board</Title>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalHeader>
      <Formik
        initialValues={{
          title: "",
          collaborators: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <StyledForm>
            <ModalBody>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Input
                placeholder="Title"
                name="title"
                autoComplete="off"
                onChange={(e) => setFieldValue("title", e.target.value)}
              />
              <StyledErrorMessage name="title" component="div" />
              <CollaboratorsInputWrapper>
                <FieldArray
                  name="collaborators"
                  render={(arrayHelpers) => (
                    <>
                      <div style={{ position: "relative" }}>
                        <CollaboratorsInput
                          autoComplete="off"
                          type="email"
                          placeholder="Enter collaborator email"
                          name="collaborators"
                          onKeyDown={async (e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const email = e.target.value;
                              handleAddCollaborator(email, arrayHelpers);
                            }
                          }}
                        />
                        <SearchButtonWrapper>
                          <SearchButton
                            type="button"
                            onClick={() => {
                              const email = document.querySelector(
                                'input[name="collaborators"]'
                              ).value;
                              handleAddCollaborator(email, arrayHelpers);
                            }}
                          >
                            <FiSearch />
                          </SearchButton>
                        </SearchButtonWrapper>
                      </div>
                      <StyledErrorMessage
                        name="collaborators"
                        component="div"
                      />
                      <CollaboratorsList>
                        {values.collaborators.map((collaborator, index) => (
                          <CollaboratorItem key={index}>
                            <img
                              src={collaborator.avatar}
                              alt={collaborator.name}
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                marginRight: "10px",
                              }}
                            />
                            <RemoveCollaboratorButton
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              &times;
                            </RemoveCollaboratorButton>
                          </CollaboratorItem>
                        ))}
                      </CollaboratorsList>
                    </>
                  )}
                />
              </CollaboratorsInputWrapper>
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
              <CreateButton type="submit" disabled={isSubmitting || loading}>
                <>
                  <CreateButtonAdd>+</CreateButtonAdd> Create
                </>
              </CreateButton>
            </ModalBody>
          </StyledForm>
        )}
      </Formik>
    </FormWrapper>
  );
};

NewBoardModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default NewBoardModal;
