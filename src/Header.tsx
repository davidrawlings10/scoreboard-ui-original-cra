// const styled = require("styled-components");
import styled from "styled-components";

export type HeaderProps = {};

const Span = styled.span`
  margin: 10px;
`;

const Div = styled.div`
  margin: 10px 0px 10px 0px;
`;

const Header = (props: HeaderProps) => {
  return (
    <Div>
      <Span>
        <a href="http://localhost:3000">Home</a>
      </Span>
      <Span>
        <a href="http://localhost:3000/season">Season</a>
      </Span>
      <Span>
        <a href="http://localhost:3000/addGame">Add Game</a>
      </Span>
    </Div>
  );
};

export default Header;
