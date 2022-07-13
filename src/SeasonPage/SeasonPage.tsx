import { useState } from "react";
import { Box } from "@material-ui/core";

import SeasonList from "./SeasonList";
import SeasonDisplay from "./SeasonDisplay";
import SeasonHeader from "./SeasonHeader";

/*const useStyles = makeStyles({
  root: {
    color: "white",
  },
});*/

export default function SeasonPage() {
  const [seasonId, setSeasonId] = useState(1);

  function viewSeason(seasonId: number) {
    setSeasonId(seasonId);
  }

  // const classes = useStyles();

  return (
    <Box padding={3} height="100%">
      <SeasonList viewSeason={viewSeason} />
      <Box marginBottom={4}>
        <SeasonHeader seasonId={seasonId} />
      </Box>
      <SeasonDisplay seasonId={seasonId} />
    </Box>
  );
}
