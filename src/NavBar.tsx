import { Link } from "react-router-dom";
import { Box, AppBar } from "@material-ui/core";
import { Home, List, PlayArrow, PlaylistAdd } from "@material-ui/icons";
import theme from "./theme";

/*const linkStyle = {
  color: theme.palette.text.primary,
  textDecoration: "none",
  fontWeight: "bold",
};*/

export default function NavBar() {
  return (
    <Box>
      <AppBar position="static">
        <Box display="flex" flexDirection="row" paddingLeft={2}>
          <Box padding={1} marginRight={1}>
            <Link
              to="/"
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none",
                fontWeight: "bold",
                /*"&:hover": {
                  color: theme.palette.text.secondary,
                },*/
              }}
            >
              <Box display="flex" flexDirection="row" marginRight={2}>
                <Home />
                <Box marginLeft={1}>Home</Box>
              </Box>
            </Link>
          </Box>
          <Box padding={1} marginRight={1}>
            <Link
              to="/season"
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              <Box display="flex" flexDirection="row" marginRight={2}>
                <List />
                <Box marginLeft={1}>Season</Box>
              </Box>
            </Link>
          </Box>
          <Box padding={1} marginRight={1}>
            <Link
              to="/scheduleSeason"
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              <Box display="flex" flexDirection="row" marginRight={2}>
                <PlayArrow />
                <Box marginLeft={1}>Schedule Season</Box>
              </Box>
            </Link>
          </Box>
          <Box padding={1} marginRight={1}>
            <Link
              to="/startGame"
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              <Box display="flex" flexDirection="row" marginRight={2}>
                <PlaylistAdd />
                <Box marginLeft={1}>Start Game</Box>
              </Box>
            </Link>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
}
