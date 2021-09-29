import React from "react";
import styled from "styled-components";
import { Box } from "@material-ui/core";

const Span = styled.span`
  margin: 0px 10px 0px 10px;
`;

/*const TickMillisecondsText = styled.span`
  margin: 0px 5px 0px 5px;
`;*/
/*color: white;*/

const Input = styled.input`
  height: 30px;
  width: 100px;
  border-radius: 6px;
`;

type TickMilliInputProps = {
  updateGetGamesInterval: () => void;
  handleTickMilliInputChange: (value: number) => void;
  tickMilli: number;
};

export default function TickMilliInput(props: TickMilliInputProps) {
  // const [tickMilli, setTickMilli] = React.useState<number>(props.tickMilli);

  function handleTickMilliInputChange(event: React.ChangeEvent<any>) {
    if ((event.target.name as string) === "input") {
      const value = event.target.value;
      console.log("TickMilliInput:handleChange()" + value);
      props.handleTickMilliInputChange(value);
      // setTickMilli(value);
    }
  }

  function handleBlur() {
    props.updateGetGamesInterval();
  }

  return (
    <Span>
      <Box m={5} component="span">
        Tick Milliseconds
      </Box>
      <Input
        value={props.tickMilli}
        onChange={handleTickMilliInputChange}
        onBlur={handleBlur}
        type="text"
        name="input"
      />
    </Span>
  );
}
