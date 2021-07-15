import Header from "./Header";
import HomePage from "./HomePage";
import SeasonPage from "./SeasonPage";
import AddGameForm from "./AddGameForm";
import styled from "styled-components";
import "./App.css";

export type AppProps = {};

const Div = styled.div`
  background-color: white;
`;

const App = (props: AppProps) => {
  const url = window.location.href;
  const domain = "http://localhost:3000";

  let path = "";
  if (url.indexOf(domain) === 0) {
    path = url.substr(domain.length);
  }

  let displayElement: any = null;
  switch (path) {
    case "/season":
      displayElement = <SeasonPage />;
      break;
    case "/addGame":
      displayElement = (
        <Div>
          <AddGameForm />
        </Div>
      );
      break;
    default:
      displayElement = <HomePage />;
      break;
  }

  return (
    <div className="App">
      <div className="Container">
        <Header />
        {displayElement}
      </div>
    </div>
  );
};

export default App;
