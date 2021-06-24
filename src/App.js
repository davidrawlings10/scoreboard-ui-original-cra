import { useState } from "react";
import Header from "./Header";
import HomePage from "./HomePage";
import SeasonPage from "./SeasonPage";
import AddGameForm from "./AddGameForm";
import "./App.css";

const App = (props) => {
  const [displayElementIndex, setDisplayElementIndex] = useState(0);

  let displayElement = "";
  switch (displayElementIndex) {
    case 0:
      displayElement = <HomePage />;
      break;
    case 1:
      displayElement = <SeasonPage />;
      break;
    case 2:
      displayElement = <AddGameForm />;
      break;
    default:
      displayElement = <HomePage />;
      break;
  }

  return <div className="App">{displayElement}</div>;
};

export default App;
