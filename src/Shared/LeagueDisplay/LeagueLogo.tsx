import NHLLogo from "../../images/logos/leagues/NHLLogo.svg";
import NBALogo from "../../images/logos/leagues/NBALogo.svg";

interface LeagueLogoProps {
  value: string;
}

export default function LeagueLogo({ value }: LeagueLogoProps) {
  const leagueLogo = getLeagueLogo(value);
  return !!leagueLogo ? <img src={leagueLogo} alt="Team Logo" /> : <span />;
}

function getLeagueLogo(value: string) {
  switch (value) {
    case "NHL":
      return NHLLogo;
    case "NBA":
      return NBALogo;
    default:
      return undefined;
  }
}
