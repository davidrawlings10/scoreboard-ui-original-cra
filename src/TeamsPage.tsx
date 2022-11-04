import { useState, useEffect } from "react";
import config from "./config";
import { getLeagueList } from "./Shared/LeagueHelper";
import Team from "./Entity/Team";
import League from "./Entity/League";
import { Box } from "@material-ui/core";
import TeamDisplay from "./Shared/TeamDisplay/TeamDisplay";
import { Select, InputLabel, MenuItem } from "@material-ui/core";

export default function TeamsPage() {
  const [leagues, setLeagues] = useState<Array<League>>();
  const [league, setLeague] = useState<string>("");
  const [teams, setTeams] = useState<Array<Team>>([]);

  // load list of leagues
  useEffect(() => {
    getLeagueList().then((list) => {
      setLeagues(list);
      setLeague(list.find((league: League) => league.value === "AVES").value);
    });
  }, []);

  useEffect(() => {
    if (!!league) {
      fetch(config.baseUrl + "/team/getTeams?league=" + league)
        .then((res) => res.json())
        .then((json) => {
          setTeams(json.list);
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
              <th>Team</th>
              <th>Seasons Played</th>
              <th>Seasons Won</th>
              <th>Seasons Won %</th>
              <th>Points</th>
              <th>Possible Points</th>
              <th>Points %</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id}>
                <td>
                  <TeamDisplay id={team.id} />
                </td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{`${0}%`}</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{`${0}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
