import { Box } from "@material-ui/core";

// import LeagueLogo from "./LeagueLogo";

export interface LeagueDisplayProps {
  id: number;
}

export default function LeagueDisplay(props: LeagueDisplayProps) {
  return (
    <Box display="flex" flexDirection="row">
      <Box
        width={28}
        marginRight={1}
        marginLeft={1}
        display="flex"
        alignContent="center"
        justifyContent="center"
      >
        {/* <LeagueLogo id={props.id} /> */}
      </Box>
      <Box marginLeft={1}>{"League Name"}</Box>
    </Box>
  );
}
