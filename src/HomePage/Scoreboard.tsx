import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import ClockDisplay from "../Shared/ClockDisplay";
import Game from "../Entity/Game";

import { Box, Grid } from "@material-ui/core";

export type ScoreboardProps = {
  game: Game | null;
  small?: boolean;
};

export default function Scoreboard(props: ScoreboardProps) {
  if (!props.game) {
    return <div></div>;
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box
        bgcolor="primary.main"
        border="1px solid black"
        width={props.small ? 200 : 360}
      >
        <Grid container>
          <Grid item xs={props.small ? 9 : 10}>
            <Box border="1px solid black" p={1}>
              <TeamDisplay
                id={props.game.homeTeamId}
                hideLocation={props.small}
              />
            </Box>
          </Grid>
          <Grid item xs={props.small ? 3 : 2}>
            <Box border="1px solid black" p={1} textAlign="center">
              {props.game.homeScore}
            </Box>
          </Grid>
          <Grid item xs={props.small ? 9 : 10}>
            <Box border="1px solid black" p={1}>
              <TeamDisplay
                id={props.game.awayTeamId}
                hideLocation={props.small}
              />
            </Box>
          </Grid>
          <Grid item xs={props.small ? 3 : 2}>
            <Box border="1px solid black" p={1} textAlign="center">
              {props.game.awayScore}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box border="1px solid black" p={1}>
              <Box textAlign="right">
                <ClockDisplay game={props.game} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
