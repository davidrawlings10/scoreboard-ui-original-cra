import MuiButton, {
  ButtonProps as MuiButtonProps,
} from "@material-ui/core/Button";

export type ButtonProps = MuiButtonProps;

const Button = (props: MuiButtonProps) => {
  return <MuiButton color="primary" variant="contained" {...props}></MuiButton>;
};

export default Button;
