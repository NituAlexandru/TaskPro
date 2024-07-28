import styled from "styled-components";
import PropTypes from "prop-types";

const CollaboratorsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CollaboratorTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  margin-right: 10px;
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

// const Avatar = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 8px;
// `;

// const Tooltip = styled.div`
//   visibility: hidden;
//   opacity: 0;
//   background-color: ${({ theme }) => theme.tooltipBackground};
//   color: ${({ theme }) => theme.tooltipText};
//   text-align: center;
//   border-radius: 4px;
//   padding: 5px;
//   position: absolute;
//   bottom: 50px;
//   width: 120px;
//   left: 50%;
//   transform: translateX(-50%) translateY(10px);
//   transition: opacity 0.3s, transform 0.3s;
//   z-index: 1;

//   &::after {
//     content: "";
//     position: absolute;
//     top: 100%;
//     left: 50%;
//     margin-left: -5px;
//     border-width: 5px;
//     border-style: solid;
//     border-color: ${({ theme }) => theme.tooltipBackground} transparent
//       transparent transparent;
//   }
// `;

const NoCollaborators = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Collaborators = () => {
  return (
    <CollaboratorsContainer>
      <CollaboratorTitle>Collaborators:</CollaboratorTitle>
      {/* {collaborators.length > 0 ? ( */}
      <AvatarsContainer>
        {/* {collaborators.map((collaborator, index) => ( */}
        <AvatarWrapper>
          {/* <Avatar src={collaborator.avatar} alt={`Collaborator ${index + 1}`} />
          <Tooltip className="tooltip">{collaborator.name}</Tooltip> */}
        </AvatarWrapper>
        {/* ))} */}
      </AvatarsContainer>
      {/* ) : ( */}
      <NoCollaborators>No collaborators</NoCollaborators>
      {/* )} */}
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
