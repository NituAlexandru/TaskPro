import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/SideBar/Sidebar";
import Board from "../../components/Board/Board/Board";
import {
  HomePageContainer,
  MainContent,
  Content,
  HomeParagraph,
} from "./HomePage.styled";
import { useBoards } from "../../contexts/BoardContext";
import { ColumnProvider } from "../../contexts/ColumnContext";
import { CardProvider } from "../../contexts/CardContext";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [selectedBoardTitle, setSelectedBoardTitle] = useState(null);
  const { titleBoard } = useParams();
  const { boards, fetchBoards } = useBoards();

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (titleBoard && boards.length > 0) {
      const board = boards.find((b) => b.titleBoard === titleBoard);
      if (board) {
        setSelectedBoardId(board._id);
        setSelectedBoardTitle(board.titleBoard);
      }
    } else {
      setSelectedBoardId(null);
      setSelectedBoardTitle(null);
    }
  }, [titleBoard, boards]);

  const handleCollaboratorUpdate = async () => {
    await fetchBoards();
    const updatedBoard = boards.find((b) => b.titleBoard === titleBoard);
    if (updatedBoard) {
      setSelectedBoardId(updatedBoard._id);
      setSelectedBoardTitle(updatedBoard.titleBoard);
    }
  };

  return (
    <ColumnProvider>
      <CardProvider>
        <HomePageContainer>
          <Sidebar
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            setSelectedBoardId={(boardId, boardTitle) => {
              setSelectedBoardId(boardId);
              setSelectedBoardTitle(boardTitle);
            }}
            onCollaboratorUpdate={handleCollaboratorUpdate}
          />
          <MainContent $isOpen={isOpen}>
            <Header isOpen={isOpen} />
            <Content>
              {selectedBoardId ? (
                <Board
                  boardId={selectedBoardId}
                  titleBoard={selectedBoardTitle}
                  onCollaboratorUpdate={handleCollaboratorUpdate}
                />
              ) : (
                <HomeParagraph>
                  Before starting your project, it is essential
                  <b> to create a board </b> to visualize and track all the
                  necessary tasks and milestones. This board serves as a
                  powerful tool to organize the workflow and ensure effective
                  collaboration among team members.
                </HomeParagraph>
              )}
            </Content>
          </MainContent>
        </HomePageContainer>
      </CardProvider>
    </ColumnProvider>
  );
};

export default HomePage;
