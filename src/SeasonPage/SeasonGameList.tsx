import { useState, useEffect } from "react";
import { Box, Select, InputLabel, MenuItem } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import config from "../config";
import "./Table.css";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import Game from "../Entity/Game";
import Standing from "../Entity/Standing";
import { getFinalText } from "../Shared/GameClockDisplay";

export type SeasonGameListProps = {
  seasonId: number;
};

export default function SeasonGameList(props: SeasonGameListProps) {
  const PAGE_SIZE = 20;

  const [games, setGames] = useState<Array<Game>>([]);
  const [page, setPage] = useState<number>(1);
  const [teamIds, setTeamIds] = useState<Array<number>>([]);
  const [teamIdFilter, setTeamIdFilter] = useState<number | null>(null);

  useEffect(() => {
    setTeamIdFilter(null);
  }, [props.seasonId]);

  useEffect(() => {
    fetch(
      config.baseUrl +
        "/game/getGamesBySeasonId?seasonId=" +
        props.seasonId +
        "&page=" +
        page +
        "&pageSize=" +
        PAGE_SIZE +
        "&teamId=" +
        teamIdFilter
    )
      .then((res) => res.json())
      .then((gamesResult) => {
        setGames(gamesResult.list);
      });
    setPage(1);
  }, [props.seasonId, page, teamIdFilter]);

  useEffect(() => {
    fetch(`${config.baseUrl}/standing/get?seasonId=${props.seasonId}`)
      .then((res) => res.json())
      .then((standingsResult) =>
        setTeamIds(
          standingsResult.list.map((standing: Standing) => standing.teamId)
        )
      );
  }, [props.seasonId]);

  function handleTeamIdFilterChange(event: React.ChangeEvent<any>) {
    if (event.target.value === 0) {
      setTeamIdFilter(null);
    } else {
      setTeamIdFilter(event.target.value);
    }
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Box
      marginTop={5}
      marginBottom={5}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box>
        <Box display="flex" flexDirection="row">
          <Box marginRight={1} width={400}>
            <InputLabel id="labelTeam">Team</InputLabel>
            <Select
              labelId="label"
              id="selectTeam"
              name="TeamId"
              value={teamIdFilter}
              onChange={handleTeamIdFilterChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value={0}>All</MenuItem>
              {teamIds.map((teamId) => (
                <MenuItem key={teamId} value={teamId}>
                  <TeamDisplay id={teamId} />
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box>
          <Box>
            <Pagination
              onChange={handlePageChange}
              page={page}
              count={!!games && Math.floor((games.length - 1) / PAGE_SIZE + 1)}
            />
          </Box>
          <Box>
            {!!games && games.filter((game) => game.status !== "FINAL").length}{" "}
            of {!!games && games.length} games played
          </Box>
        </Box>
      </Box>
      <Box>
        <table className="season-game-list">
          <thead>
            <tr>
              <th></th>
              <th>Home</th>
              <th></th>
              <th>Away</th>
              <th></th>
              <th></th>
              <th>Finished</th>
            </tr>
          </thead>
          <tbody>
            {!!games &&
              games
                /*.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)*/
                .map((game) => {
                  return (
                    <tr key={game.id}>
                      <td>
                        {game.status === "FINAL" && !!teamIdFilter && (
                          <WinLossDisplay teamId={teamIdFilter} game={game} />
                        )}
                      </td>
                      <td
                        className={
                          game.homeScore > game.awayScore
                            ? "winning-team-color"
                            : ""
                        }
                      >
                        <TeamDisplay id={game.homeTeamId} />
                      </td>
                      <td
                        className={
                          game.homeScore > game.awayScore
                            ? "winning-team-color"
                            : ""
                        }
                      >
                        {game.status === "FINAL" && game.homeScore}
                      </td>
                      <td
                        className={
                          game.homeScore < game.awayScore
                            ? "winning-team-color"
                            : ""
                        }
                      >
                        <TeamDisplay id={game.awayTeamId} />
                      </td>
                      <td
                        className={
                          game.homeScore < game.awayScore
                            ? "winning-team-color"
                            : ""
                        }
                      >
                        {game.status === "FINAL" && game.awayScore}
                      </td>
                      <td
                        className={
                          game.status === "PLAYING" ? "winning-team-color" : ""
                        }
                      >
                        {game.status === "FINAL" &&
                          getFinalText(game.endingPeriod)}
                        {game.status === "PLAYING" && "In Progress"}
                      </td>
                      <td>
                        {game.status === "FINAL" &&
                          new Date(game.updated).toLocaleString("en-US", {
                            timeZone: config.timeZone,
                          })}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

interface WinLossDisplayProps {
  teamId: number | null;
  game: Game;
}

function WinLossDisplay(props: WinLossDisplayProps) {
  let value: string;
  if (props.teamId === props.game.homeTeamId) {
    value = props.game.homeScore > props.game.awayScore ? "W" : "L";
  } else {
    value = props.game.homeScore < props.game.awayScore ? "W" : "L";
  }
  return <Box>{value}</Box>;
}
