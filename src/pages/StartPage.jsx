import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 9%,
    rgba(246, 246, 246, 1) 22%,
    rgba(184, 218, 168, 1) 81%
  );
  position: relative;
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

  @media (max-width: 500px) {
    width: 80%;
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

  @media (max-width: 500px) {
    width: 80%;
  }
`;

const InfoPopup = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 500px;
  min-width: 300px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  color: red;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 50px 30px 0 30px;
    border-style: solid;
    border-color: ${({ theme }) => theme.modalBackgroundColor} transparent
      transparent transparent;
  }
`;

const StartPage = () => {
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfoPopup(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <img
        src="https://i.ibb.co/ypQBpPN/registerimg.webp"
        alt="User using MacBook"
      />
      <InfoPopup visible={showInfoPopup}>
        Please note, due to the use of a free hosting service provided by{" "}
        <a href="https://render.com" target="_blank" rel="noopener noreferrer">
          Render.com
        </a>
        , the server may enter a standby mode when inactive. As a result, the
        first request might experience a delay of approximately 60 seconds.
        Subsequent requests will be processed without delay.
      </InfoPopup>
      <LogoContainer>
        <img
          src="https://i.ibb.co/qn7xB02/logo-black.png"
          alt="Task Pro Logo"
        />
        <h1>Task Pro</h1>
      </LogoContainer>
      <Paragraph>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don’t wait, start achieving your goals now!
      </Paragraph>
      <StyledLink to="/register">Registration</StyledLink>
      <SimpleLink to="/login">Log In</SimpleLink>
    </Container>
  );
};

export default StartPage;
