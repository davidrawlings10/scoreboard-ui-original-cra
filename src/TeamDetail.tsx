import React from "react";
import { useParams } from "react-router-dom";
import TeamDisplay from "./Shared/TeamDisplay/TeamDisplay";
import { Box } from "@material-ui/core";

export default function TeamDetail() {
  const { id }: { id: string } = useParams();
  return (
    <Box>
      <TeamDisplay id={parseInt(id)} />
    </Box>
  );
}
