import { greyColor, mainShadow, violetLight } from "../consts/colors";

import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  type?: "submit" | "button" | "reset";
  children: ReactNode;
  isViolet?: boolean;
  form?: string;
  onClick?: () => void;
};

const Button = ({ type = "button", children, isViolet = true, ...rest }: Props) => {
  return (
    <StyledButton type={type} isViolet={isViolet} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{ isViolet?: boolean }>`
  background-color: ${(props) => (props.isViolet ? `${violetLight}` : `${greyColor}`)};
  color: ${(props) => (props.isViolet ? "white" : "black")};
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: ${mainShadow};
`;
