export default interface Season {
  id: number;
  title: string;
  summary: string;
  winnerTeamId: number;
  league: string;
  numTeams: number;
  scheduleType: string;
}
