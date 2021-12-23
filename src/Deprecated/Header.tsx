import styled from "styled-components";

const Div = styled.div`
  margin: 10px 0px 10px 0px;
  padding-top: 10px;
  padding-bottom: 10px;
`;
// background-color: #00003b;

const Span = styled.span`
  margin-right: 20px;
`;

export type HeaderProps = {};

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
