import React from "react";
import styled from "styled-components";

const Span = styled.span`
  margin: 0px 10px 0px 10px;
`;

const TickMillisecondsText = styled.span`  
  margin: 0px 5px 0px 5px;
`;
/*color: white;*/

const Input = styled.input`
  height: 30px;
  width: 100px;
  border-radius: 6px;
`;

type TickMilliInputProps = {
  updateGetGamesInterval: (value: number) => void;
};

export default function TickMilliInput(props: TickMilliInputProps) {
  const [tickMilli, setTickMilli] = React.useState(1000);

  function handleChange(event: React.ChangeEvent<any>) {
    if ((event.target.name as string) === "input") {
      const value = event.target.value;
      fetch("http://localhost:8080/game/setTickMilliseconds?value=" + value);
      setTickMilli(value);
      props.updateGetGamesInterval(value);
    }
  }

  return (
    <Span>
      <TickMillisecondsText>Tick Milliseconds</TickMillisecondsText>
      <Input
        value={tickMilli}
        onChange={handleChange}
        type="text"
        name="input"
      />
    </Span>
  );
}
