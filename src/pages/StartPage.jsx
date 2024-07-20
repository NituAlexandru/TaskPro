import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 9%,
    rgba(246, 246, 246, 1) 22%,
    rgba(184, 218, 168, 1) 81%
  );
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  text-align: center;
  color: #fff;
  text-decoration: none;
  text-align: center;
  border-radius: 8px;
  width: 344px;
  height: 49px;
  background: #161616;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  &:hover {
    background-color: #333;
  }
`;

const SimpleLink = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: #161616;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Paragraph = styled.p`
  max-width: 473px;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.28571;
  letter-spacing: -0.02em;
  text-align: center;
  color: #161616;
  margin-bottom: 30px;
`;

const StartPage = () => {
  return (
    <Container>
      <img src="/src/assets/registerimg.webp" alt="User using MacBook" />
      <LogoContainer>
        <img src="/src/assets/logo-black.png" alt="Task Pro Logo" />
        <h1>Task Pro</h1>
      </LogoContainer>

      <Paragraph>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don&rsquo;t wait, start achieving your goals now!
      </Paragraph>
      <StyledLink to="/register">Registration</StyledLink>
      <SimpleLink to="/login">Log In</SimpleLink>
    </Container>
  );
};

export default StartPage;
