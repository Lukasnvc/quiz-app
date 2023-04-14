import { greyColor, violetDark } from "../consts/colors";

import { AnswerObject } from "../pages/quiz/Quiz";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import styled from "styled-components";

type Props = {
  summary: AnswerObject[];
  score: number;
};

const EndCard = ({ summary, score }: Props) => {
  function decodeHtml(html: any) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent;
  }
  return (
    <Wrapper>
      <h3>Scored {score} / 10</h3>
      {summary.map((answer) => (
        <div key={answer.answer}>
          <p>{decodeHtml(answer.question)}</p>

          {answer.correct ? (
            <Correct>
              <FaCheck />
              <span>{decodeHtml(answer.answer)}</span>
            </Correct>
          ) : (
            <InCorrect>
              <span>
                {" "}
                <ImCross />
                {decodeHtml(answer.answer)}
              </span>
              <p>Correct answer : {decodeHtml(answer.correctAnswer)}</p>
            </InCorrect>
          )}
        </div>
      ))}
    </Wrapper>
  );
};

export default EndCard;

const Wrapper = styled.div`
  background-color: ${greyColor};
  max-width: 80vw;
  max-height: 60vh;
  padding: 10px;
  border-radius: 5px;
  overflow-y: scroll;
  h3 {
    text-align: center;
    color: ${violetDark};
  }
  div {
    border-bottom: 1px solid ${violetDark};
  }
  p {
    font-size: 0.7rem;
    text-align: center;
  }
  span {
    font-size: 0.6rem;
  }
`;

const Correct = styled.div`
  text-align: center;
  color: #59bc86;
  svg {
    margin-right: 10px;
  }
`;
const InCorrect = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  span {
    color: #a30000;
  }
  svg {
    margin-right: 10px;
  }
  p {
    font-size: 0.6rem;
  }
`;
