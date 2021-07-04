import React from "react";

type TickMilliInputProps = {
  updateGetGamesInterval: (value: number) => void;
};

export default function TickMilliInput(props: TickMilliInputProps) {
  const [tickMilli, setTickMilli] = React.useState(1000);

  function handleChange(event: React.ChangeEvent<any>) {
    if ((event.target.name as string) === "input") {
      const value = event.target.value;
      fetch("http://localhost:8080/game/setGameplayTickMilli?value=" + value);
      setTickMilli(value);
      props.updateGetGamesInterval(value);
    }
  }

  return (
    <>
      <span>Tick Milliseconds</span>
      <input
        value={tickMilli}
        onChange={handleChange}
        type="text"
        name="input"
      />
    </>
  );
}
