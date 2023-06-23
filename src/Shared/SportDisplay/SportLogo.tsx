import {
  SportsHockey,
  SportsBasketball,
  SportsFootball,
} from "@material-ui/icons";

interface SportLogoProps {
  value: string;
}

export default function SportLogo({ value }: SportLogoProps) {
  switch (value) {
    case "HOCKEY":
      return <SportsHockey />;
    case "BASKETBALL":
      return <SportsBasketball />;
    case "FOOTBALL":
      return <SportsFootball />;
    default:
      throw Error("sport not allowed");
  }
}
