import React from "react";
import { useParams } from "react-router-dom";

import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import { Box } from "@material-ui/core";
import TeamSeasonList from "./TeamSeasonList";
import TeamLogo from "../images/TeamLogo";

export default function TeamDetail() {
  const { id }: { id: string } = useParams();
  const teamId: number = parseInt(id);

  return (
    <Box margin={2}>
      <Box marginTop={1} border="1px solid #474f97" bgcolor="primary.main">
        <Box marginLeft={3} display="flex" flexDirection="row" margin={3}>
          <Box width={100} marginRight={5}>
            <TeamLogo id={teamId} />
          </Box>
          <Box display="flex" flexDirection="row">
            <h1>
              <TeamDisplay id={teamId} hideLogo={true} />
            </h1>
          </Box>
        </Box>
      </Box>
      <TeamSeasonList teamId={teamId} />
    </Box>
  );
}
