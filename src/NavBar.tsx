import { Link } from "react-router-dom";
import { Box, AppBar } from "@material-ui/core";
import { Home, List, PlayArrow, PlaylistAdd } from "@material-ui/icons";

export default function NavBar() {
  return (
    <Box>
      <AppBar position="static">
        <Box display="flex" flexDirection="row">
          <Box padding={1}>
            <Home />
            <Link to="/">Home</Link>
          </Box>
          <Box padding={1}>
            <List />
            <Link to="/season">Season</Link>
          </Box>
          <Box padding={1}>
            <PlayArrow />
            <Link to="/scheduleSeason">Schedule Season</Link>
          </Box>
          <Box padding={1}>
            <PlaylistAdd />
            <Link to="/startGame">Play Game</Link>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
}
