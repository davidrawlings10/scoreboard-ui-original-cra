import Game, { Clock } from "./Entity/Game";

export function getFinalText(endingPeriod: number) {
  let displayText = "Final ";

  if (endingPeriod >= 5) {
    displayText += endingPeriod - 3;
  }

  if (endingPeriod >= 4) {
    displayText += "OT";
  }

  return displayText;
}

function TimeDisplay(props: Clock) {
  return props.minutes + ":" + ("0" + props.seconds).slice(-2);
}

function PeriodDisplay(props: number) {
  if (props >= 11 && props < 20) {
    return props + "th";
  } else if (props % 10 === 1) {
    return props + "st";
  } else if (props % 10 === 2) {
    return props + "nd";
  } else if (props % 10 === 3) {
    return props + "rd";
  } else {
    return props + "th";
  }
}

export type ClockDisplayProps = {
  game: Game;
};

export default function ClockDisplay(props: ClockDisplayProps) {
  const { game } = props;

  if (game.status === "FINAL") {
    return <span>{getFinalText(game.endingPeriod)}</span>;
  }

  if (game.clock.intermission) {
    return (
      <span>
        {PeriodDisplay(game.clock.period)} starts in {TimeDisplay(game.clock)}
      </span>
    );
  } else {
    return (
      <span>
        {TimeDisplay(game.clock)} {PeriodDisplay(game.clock.period)}
      </span>
    );
  }
}
