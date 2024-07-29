import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar/SideBar/Sidebar";
import Board from "../../components/Board/Board/Board";
import { HomePageContainer, MainContent, Content, HomeParagraph } from "./HomePage.styled";
import { ThemeProvider } from "../../utils/ThemeProvider";
import { useBoards } from "../../contexts/BoardContext";
import { ColumnProvider } from "../../contexts/ColumnContext";
import { CardProvider } from "../../contexts/CardContext";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const { boards } = useBoards();
  const { titleBoard } = useParams();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (titleBoard && boards.length > 0) {
      const board = boards.find((b) => b.titleBoard === titleBoard);
      if (board) {
        setSelectedBoardId(board._id); // Correctly use _id
      }
    }
  }, [titleBoard, boards]);

  return (
    <ThemeProvider>
      <ColumnProvider>
        <CardProvider>
          <HomePageContainer>
            <Sidebar
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              setSelectedBoardId={(boardId, titleBoard) => {
                setSelectedBoardId(boardId);
                // Optionally navigate or handle logic if needed
              }}
            />
            <MainContent $isOpen={isOpen}>
              <Header isOpen={isOpen} />
              <Content>
                {selectedBoardId ? (
                  <Board boardId={selectedBoardId} titleBoard={titleBoard} />
                ) : (
                  <HomeParagraph>
                    Before starting your project, it is essential
                    <b> to create a board </b> to visualize and track all the
                    necessary tasks and milestones. This board serves as a
                    powerful tool to organize the workflow and ensure
                    effective collaboration among team members.
                  </HomeParagraph>
                )}
              </Content>
            </MainContent>
          </HomePageContainer>
        </CardProvider>
      </ColumnProvider>
    </ThemeProvider>
  );
};

export default HomePage;

