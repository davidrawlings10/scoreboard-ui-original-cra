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
  const { gameEvents } = props;

  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center">
      <Box width="50%">
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Team</TableCell>
                <TableCell>Home</TableCell>
                <TableCell>Away</TableCell>
                <TableCell>Time</TableCell>
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
                    <TableCell>
                      <TeamDisplay id={gameEvent.teamId} hideLocation />
                    </TableCell>
                    <TableCell>{gameEvent.homeScore}</TableCell>
                    <TableCell>{gameEvent.awayScore}</TableCell>
                    <TableCell>
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
