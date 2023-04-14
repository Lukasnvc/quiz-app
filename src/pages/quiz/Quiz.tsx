import { greyColor, violetDark, violetLight } from "../../consts/colors";
import { useContext, useState } from "react";

import Button from "../../components/Button";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import EndCard from "../../components/EndCard";
import { HOME_PATH } from "../../routes/const";
import QuestionCard from "../../components/QuestionCard";
import { UserContext } from "../../context/UserContext";
import { VscDebugRestart } from "react-icons/vsc";
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
  const [key, setKey] = useState(0);
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
      setKey((prev) => prev + 1);
      return { shouldRepeat: true };
    }
  };

  return (
    <Wrapper>
      {!gameOver && (
        <CountdownCircleTimer
          size={140}
          key={key}
          onComplete={nextQuestion}
          isPlaying={!gameOver}
          duration={15}
          colors={[violetLight, violetDark, "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}>
          {({ remainingTime }) => <Time>{remainingTime}</Time>}
        </CountdownCircleTimer>
      )}
      {!gameOver ? (
        <Score>
          <p>DIFFICULTY : {difficulty}</p>
          <p>Score : {score}</p>
        </Score>
      ) : (
        <EndCard summary={userAnswers} score={score} />
      )}

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
        <StyledBtn onClick={nextQuestion}>NEXT</StyledBtn>
      ) : null}
      {gameOver && (
        <>
          <Restart onClick={() => navigate(HOME_PATH)}>
            Restart
            <VscDebugRestart />
          </Restart>
        </>
      )}
    </Wrapper>
  );
};

export default Quiz;

const Wrapper = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1100px;
  height: 100vh;
`;

const StyledBtn = styled(Button)`
  font-size: 1.2rem;
  align-items: center;
  margin-top: 50px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid ${greyColor};
  &:hover {
    background-color: #59bc86;
  }
`;

const Score = styled.div`
  font-size: 1.3rem;
  margin: 30px;
  color: ${violetDark};
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 10px;
  }
`;

const Time = styled.p`
  color: ${violetDark};
  font-size: 1.8rem;
`;

const Restart = styled(Button)`
  align-items: center;
  padding: 20px 40px;
  font-size: 1.3rem;
  margin-top: 50px;
  svg {
    margin-left: 10px;
    font-size: 1.6rem;
  }
  &:hover {
    background-color: #59bc86;
  }
`;
