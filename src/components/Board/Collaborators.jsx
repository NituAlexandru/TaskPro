import styled from "styled-components";
import PropTypes from "prop-types";

const CollaboratorsContainer = styled.div`
  display: flex;
  align-items: center;

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
  right: 40px;
  top: 0;
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

const Collaborators = ({ collaborators }) => {
  return (
    <CollaboratorsContainer>
      <CollaboratorTitle>Collaborators:</CollaboratorTitle>
      {collaborators.length > 0 ? (
        <AvatarsContainer>
          {collaborators.map((collaborator, index) => (
            <AvatarWrapper key={index}>
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

Collaborators.propTypes = {
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

export default Collaborators;
