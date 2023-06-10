import { Box } from "@material-ui/core";

import TeamLogo from "../../images/TeamLogos";
import TeamName from "./TeamName";

export interface TeamDisplayFuncProps {
  id: number;
  hideName?: boolean;
  hideLogo?: boolean;
  hideLocation?: boolean;
}

export default function TeamDisplayFunc(props: TeamDisplayFuncProps) {
  return (
    <Box display="flex" flexDirection="row">
      {!props.hideLogo && (
        <Box
          width={/*25*/ 20}
          marginRight={2}
          display="flex"
          alignContent="center"
          justifyContent="center"
        >
          <TeamLogo id={props.id} />
        </Box>
      )}
      {!props.hideName && (
        <TeamName id={props.id} hideLocation={props.hideLocation} />
      )}
    </Box>
  );
}
