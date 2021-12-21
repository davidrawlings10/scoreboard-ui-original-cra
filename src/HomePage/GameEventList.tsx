import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import GameEvent from "../Entity/GameEvent";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import { ClockDisplay } from "../Shared/GameClockDisplay";
import { Clock } from "../Entity/Game";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface GameEventListProps {
  gameEvents: Array<GameEvent>;
}

export default function GameEventList(props: GameEventListProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell align="right">Home</TableCell>
            <TableCell align="right">Away</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.gameEvents.map((gameEvent) => {
            const clock: Clock = {
              period: gameEvent.period,
              minutes: gameEvent.minutes,
              seconds: gameEvent.seconds,
              intermission: false,
              final: false,
            };
            return (
              <TableRow key={gameEvent.id}>
                <TableCell component="th" scope="row">
                  <TeamDisplay id={gameEvent.teamId} />
                </TableCell>
                <TableCell align="right">{gameEvent.homeScore}</TableCell>
                <TableCell align="right">{gameEvent.awayScore}</TableCell>
                <TableCell align="right">
                  <ClockDisplay clock={clock} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
