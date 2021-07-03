import React from "react";
import Button, { ButtonProps } from "./Components/Button";

export type PlayPauseToggleProps = {
  toggleValue: boolean;
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
    };
    return (
      <Button {...buttonProps}>{this.props.toggleValue ? "ON" : "OFF"}</Button>
    );
  }
}
