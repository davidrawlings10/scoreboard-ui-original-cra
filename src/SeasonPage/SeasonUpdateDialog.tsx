import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
} from "@material-ui/core";
import Team from "../Entity/Team";

interface SeasonControlsDialogProps {
  open: boolean;
  onClose: () => void;
  seasonId: number;
}

export default function SeasonUpdateDialog(props: SeasonControlsDialogProps) {
  const [summary, setSummary] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [winnerTeamId, setWinnerTeamId] = useState<number>();
  const [teams, setTeams] = useState<Array<Team>>();

  useEffect(() => {
    fetch(
      "http://192.168.68.129:8080/season/findById?seasonId=" + props.seasonId
    )
      .then((res) => res.json())
      .then((season) => {
        setSummary(season.summary);
        setTitle(season.title);
        setWinnerTeamId(season.winnerTeamId);
        fetch(
          "http://192.168.68.129:8080/team/getTeams?leagueId=" + season.leagueId
        )
          .then((res) => res.json())
          .then((json) => setTeams(json.list));
      });
  }, [props.seasonId]);

  const handleCancel = () => {
    props.onClose();
  };

  const handleSubmit = () => {
    fetch(
      "http://192.168.68.129:8080/season/update?seasonId=" +
        props.seasonId +
        "&title=" +
        title +
        "&winnerTeamId=" +
        winnerTeamId +
        "&summary=" +
        summary
    );

    props.onClose();
  };

  const titleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const winnerTeamIdOnChange = (event: any) => {
    setWinnerTeamId(parseInt(event.target.value));
  };

  const summaryOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSummary(event.target.value);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Edit Season</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="title"
          label="Title"
          type="text"
          variant="outlined"
          value={title}
          fullWidth
          onChange={titleOnChange}
        />
      </DialogContent>
      <DialogContent>
        <Select
          labelId="label"
          id="winnerTeamId"
          name="winnerTeamId"
          value={winnerTeamId}
          onChange={winnerTeamIdOnChange}
          variant="outlined"
          fullWidth
        >
          {teams?.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.location ? team.location + " " + team.name : team.name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogContent>
        <TextField
          autoFocus
          id="summary"
          label="Summary"
          type="text"
          variant="outlined"
          multiline
          value={summary}
          fullWidth
          onChange={summaryOnChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
