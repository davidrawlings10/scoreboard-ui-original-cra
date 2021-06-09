import React from "react";
import "./PlayPauseToggle.css";
import Button, { ButtonProps } from "@material-ui/core/Button";

export type PlayPauseToggleProps = {
  toggleValue: string;
  onChange: () => void;
};

export default class PlayPauseToggle extends React.Component<PlayPauseToggleProps> {
  constructor(props: PlayPauseToggleProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onChange();
  }

  render() {
    const buttonProps: ButtonProps = {
      onClick: this.handleChange,
      variant: "contained",
      color: "primary",
    };
    return (
      <Button {...buttonProps}>{this.props.toggleValue ? "ON" : "OFF"}</Button>
    );
  }
}
