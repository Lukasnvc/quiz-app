import React, { useContext } from "react";
import { greyColor, mainShadow, violetDark, violetLight } from "../../consts/colors";

import { AiFillGithub } from "react-icons/ai";
import Button from "../../components/Button";
import Logo from "../../consts/logo.png";
import { QUIZ_PATH } from "../../routes/const";
import { UserContext } from "../../context/UserContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { setDifficulty, setCategory } = useContext(UserContext);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedDifficulty = (
      event.currentTarget.elements.namedItem("difficulty") as HTMLSelectElement
    ).value;
    const selectedCategory = (
      event.currentTarget.elements.namedItem("category") as HTMLSelectElement
    ).value;
    setDifficulty(selectedDifficulty);
    setCategory(selectedCategory);
    navigate(QUIZ_PATH);
  };
  return (
    <Wrapper>
      <StyledLogo src={Logo} alt="quiz logo" />
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="difficulty">CHOOSE DIFFICULTY</label>
        <select name="difficulty">
          <option value="easy">EASY</option>
          <option value="medium">MEDIUM</option>
          <option value="hard">HARD</option>
        </select>
        <label htmlFor="category">CHOOSE CATEGORY</label>
        <select name="category">
          <option value="9">GENERAL KNOWLEDGE</option>
          <option value="21">SPORTS</option>
          <option value="23">HISTORY</option>
          <option value="22">GEOGRAPHY</option>
          <option value="26">CELEBRITIES</option>
          <option value="27">ANIMALS</option>
          <option value="28">VEHICLES</option>
          <option value="11">MOVIES</option>
          <option value="12">MUSIC</option>
          <option value="15">VIDEO GAMES</option>
          <option value="20">MYTHOLOGY</option>
          <option value="10">BOOKS</option>
          <option value="17">SCIENCE & NATURE</option>
          <option value="18">COMPUTERS</option>
        </select>
        <Button type="submit" isViolet={true}>
          START
        </Button>
      </StyledForm>
      <Footer>
        <p>Made by Lukas</p>
        <a href="https://github.com/Lukasnvc/quiz-app.git" target="blank">
          <AiFillGithub />
        </a>
      </Footer>
    </Wrapper>
  );
};

export default Home;

const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  color: ${violetLight};
  p {
    font-size: 0.5rem;
    margin-right: 10px;
  }
  a {
    text-decoration: none;
    color: ${violetLight};
    svg {
      font-size: 1.2rem;
      cursor: pointer;
      &:hover {
        color: ${greyColor};
      }
    }
  }
`;

const StyledLogo = styled.img`
  width: 200px;
  height: 200px;
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 1000px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 30%;

  label {
    color: #ffffff;
    margin-bottom: 10px;
    font-size: 1.3rem;
    font-weight: 600;
    word-spacing: 10px;
  }
  select {
    border: none;
    margin: 10px 0;
    padding: 10px;
    font-size: 1rem;
    background-color: ${greyColor};
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    font-family: "Mochiy Pop One", sans-serif;
    outline: none;
    box-shadow: ${mainShadow};
  }
  Button {
    font-size: 1.3rem;
    margin-top: 10px;
    padding: 10px 20px;
    font-family: "Mochiy Pop One", sans-serif;
    &:hover {
      background-color: ${violetDark};
    }
  }
`;
