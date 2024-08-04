import styled from "styled-components";
import PropTypes from "prop-types";

// Styled-components
const CollaboratorsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 3px;

  h3 {
    margin: 0;
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const CollaboratorTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  margin-right: 10px;

  @media (max-width: 500px) {
    margin: 0;
  }
`;

const AvatarsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
`;

const Tooltip = styled.div`
  visibility: hidden;
  opacity: 0;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  padding: 10px;
  position: absolute;
  bottom: 0;
  width: auto;
  right: auto;
  left: auto;
  transform: translateX(-50%) translateY(10px);
  transition: opacity 0.3s, transform 0.3s;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoCollaborators = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 500px) {
    margin: 0;
  }
`;

// Collaborators Component
const Collaborators = ({ collaborators }) => {
  return (
    <CollaboratorsContainer>
      <CollaboratorTitle>Collaborators:</CollaboratorTitle>
      {collaborators.length > 0 ? (
        <AvatarsContainer>
          {collaborators.map((collaborator) => (
            <AvatarWrapper key={collaborator._id}>
              <Avatar
                src={collaborator.avatarURL}
                alt={`Collaborator Avatar`}
              />
              <Tooltip className="tooltip">{collaborator.name}</Tooltip>
            </AvatarWrapper>
          ))}
        </AvatarsContainer>
      ) : (
        <NoCollaborators>No collaborators</NoCollaborators>
      )}
    </CollaboratorsContainer>
  );
};

// PropTypes validation
Collaborators.propTypes = {
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      avatarURL: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Collaborators;
