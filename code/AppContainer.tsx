import * as React from "react";
import { PropertyControls, ControlType, Stack, Override } from "framer";
import {
  updateHandstandTodayData,
  HandstandTodayData,
  loadHandstandData
} from "./HandstandHistoryData";
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
    console.log("Loading Data");
    this.loadData();
  }

  componentWillUnmount() {
    console.log("Removed Listener");
    window.removeEventListener(
      "deviceorientation",
      this.handleOrientation,
      true
    );
  }

  loadData = async () => {
    const HandstandsToday = await loadHandstandData();
    console.log("Handstand Loading Data in Async ", HandstandsToday);
    this.setState({ attemptsToday: HandstandsToday });
    HandstandTodayData.attemptsToday = HandstandsToday;
  };

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
      const newAttempt = {
        duration: attemptTime,
        goal: "600000",
        date: Date.now()
      };
      this.setState({
        isDownHelper: false,
        attemptsToday: [...this.state.attemptsToday, newAttempt]
      });
      updateHandstandTodayData(attemptTime);
      HandstandTodayData.attemptsToday.push(newAttempt);
    }
  };
  render() {
    console.log("Rendering Stack ", this.props.data);
    console.log("State ", this.state);
    return (
      <Stack
        {...this.props}
        borderStyle="solid"
        borderColor="rgba(33, 33, 33, 0.1)"
        radius="0 0 4px 4px"
        borderWidth={{ top: 0, bottom: 1, left: 1, right: 1 }}
        height={(this.state.attemptsToday.length + 1) * 48 - 48}
        data={[{}]}
      >
        {this.state.attemptsToday.map(attempt => {
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

export const Test: Override = () => {
  console.log(
    "From Data Object to Test ",
    HandstandTodayData.attemptsToday.length
  );
  return {
    test: HandstandTodayData.attemptsToday.length
  };
};
