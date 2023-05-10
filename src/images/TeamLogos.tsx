import HurricanesLogo from "./teamLogos/nhl/HurricanesLogo.svg";
import BlueJacketsLogo from "./teamLogos/nhl/BlueJacketsLogo.svg";
import AngelsLogo from "./teamLogos/nhl/AngelsLogo.svg";
import IslandersLogo from "./teamLogos/nhl/IslandersLogo.svg";
import RangersLogo from "./teamLogos/nhl/RangersLogo.svg";
import FlyersLogo from "./teamLogos/nhl/FlyersLogo.svg";
import PenguinsLogo from "./teamLogos/nhl/PenguinsLogo.svg";
import CapitalsLogo from "./teamLogos/nhl/CapitalsLogo.svg";
import BruinsLogo from "./teamLogos/nhl/BruinsLogo.svg";
import SabresLogo from "./teamLogos/nhl/SabresLogo.svg";
import RedWingsLogo from "./teamLogos/nhl/RedWingsLogo.svg";
import PanthersLogo from "./teamLogos/nhl/PanthersLogo.svg";
import CanadiensLogo from "./teamLogos/nhl/CanadiensLogo.svg";
import SenatorsLogo from "./teamLogos/nhl/SenatorsLogo.svg";
import LightningLogo from "./teamLogos/nhl/LightningLogo.svg";
import MapleLeafsLogo from "./teamLogos/nhl/MapleLeafsLogo.svg";
import CoyotesLogo from "./teamLogos/nhl/CoyotesLogo.svg";
import BlackhawksLogo from "./teamLogos/nhl/BlackhawksLogo.svg";
import AvalancheLogo from "./teamLogos/nhl/AvalancheLogo.svg";
import StarsLogo from "./teamLogos/nhl/StarsLogo.svg";
import WildLogo from "./teamLogos/nhl/WildLogo.svg";
import PredatorsLogo from "./teamLogos/nhl/PredatorsLogo.svg";
import BluesLogo from "./teamLogos/nhl/BluesLogo.svg";
import JetsLogo from "./teamLogos/nhl/JetsLogo.svg";
import DucksLogo from "./teamLogos/nhl/DucksLogo.svg";
import FlamesLogo from "./teamLogos/nhl/FlamesLogo.svg";
import OilersLogo from "./teamLogos/nhl/OilersLogo.svg";
import KingsLogo from "./teamLogos/nhl/KingsLogo.svg";
import SharksLogo from "./teamLogos/nhl/SharksLogo.svg";
import KrakenLogo from "./teamLogos/nhl/KrakenLogo.svg";
import CanucksLogo from "./teamLogos/nhl/CanucksLogo.svg";
import GoldenKnightsLogo from "./teamLogos/nhl/GoldenKnightsLogo.svg";

import CardinalLogo from "./teamLogos/aves/CardinalLogo.svg";
import OrioleLogo from "./teamLogos/aves/OrioleLogo.svg";
import RobinLogo from "./teamLogos/aves/RobinLogo.svg";
import WoodpeckerLogo from "./teamLogos/aves/WoodpeckerLogo.svg";
import WarblerLogo from "./teamLogos/aves/WarblerLogo.svg";
import BlueJayLogo from "./teamLogos/aves/BlueJayLogo.svg";
import MockingbirdLogo from "./teamLogos/aves/MockingbirdLogo.svg";
import PenguinLogo from "./teamLogos/aves/PenguinLogo.svg";
import OwlLogo from "./teamLogos/aves/OwlLogo.svg";

interface TeamLogoProps {
  id: number;
}

export default function TeamLogo({ id }: TeamLogoProps) {
  const teamLogo = getTeamLogo(id);
  return !!teamLogo ? <img src={teamLogo} alt="Team Logo" /> : <span />;
}

function getTeamLogo(id: number) {
  switch (id) {
    case 5:
      return CardinalLogo;
    case 6:
      return OrioleLogo;
    case 7:
      return RobinLogo;
    case 8:
      return WoodpeckerLogo;
    case 11:
      return WarblerLogo;
    case 12:
      return BlueJayLogo;
    case 16:
      return MockingbirdLogo;
    case 19:
      return PenguinLogo;
    case 27:
      return OwlLogo;
    case 33:
      return HurricanesLogo;
    case 34:
      return BlueJacketsLogo;
    case 35:
      return AngelsLogo;
    case 36:
      return IslandersLogo;
    case 37:
      return RangersLogo;
    case 38:
      return FlyersLogo;
    case 39:
      return PenguinsLogo;
    case 40:
      return CapitalsLogo;
    case 41:
      return BruinsLogo;
    case 42:
      return SabresLogo;
    case 43:
      return RedWingsLogo;
    case 44:
      return PanthersLogo;
    case 45:
      return CanadiensLogo;
    case 46:
      return SenatorsLogo;
    case 47:
      return LightningLogo;
    case 48:
      return MapleLeafsLogo;
    case 49:
      return CoyotesLogo;
    case 50:
      return BlackhawksLogo;
    case 51:
      return AvalancheLogo;
    case 52:
      return StarsLogo;
    case 53:
      return WildLogo;
    case 54:
      return PredatorsLogo;
    case 55:
      return BluesLogo;
    case 56:
      return JetsLogo;
    case 57:
      return DucksLogo;
    case 58:
      return FlamesLogo;
    case 59:
      return OilersLogo;
    case 60:
      return KingsLogo;
    case 61:
      return SharksLogo;
    case 62:
      return KrakenLogo;
    case 63:
      return CanucksLogo;
    case 64:
      return GoldenKnightsLogo;
    default:
      return undefined;
  }
}

/*const teamLogos = {
  5: CardinalLogo,
  6: OrioleLogo,
  7: RobinLogo,
  8: WoodpeckerLogo,
};

export default function getTeamLogos(id: any) {
  if (Object.keys(teamLogos).includes(id)) {
    return teamLogos[id];
  }
}*/

/*export interface TeamLogoProps {
  id: number;
}*/

/*export default function TeamLogo(props: TeamLogoProps) {
  if (props.id === 5) {
    return <img src={CardinalLogo} alt="Cardinal Logo" />;
  } else if (props.id === 6) {
    return <img src={OrioleLogo} alt="Oriole Logo" />;
  } else if (props.id === 7) {
    return <img src={RobinLogo} alt="Robin Logo" />;
  } else if (props.id === 8) {
    return <img src={WoodpeckerLogo} alt="Woodpecker Logo" />;
  } else if (props.id === 11) {
    return <img src={WarblerLogo} alt="Warbler Logo" />;
  } else if (props.id === 12) {
    return <img src={BlueJayLogo} alt="Blue Jay Logo" />;
  } else if (props.id === 16) {
    return <img src={MockingbirdLogo} alt="Mockingbird Logo" />;
  } else if (props.id === 19) {
    return <img src={PenguinLogo} alt="Penguin Logo" />;
  } else if (props.id === 27) {
    return <img src={OwlLogo} alt="Owl Logo" />;
  } else if (props.id === 36) {
    return <IslandersLogo />;
  } else if (props.id === 35) {
    return <img src={AngelsLogo} alt="Angels Logo" />;
  } else if (props.id === 43) {
    return <img src={RedWingsLogo} alt="Red Wings Logo" />;
  } else if (props.id === 44) {
    return <PanthersLogo />;
  } else if (props.id === 47) {
    return <img src={LightningLogo} alt="Lightning Logo" />;
  } else if (props.id === 53) {
    return <WildLogo />;
  } else if (props.id === 50) {
    return <img src={BlackhawksLogo} alt="Blackhawks Logo" />;
  } else if (props.id === 51) {
    return <img src={AvalancheLogo} alt="Avalanche Logo" />;
  } else if (props.id === 52) {
    return <img src={StarsLogo} alt="Stars Logo" />;
  } else if (props.id === 60) {
    return <KingsLogo />;
  } else if (props.id === 62) {
    return <KrakenLogo />;
  } else if (props.id === 64) {
    return <GoldenKnightsLogo />;
  } else {
    return <div />;
  }
}*/
