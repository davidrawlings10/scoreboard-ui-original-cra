export default interface Season {
  id: number;
  title: string;
  summary: string;
  winnerTeamId: number;
  leagueId: number;
  numTeams: number;
  scheduleType: string;
}
