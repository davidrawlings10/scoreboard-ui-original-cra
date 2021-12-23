import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@material-ui/core";

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
  const {gameEvents} = props;

  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center">
      <Box width="60%">
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Team</TableCell>
                <TableCell align="right">Home</TableCell>
                <TableCell align="right">Away</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameEvents.map((gameEvent) => {
                const clock: Clock = {
                  period: gameEvent.period,
                  minutes: gameEvent.minutes,
                  seconds: gameEvent.seconds,
                  intermission: false,
                  final: false,
                };
                return (
                  <TableRow key={gameEvent.id}>
                    <TableCell scope="row">
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
      </Box>
    </Box>
  );
}
