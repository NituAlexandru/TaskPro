import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Board from "../components/Board/Board";
import styled from "styled-components";
import { ThemeProvider } from "../utils/ThemeProvider";
import { useState } from "react";
import { BoardProvider } from "../contexts/BoardContext";
import { ColumnProvider } from "../contexts/ColumnContext";

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
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
`;

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleBoardSelect = (boardId) => {
    console.log("Selected Board ID:", boardId); // Log the selected board ID
    setSelectedBoardId(boardId);
  };

  return (
    <ThemeProvider>
      <BoardProvider>
        <ColumnProvider>
          <HomePageContainer>
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} setSelectedBoardId={handleBoardSelect} />
            <MainContent $isOpen={isOpen}>
              <Header isOpen={isOpen} />
              <Content>
                {selectedBoardId ? <Board boardId={selectedBoardId} /> : <p>Please select a board</p>}
              </Content>
            </MainContent>
          </HomePageContainer>
        </ColumnProvider>
      </BoardProvider>
    </ThemeProvider>
  );
};

export default HomePage;
