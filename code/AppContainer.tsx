import * as React from "react";
import { PropertyControls, ControlType, Stack } from "framer";
import { HandstandTodayData } from "./HandstandHistoryData";
import { List_Item } from "./canvas";

type Props = { text: string };

const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

function pad(n) {
  return n < 10 ? "0" + n : n;
}

function dateWithFullMonthName(month, date, hours, minutes) {
  return `${monthNames[month]} ${date}, ${hours}:${pad(minutes)}`;
}

function convertMsToSecToString(ms, delim = " : ") {
  const seconds = Math.floor((ms / 1000) * 10) / 10;

  return `${seconds} s`;
}

// Move to separate file ^

export class AppContainer extends React.Component<
  { width: number; height: number; data },
  Props
> {
  static defaultProps = {
    ...Stack.defaultProps,
    data: [{}]
  };
  static propertyControls: PropertyControls = {
    ...Stack.propertyControls
  };

  render() {
    return (
      <Stack
        {...this.props}
        borderStyle="solid"
        borderColor="rgba(33, 33, 33, 0.1)"
        radius="0 0 4px 4px"
        borderWidth={{ top: 0, bottom: 1, left: 1, right: 1 }}
        height={(this.props.data.length + 1) * 48 - 48}
      >
        {this.props.data.map(attempt => {
          let date = new Date(attempt.date);
          return (
            <List_Item
              duration={convertMsToSecToString(attempt.duration)}
              date={dateWithFullMonthName(
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes()
              )}
              key={attempt.key}
            />
          );
        })}
      </Stack>
    );
  }
}
