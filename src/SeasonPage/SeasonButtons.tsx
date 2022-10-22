import { Box, Button } from "@material-ui/core";
import { Edit, AddToQueue } from "@material-ui/icons";

interface SeasonButtonsProps {
  seasonId: number;
  handleOpenDialog: () => void;
}

export default function SeasonButtons(props: SeasonButtonsProps) {
  return (
    <Box display="flex" marginTop={2}>
      <Box marginRight={1}>
        <Button
          onClick={props.handleOpenDialog}
          color="primary"
          variant="contained"
          startIcon={<Edit />}
        >
          Edit
        </Button>
      </Box>
      <Box marginRight={1}>
        <Button
          href={`http://localhost:8080/season/getSQL?seasonId=${props.seasonId}`}
          color="primary"
          variant="contained"
          startIcon={<AddToQueue />}
        >
          Get Insert SQL
        </Button>
      </Box>
    </Box>
  );
}
