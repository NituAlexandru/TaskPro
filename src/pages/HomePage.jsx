import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import styled from "styled-components";

const HomeContainer = styled.div`
  padding: 20px;
`;

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <HomeContainer>
      <h1>Welcome, {user?.name}</h1>

      {/* Alte componente pentru pagina de home */}
    </HomeContainer>
  );
};

export default HomePage;
