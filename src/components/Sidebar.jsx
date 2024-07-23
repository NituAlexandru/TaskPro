import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
// import { FiEdit, FiTrash2 } from "react-icons/fi";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.sidebarBackgroundColor};
  color: ${({ theme }) => theme.sidebarTextColor};
  height: 100vh;
  max-width: 260px;
  position: relative;
  width: ${({ $isOpen }) => ($isOpen ? "250px" : "0")};
  transition: width 0.5s ease-in-out;
  justify-content: space-between;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.toggleBtn};
  cursor: pointer;
  position: absolute;
  top: 70px;
  right: -20px;
  transition: transform 0.3s ease;
  background-color: ${({ theme }) => theme.sidebarBackgroundColor};
  width: 40px;
  height: 40px;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.sidebarBackgroundColor};
    color: ${({ theme }) => theme.sidebarBtn};
    outline: none;
    transform: none;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: auto;
  margin-top: 0;
  padding: 20px;
  padding-top: 0;
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 32px;
    height: 32px;
  }
`;
const MainTitle = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.logoText};
`;

const NewBoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 15px;

  p {
    margin: 0;
  }
`;

const BoardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbarTrack};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.scrollbarThumb};
    border-radius: 8px;
    border: 2px solid ${({ theme }) => theme.scrollbarTrack};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollbarThumbHover};
  }
`;

const BoardListItem = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const BoardListItemContainer = styled.div`
  display: flex;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &.edit-button img,
  &.delete-button img {
    width: 14px;
    height: 14px;
    background-color: ${({ theme }) => theme.sidebarBackgroundColor};
  }
`;

const HelpList = styled.ul`
  list-style: none;
  border-radius: 8px;
  width: 212px;
  height: 272px;
  padding: 10px;
  margin: 0;
  background-color: ${({ theme }) => theme.helpListBackground};
`;

const HelpListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  width: 100%;
`;

const SidebarHeading = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.02em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 15px;
  color: ${({ theme }) => theme.sidebarHeading};
`;

const Paragraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.sidebarTextColor};
  margin: 0;
`;
const HelpParagraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.42857;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.sidebarTextColor};
`;

const AddBoardBtn = styled.button`
  border-radius: 6px;
  width: 40px;
  height: 36px;
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.addBoardBtn};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
`;
const LogOutBtn = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.sidebarTextColor};
  gap: 10px;
  stroke: #fff;
  margin: 0 15px;
  margin-bottom: 15px;
  padding: 10px 0;

  &:hover,
  &:focus {
    background-color: transparent;
    outline: none;
    text-decoration: underline;
  }
`;
const FlowerImage = styled.img`
  width: 54px;
  height: 78px;
`;

const ImageEditDelete = styled.img`
  width: 16px;
  height: 16px;
  color: red;
  fill: red;
`;

const LogOutImg = styled.img`
 stroke="#fff";
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <ToggleButton $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiArrowLeft /> : <FiArrowRight />}
      </ToggleButton>
      <SidebarContent $isOpen={isOpen}>
        <LogoContainer>
          <Image src="/src/assets/logo-white.png" alt="Task Pro Logo" />
          <MainTitle>Task Pro</MainTitle>
        </LogoContainer>
        <SidebarHeading>My boards</SidebarHeading>
        <NewBoardContainer>
          <Paragraph>
            Create a <br /> new board
          </Paragraph>
          <AddBoardBtn>+</AddBoardBtn>
        </NewBoardContainer>

        <BoardList>
          <BoardListItem>
            <BoardListItemContainer>
              <Image src="" alt="img" />
              <Paragraph>Project office</Paragraph>
            </BoardListItemContainer>
            <BoardListItemContainer>
              <IconButton className="edit-button">
                <ImageEditDelete
                  src="/src/assets/utils/pencil.svg"
                  alt="Edit"
                />
              </IconButton>
              <IconButton className="delete-button">
                <ImageEditDelete
                  src="/src/assets/utils/trash.svg"
                  alt="Delete"
                />
              </IconButton>
            </BoardListItemContainer>
          </BoardListItem>

          <BoardListItem>
            <BoardListItemContainer>
              <Image src="" alt="img" />
              <Paragraph>Project office</Paragraph>
            </BoardListItemContainer>
            <BoardListItemContainer>
              <IconButton className="edit-button">
                <ImageEditDelete
                  src="/src/assets/utils/pencil.svg"
                  alt="Edit"
                />
                {/* <FiEdit />
                <FiTrash2 /> */}
              </IconButton>
              <IconButton className="delete-button">
                <ImageEditDelete
                  src="/src/assets/utils/trash.svg"
                  alt="Delete"
                />
              </IconButton>
            </BoardListItemContainer>
          </BoardListItem>

          {/* TEST - de sters */}

          <BoardListItem>
            <BoardListItemContainer>
              <Image src="" alt="img" />
              <Paragraph>Project office</Paragraph>
            </BoardListItemContainer>
            <BoardListItemContainer>
              <IconButton className="edit-button">
                <Image src="/src/assets/utils/pencil.png" alt="Edit" />
              </IconButton>
              <IconButton className="delete-button">
                <Image src="/src/assets/utils/trash.png" alt="Delete" />
              </IconButton>
            </BoardListItemContainer>
          </BoardListItem>
          <BoardListItem>
            <BoardListItemContainer>
              <Image src="" alt="img" />
              <Paragraph>Project office</Paragraph>
            </BoardListItemContainer>
            <BoardListItemContainer>
              <IconButton className="edit-button">
                <Image src="/src/assets/utils/pencil.png" alt="Edit" />
              </IconButton>
              <IconButton className="delete-button">
                <Image src="/src/assets/utils/trash.png" alt="Delete" />
              </IconButton>
            </BoardListItemContainer>
          </BoardListItem>
          <BoardListItem>
            <BoardListItemContainer>
              <Image src="" alt="img" />
              <Paragraph>Project office</Paragraph>
            </BoardListItemContainer>
            <BoardListItemContainer>
              <IconButton className="edit-button">
                <Image src="/src/assets/utils/pencil.png" alt="Edit" />
              </IconButton>
              <IconButton className="delete-button">
                <Image src="/src/assets/utils/trash.png" alt="Delete" />
              </IconButton>
            </BoardListItemContainer>
          </BoardListItem>
          <BoardListItem>
            <BoardListItemContainer>
              <Image src="" alt="img" />
              <Paragraph>Project office</Paragraph>
            </BoardListItemContainer>
            <BoardListItemContainer>
              <IconButton className="edit-button">
                <Image src="/src/assets/utils/pencil.png" alt="Edit" />
              </IconButton>
              <IconButton className="delete-button">
                <Image src="/src/assets/utils/trash.png" alt="Delete" />
              </IconButton>
            </BoardListItemContainer>
          </BoardListItem>
          <BoardListItem>
            <BoardListItemContainer>
              <Image src="" alt="img" />
              <Paragraph>Project office</Paragraph>
            </BoardListItemContainer>
            <BoardListItemContainer>
              <IconButton className="edit-button">
                <Image src="/src/assets/utils/pencil.png" alt="Edit" />
              </IconButton>
              <IconButton className="delete-button">
                <Image src="/src/assets/utils/trash.png" alt="Delete" />
              </IconButton>
            </BoardListItemContainer>
          </BoardListItem>

          {/* TEST - de sters */}
        </BoardList>

        <HelpList>
          <HelpListItem>
            <FlowerImage
              src="/src/assets/utils/flower.png"
              alt="happy flower"
            />
          </HelpListItem>
          <HelpListItem>
            <HelpParagraph>
              If you need help with <strong>TaskPro</strong>, check out our
              support resources or reach out to our customer support team.
            </HelpParagraph>
          </HelpListItem>
          <HelpListItem>
            <Image src="/src/assets/utils/help-circle.png" alt="help" />
            <span>Need help?</span>
          </HelpListItem>
        </HelpList>
      </SidebarContent>
      <LogOutBtn onClick={handleLogout}>
        <LogOutImg src="/src/assets/icons/login.svg" alt="" />
        <span> Log out</span>
      </LogOutBtn>
    </SidebarContainer>
  );
};

export default Sidebar;
