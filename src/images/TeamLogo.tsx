import {
  GoldenKnightsLogo,
  KingsLogo,
  PanthersLogo,
  KrakenLogo,
  IslandersLogo,
  WildLogo,
} from "./teamLogos/nhl";

import LightningLogo from "./teamLogos/nhl/LightningLogo.svg";
import AngelsLogo from "./teamLogos/nhl/AngelsLogo.svg";

import CardinalLogo from "./teamLogos/aves/CardinalLogo.svg";
import OrioleLogo from "./teamLogos/aves/OrioleLogo.svg";
import BlueJayLogo from "./teamLogos/aves/BlueJayLogo.svg";
import OwlLogo from "./teamLogos/aves/OwlLogo.svg";

export interface TeamLogoProps {
  id: number;
}

export default function TeamLogo(props: TeamLogoProps) {
  if (props.id === 5) {
    return <img src={CardinalLogo} alt="Cardinal Logo" />;
  } else if (props.id === 6) {
    return <img src={OrioleLogo} alt="Oriole Logo" />;
  } else if (props.id === 12) {
    return <img src={BlueJayLogo} alt="Blue Jay Logo" />;
  } else if (props.id === 27) {
    return <img src={OwlLogo} alt="Owl Logo" />;
  } else if (props.id === 36) {
    return <IslandersLogo />;
  } else if (props.id === 35) {
    return <img src={AngelsLogo} alt="Angels Logo" />;
  } else if (props.id === 44) {
    return <PanthersLogo />;
  } else if (props.id === 47) {
    return <img src={LightningLogo} alt="Lightning Logo" />;
  } else if (props.id === 53) {
    return <WildLogo />;
  } else if (props.id === 60) {
    return <KingsLogo />;
  } else if (props.id === 62) {
    return <KrakenLogo />;
  } else if (props.id === 64) {
    return <GoldenKnightsLogo />;
  } else {
    return <div />;
  }
}
