import { greyColor, mainShadow } from "../consts/colors";

import { AnswerObject } from "../pages/quiz/Quiz";
import React from "react";
import { blackColor } from "../consts/colors";
import styled from "styled-components";
import { violetDark } from "../consts/colors";

type Props = {
  question: string;
  answers: string[];
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <Card>
      <h3>
        Question : {questionNr} / {totalQuestions}
      </h3>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <Answers>
        {answers.map((answer, index) => (
          <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer?.includes(answer) ?? false}
            userClicked={userAnswer?.answer === answer}>
            <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </Answers>
    </Card>
  );
};

export default QuestionCard;

const Card = styled.div`
  width: 80%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${greyColor};
  border-radius: 5px;
  box-shadow: ${mainShadow};
  h3 {
    color: ${violetDark};
    font-size: 1.5rem;
  }
  p {
    width: 100%;
    text-align: center;
  }
`;

const Answers = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  gap: 10px;
  Button {
    padding: 10px;
  }
`;

type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3s ease;

  :hover {
    opacity: 0.8;
  }
  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 100%;
    margin: 5px 0;
    background: ${({ correct, userClicked }) =>
      correct ? " #59BC86" : !correct && userClicked ? " #FF5656" : "#e3a2bd"};
    border: 2px solid ${violetDark};
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: ${blackColor};
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`;
