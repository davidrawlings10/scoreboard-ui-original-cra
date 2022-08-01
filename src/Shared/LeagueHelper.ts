import config from "../config";

export function getLeagueList() {
  return fetch(config.baseUrl + "/season/getLeagues")
    .then((res) => res.json())
    .then((json) =>
      json.list.map((league: any) => {
        return { value: league, title: getLeagueDisplayName(league) };
      })
    );
}

export function getLeagueDisplayName(leagueValue: string) {
  switch (leagueValue) {
    case "AVES":
      return "Aves";
    case "NHL":
      return "NHL";
    case "TEST":
      return "Test";
  }
}
