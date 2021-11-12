import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

interface ConfirmationDialogProps {
  open: boolean;
  onClose: (confirm: boolean) => void;
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { onClose, open } = props;

  const classes = useStyles();

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog maxWidth="xs" open={open}>
      <DialogTitle>Are you sure you want to stop this game?</DialogTitle>
      <DialogContent dividers>Content goes here</DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleCancel}
          color="primary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          onClick={handleOk}
          variant="contained"
          color="secondary"
          classes={classes}
        >
          Stop
        </Button>
      </DialogActions>
    </Dialog>
  );
}
