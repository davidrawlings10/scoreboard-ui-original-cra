import Header from "../Header";
import HomePage from "../HomePage/HomePage";
import SeasonPage from "../SeasonPage";
import AddGameForm from "../StartGameForm";
import "./App.css";

const App = (props) => {
  const url = window.location.href;
  const domain = "http://localhost:3000";

  let path = "";
  if (url.indexOf(domain) === 0) {
    path = url.substr(domain.length);
  }

  let displayElement = "";
  switch (path) {
    case "/season":
      displayElement = <SeasonPage />;
      break;
    case "/addGame":
      displayElement = <AddGameForm />;
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
