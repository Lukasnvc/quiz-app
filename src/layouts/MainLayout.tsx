import React, { ReactNode } from "react";

import styled from "styled-components";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

export default MainLayout;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
