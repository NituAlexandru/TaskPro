import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Board from "../components/Board/Board";
import styled from "styled-components";
import { ThemeProvider } from "../utils/ThemeProvider";
import { useState } from "react";
import { BoardProvider } from "../contexts/BoardContext";
import { ColumnProvider } from "../contexts/ColumnContext";
import { CardProvider } from "../contexts/CardContext";

const HomePageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

const HomeParagraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.28571;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin: auto auto;
  max-width: 486px;
`;

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleBoardSelect = (boardId) => {
    console.log("Selected Board ID:", boardId);
    setSelectedBoardId(boardId);
  };

  return (
    <ThemeProvider>
      <BoardProvider>
        <ColumnProvider>
          <CardProvider>
            <HomePageContainer>
              <Sidebar
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
                setSelectedBoardId={handleBoardSelect}
              />
              <MainContent $isOpen={isOpen}>
                <Header isOpen={isOpen} />
                <Content>
                  {selectedBoardId ? (
                    <Board boardId={selectedBoardId} />
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
      </BoardProvider>
    </ThemeProvider>
  );
};

export default HomePage;
