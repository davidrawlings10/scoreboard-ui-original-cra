import { useState, useEffect } from "react";
import config from "../config";
import { getLeagueList } from "../Shared/LeagueHelper";
import League from "../Entity/League";
import { Box, Chip } from "@material-ui/core";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import { Select, InputLabel, MenuItem } from "@material-ui/core";
import sortableTable from "../Shared/SortableTable";

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
  const [leagues, setLeagues] = useState<Array<League>>();
  const [league, setLeague] = useState<string>("");
  const [teamSeasonTotals, setTeamSeasonTotals] = useState<
    Array<TeamSeasonTotal>
  >([]);
  let { Th, sortTable } = sortableTable();

  // load list of leagues
  useEffect(() => {
    getLeagueList().then((list) => {
      setLeagues(list);
      setLeague(list.find((league: League) => league.value === "AVES").value);
    });
  }, []);

  // load team season totals
  useEffect(() => {
    if (!!league) {
      fetch(config.baseUrl + "/team/getTeamSeasonTotals?league=" + league)
        .then((res) => res.json())
        .then((json) => {
          const teamSeasonTotals = json.list;

          teamSeasonTotals.forEach((teamSeasonTotal: TeamSeasonTotal) => {
            teamSeasonTotal.seasonsWonPercent =
              (teamSeasonTotal.seasonsWon / teamSeasonTotal.seasonsPlayed) *
              100;
          });
          teamSeasonTotals.forEach((teamSeasonTotal: TeamSeasonTotal) => {
            teamSeasonTotal.winPointsPercent =
              (teamSeasonTotal.winPoints / teamSeasonTotal.pointsPossible) *
              100;
          });
          teamSeasonTotals.forEach((teamSeasonTotal: TeamSeasonTotal) => {
            teamSeasonTotal.performancePointsPercent =
              (teamSeasonTotal.performancePoints /
                teamSeasonTotal.pointsPossible) *
              100;
          });
          setTeamSeasonTotals(json.list);
        });
    }
  }, [league]);

  function leagueChange(event: React.ChangeEvent<any>) {
    setLeague(event.target.value);
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      margin={2}
    >
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
              <MenuItem
                key={league.value}
                id={league.value}
                value={league.value}
              >
                {league.title}
              </MenuItem>
            ))}
        </Select>
      </Box>
      <Box display="flex" justifyContent="center" flexDirection="column">
        <table className="season-standing-list">
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
                    <TeamDisplay id={teamSeasonTotal.teamId} link={true} />
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
