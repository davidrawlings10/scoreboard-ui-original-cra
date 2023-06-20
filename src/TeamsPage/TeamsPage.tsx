import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Chip, Select, InputLabel, MenuItem } from "@material-ui/core";

import theme from "../theme";
import { sfetchList } from "../sfetch";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import LeagueDisplay from "../Shared/LeagueDisplay/LeagueDisplay";
import sortableTable from "../Shared/SortableTable";

const useStyles = makeStyles({
  linkText: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
});

interface TeamSeasonTotal {
  teamId: number;
  seasonsWon: number;
  seasonsPlayed: number;
  seasonsWonPercent: number;
  winPoints: number;
  winPointsPercent: number;
  performancePoints: number;
  performancePointsPercent: number;
  pointsPossible: number;
  trophies: Array<number>;
}

export default function TeamsPage() {
  const [leagues, setLeagues] = useState<Array<string>>();
  const [league, setLeague] = useState<string>("");
  const [teamSeasonTotals, setTeamSeasonTotals] = useState<
    Array<TeamSeasonTotal>
  >([]);
  let { Th, sortTable } = sortableTable();

  const classes = useStyles();

  // load list of leagues
  useEffect(() => {
    sfetchList("/season/getLeagues").then((list) => {
      setLeagues(list);
      setLeague(list[0]);
    });
  }, []);

  // load team season totals
  useEffect(() => {
    if (!!league) {
      sfetchList("/team/getTeamSeasonTotals?league=" + league).then((list) => {
        const teamSeasonTotals = list;

        teamSeasonTotals.forEach((teamSeasonTotal: TeamSeasonTotal) => {
          teamSeasonTotal.seasonsWonPercent =
            (teamSeasonTotal.seasonsWon / teamSeasonTotal.seasonsPlayed) * 100;
        });
        teamSeasonTotals.forEach((teamSeasonTotal: TeamSeasonTotal) => {
          teamSeasonTotal.winPointsPercent =
            (teamSeasonTotal.winPoints / teamSeasonTotal.pointsPossible) * 100;
        });
        teamSeasonTotals.forEach((teamSeasonTotal: TeamSeasonTotal) => {
          teamSeasonTotal.performancePointsPercent =
            (teamSeasonTotal.performancePoints /
              teamSeasonTotal.pointsPossible) *
            100;
        });
        setTeamSeasonTotals(list);
      });
    }
  }, [league]);

  function leagueChange(event: React.ChangeEvent<any>) {
    setLeague(event.target.value);
  }

  console.log("leagues", leagues);

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      margin={2}
    >
      <Box display="flex" flexDirection="row">
        <Box width={400} marginBottom={2}>
          <InputLabel>League</InputLabel>
          <Select
            value={league}
            onChange={leagueChange}
            variant="outlined"
            fullWidth
          >
            {leagues &&
              leagues.map((league: any) => (
                <MenuItem key={league} id={league} value={league}>
                  <LeagueDisplay value={league} />
                </MenuItem>
              ))}
          </Select>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" flexDirection="column">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Team</th>
              <Th attribute="seasonsWon">Seasons Won</Th>
              <th>Trophies</th>
              <Th attribute="seasonsPlayed">Seasons Played</Th>
              <Th attribute="seasonsWonPercent">Seasons Won %</Th>
              <Th attribute="winPoints">Win Points</Th>
              <Th attribute="winPointsPercent">Win Points %</Th>
              <Th attribute="performancePoints">Perf Points</Th>
              <Th attribute="performancePointsPercent">Perf Points %</Th>
              <Th attribute="pointsPossible">Possible Points</Th>
            </tr>
          </thead>
          <tbody>
            {sortTable(teamSeasonTotals).map(
              (teamSeasonTotal: TeamSeasonTotal, index: number) => (
                <tr key={teamSeasonTotal.teamId}>
                  <td>{index + 1}</td>
                  <td>
                    <Link
                      to={`/teams/${teamSeasonTotal.teamId}`}
                      className={classes.linkText}
                    >
                      <TeamDisplay id={teamSeasonTotal.teamId} />
                    </Link>
                  </td>
                  <td>{teamSeasonTotal.seasonsWon}</td>
                  <td>
                    {teamSeasonTotal.trophies.map((trophy: number) => (
                      <Chip label={trophy} variant="outlined" />
                    ))}
                  </td>
                  <td>{teamSeasonTotal.seasonsPlayed}</td>
                  <td>{`${teamSeasonTotal.seasonsWonPercent.toPrecision(
                    3
                  )}%`}</td>
                  <td>{teamSeasonTotal.winPoints}</td>
                  <td>{`${teamSeasonTotal.winPointsPercent.toPrecision(
                    3
                  )}%`}</td>
                  <td>{teamSeasonTotal.performancePoints}</td>
                  <td>{`${teamSeasonTotal.performancePointsPercent.toPrecision(
                    3
                  )}%`}</td>
                  <td>{teamSeasonTotal.pointsPossible}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
