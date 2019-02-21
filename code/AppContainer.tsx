import * as React from "react";
import { PropertyControls, ControlType, Stack } from "framer";
import { updateHandstandTodayData } from "./HandstandHistoryData";
import { List_Item } from "./canvas";
import { dateWithFullMonthName, convertMsToSecToString } from "./Helpers";

type Props = { text: string };

export class AppContainer extends React.Component<
  { width: number; height: number },
  Props
> {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      timeTotal: 0,
      isDownHelper: false,
      dateHelper: 0,
      attemptsToday: []
    };
  }
  static defaultProps = {
    ...Stack.defaultProps,
    data: [{}]
  };
  static propertyControls: PropertyControls = {
    ...Stack.propertyControls
  };

  componentDidMount() {
    console.log("Added Listener");
    window.addEventListener("deviceorientation", this.handleOrientation, true);
  }

  componentWillUnmount() {
    console.log("Removed Listener");
    window.removeEventListener(
      "deviceorientation",
      this.handleOrientation,
      true
    );
  }

  handleOrientation = event => {
    const { beta } = event;
    console.log("Beta, ", beta);
    if (beta < -55 && beta > -125 && !this.state.isDownHelper) {
      this.setState({
        isDownHelper: true,
        dateHelper: Date.now()
      });
    } else if ((beta < -125 || beta > -55) && this.state.isDownHelper) {
      let attemptTime = Math.abs(this.state.dateHelper - Date.now());
      this.setState(prevState => ({
        isDownHelper: false,
        time: attemptTime
      }));
      console.log("Ready to push ", attemptTime);
      updateHandstandTodayData(attemptTime);
    }
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
