import React, { useContext, useState } from "react";
import { blackColor, greyColor, mainShadow } from "../../consts/colors";

import Button from "../../components/Button";
import { HOME_PATH } from "../../routes/const";
import QuestionCard from "../../components/QuestionCard";
import { UserContext } from "../../context/UserContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../../hooks/useQuestions";

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string[];
};

const Quiz = () => {
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();
  const { difficulty, category } = useContext(UserContext);
  const { data, isLoading } = useQuestions(difficulty, category);
  const list = data || [];
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = list[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: list[number].question,
        answer,
        correct,
        correctAnswer: list[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <Wrapper>
      <p>{difficulty}</p>
      <p>Score : {score}</p>
      {!isLoading ? (
        <>
          {!gameOver ? (
            <QuestionCard
              questionNr={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={list[number].question}
              answers={list[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          ) : null}
        </>
      ) : (
        <h3>Loading questions ...</h3>
      )}
      {!gameOver &&
      !isLoading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS ? (
        <StyledBtn onClick={nextQuestion}>
          NEXT <br />
          QUESTION
        </StyledBtn>
      ) : null}
      {gameOver && (
        <>
          <Button onClick={() => navigate(HOME_PATH)}>RESTART</Button>
        </>
      )}
    </Wrapper>
  );
};

export default Quiz;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1100px;
  height: 90vh;
`;

const StyledBtn = styled(Button)`
  margin: 40px;
  width: 160px;
  height: 160px;
  font-size: 1.2rem;
  border-radius: 100%;
  box-shadow: ${mainShadow};
  border: 3px solid ${greyColor};
  font-family: "Mochiy Pop One", sans-serif;
  &:hover {
    background-color: #59bc86;
  }
`;
