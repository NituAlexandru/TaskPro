import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Board from "../components/Board/Board";
import styled from "styled-components";
import { ThemeProvider } from "../utils/ThemeProvider";
import { useState } from "react";

const HomePageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  // margin-left: ${(p) => (p.$isOpen ? "-240px" : "240px")};
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
`;

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ThemeProvider>
      <HomePageContainer>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <MainContent $isOpen={isOpen}>
          <Header isOpen={isOpen} />
          <Content>
            <Board isOpen={isOpen} />
          </Content>
        </MainContent>
      </HomePageContainer>
    </ThemeProvider>
  );
};

export default HomePage;
