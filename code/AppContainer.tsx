import * as React from "react";
import { PropertyControls, ControlType, Stack, Override, Data } from "framer";
import {
  updateHandstandTodayData,
  HandstandTodayData,
  loadHandstandData,
  loadBestAttemptEver
} from "./HandstandHistoryData";
import { List_Item } from "./canvas";
import { dateWithFullMonthName, convertMsToSecToString, sum } from "./Helpers";

export class AppContainer extends React.Component<
  { width: number; height: number },
  Props
> {
  constructor(props) {
    super(props);
    this.state = {
      timeTotal: 0,
      dailyGoal: 0,
      bestAttempt: 0,
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
    window.addEventListener("deviceorientation", this.handleOrientation, true);
    this.loadData();
  }

  componentDidUpdate() {
    if (this.state.attemptsToday !== HandstandTodayData.attemptsToday) {
      HandstandTodayData.attemptsToday = this.state.attemptsToday;
      HandstandTodayData.dailySum = this.state.timeTotal;
      HandstandTodayData.bestAttempt = this.state.bestAttempt;
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      "deviceorientation",
      this.handleOrientation,
      true
    );
  }

  loadData = async () => {
    const HandstandsToday = await loadHandstandData();
    const bestAttemptEver = await loadBestAttemptEver();
    this.setState({
      attemptsToday: HandstandsToday,
      timeTotal: sum(HandstandsToday),
      dailyGoal: HandstandsToday[HandstandsToday.length - 1].goal,
      bestAttempt: bestAttemptEver
    });

    const { attemptsToday, timeTotal, dailyGoal, bestAttempt } = this.state;
    HandstandTodayData.attemptsToday = attemptsToday;
    HandstandTodayData.dailySum = timeTotal;
    HandstandTodayData.dailyGoal = dailyGoal;
    HandstandTodayData.bestAttempt = bestAttempt;
  };

  handleOrientation = event => {
    const { beta } = event;
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
        date: Date.now(),
        key: Date.now()
      };
      this.setState(prevState => {
        return {
          isDownHelper: false,
          timeTotal: sum([...this.state.attemptsToday, newAttempt]),
          dailyGoal: newAttempt.goal,
          attemptsToday: [...this.state.attemptsToday, newAttempt],
          bestAttempt:
            prevState.bestAttempt < newAttempt.duration
              ? newAttempt.duration
              : prevState.bestAttempt
        };
      });
      updateHandstandTodayData(newAttempt);
    }
  };
  render() {
    const orderedAttemptsReverse = [...this.state.attemptsToday].reverse();
    return (
      <Stack
        {...this.props}
        borderStyle="solid"
        borderColor="rgba(33, 33, 33, 0.1)"
        radius="0 0 4px 4px"
        borderWidth={{ top: 0, bottom: 1, left: 1, right: 1 }}
        height={(this.state.attemptsToday.length + 1) * 48 - 48}
      >
        {orderedAttemptsReverse.map((attempt, index) => {
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
