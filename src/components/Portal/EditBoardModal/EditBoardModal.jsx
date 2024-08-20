import { useState, useEffect, useContext } from "react";
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
import { useBoards } from "../../../contexts/BoardContext";
import { AuthContext } from "../../../contexts/AuthContext";
import BoardService from "../../../service/boardService";
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

// Validation schema for the form
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  collaborators: Yup.array().of(
    Yup.object({
      _id: Yup.string().required("User ID is required"),
      name: Yup.string().required("Name is required"),
      avatarURL: Yup.string().required("Avatar is required"),
    })
  ),
});

// Main component for editing a board
const EditBoardModal = ({ closeModal, boardId, onCollaboratorUpdate }) => {
  const [selectedIcon, setSelectedIcon] = useState(null); // State for selected icon
  const [selectedBackground, setSelectedBackground] = useState(null); // State for selected background
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for errors
  const [initialValues, setInitialValues] = useState({
    title: "",
    collaborators: [],
  });
  const { token } = useContext(AuthContext); // Get token from AuthContext
  const { updateBoard, fetchBoards } = useBoards(); // Use boards context

  // Fetch board data when component mounts
  useEffect(() => {
    const fetchBoard = async () => {
      const boardService = new BoardService(token);
      setLoading(true);
      try {
        // console.log(`Fetching board data for board ID: ${boardId}`);
        const board = await boardService.getBoard(boardId);
        setInitialValues({
          title: board.titleBoard,
          collaborators: board.collaborators.map((collab) => ({
            _id: collab._id,
            name: collab.name,
            avatarURL: collab.avatarURL,
          })),
        });
        setSelectedIcon(board.icon);
        setSelectedBackground(board.background);
        // console.log("Board data fetched successfully:", board);
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

  const handleAddCollaborator = async (email, arrayHelpers) => {
    if (!email) return;

    try {
      // console.log(`Fetching user details for email: ${email}`);
      const userDetails = await getUserDetailsByEmail(email);
      if (userDetails) {
        arrayHelpers.push({
          _id: userDetails.userId,
          name: userDetails.name,
          avatarURL: userDetails.avatar,
        });

        // Send request to API to create an invitation
        await axios.post(
          `${API_BASE_URL}/api/invitations`,
          {
            boardId,
            userId: userDetails.userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in header
            },
          }
        );

        document.querySelector('input[name="collaborators"]').value = "";
        console.log("Collaborator added successfully:", userDetails);
      } else {
        toast.error(`User with email ${email} not found`);
        console.warn(`User with email ${email} not found`);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details. Please try again.");
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!selectedIcon || !selectedBackground) {
      toast.error("Please select an icon and a background");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const collaboratorIds = values.collaborators.map(
        (collaborator) => collaborator._id
      );

      const updatedBoard = {
        titleBoard: values.title,
        background: selectedBackground,
        icon: selectedIcon,
        collaborators: collaboratorIds,
      };

      await updateBoard(boardId, updatedBoard);
      await fetchBoards();
      toast.success("Board updated successfully!");
      closeModal();
      onCollaboratorUpdate();
    } catch (error) {
      console.error("Error updating board:", error);
      setError("Failed to update board");
      toast.error("Failed to update board. Please try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <FormWrapper>
      <ModalHeader>
        <Title>Edit board</Title>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
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
                value={values.title}
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
                              src={collaborator.avatarURL}
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
                  <CreateButtonAdd>+</CreateButtonAdd> Edit
                </>
              </CreateButton>
            </ModalBody>
          </StyledForm>
        )}
      </Formik>
    </FormWrapper>
  );
};

EditBoardModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired,
  onCollaboratorUpdate: PropTypes.func.isRequired,
};

export default EditBoardModal;
