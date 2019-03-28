import * as React from "react";
import { PropertyControls, ControlType, Stack, Override, Data } from "framer";
import {
  updateHandstandTodayData,
  loadHandstandData,
  loadBestAttemptEver
} from "./HandstandHistoryData";
import { dateWithFullMonthName, convertMsToSecToString, sum } from "./Helpers";
import Controller from "framer-controller";

/* 
interface Attempt {
  props
}
 */

interface Options {
  loading: boolean;
  timeTotal: number;
  dailyGoal: number;
  bestAttempt: number;
  attemptsToday: [];
  isDown: boolean;
  durationStart: number;
}

interface State extends Options {}

/* 
Default value do we need them, duration start
 */
export class DataController extends Controller<State> {
  constructor(options = {} as Options) {
    super({
      isDown: false,
      durationStart: 0,
      ...options
    });
    window.addEventListener("deviceorientation", this.handleOrientation, true);
    this.refresh();
  }

  /**
   * Load a new set of data
   */
  refresh = async () => {
    this.setState({ loading: true });
    const handstandsToday = await loadHandstandData();
    const bestAttemptEver = await loadBestAttemptEver();

    console.log("Data controller ", handstandsToday);

    this.setState({
      attemptsToday: handstandsToday,
      timeTotal: sum(handstandsToday),
      dailyGoal: handstandsToday[handstandsToday.length - 1].goal,
      bestAttempt: bestAttemptEver,
      loading: false
    });
  };

  handleOrientation = event => {
    const { beta } = event;
    console.log("Sensors", beta, this.state.isDown);
    if (beta < -55 && beta > -125 && !this.state.isDown) {
      console.log("Value of duration", this.state.durationStart);
      this.state.isDown = true;
      this.state.durationStart = Date.now();
      console.log("Value of duration", this.state.durationStart);
    } else if ((beta < -125 || beta > -55) && this.state.isDown) {
      this.state.isDown = false;
      console.log("Value of duration", this.state.durationStart);

      // date now asssign (cache) to a variable and then
      let attemptTime = Math.abs(this.state.durationStart - Date.now());
      const newAttempt = {
        duration: attemptTime,
        goal: 600000,
        date: Date.now(),
        key: Date.now()
      };

      console.log("I am writing down ");
      const { bestAttempt } = this.state;
      console.log("Best attempt from state ", bestAttempt);
      this.setState({
        timeTotal: sum([...this.state.attemptsToday, newAttempt]),
        dailyGoal: newAttempt.goal,
        attemptsToday: [...this.state.attemptsToday, newAttempt],
        bestAttempt:
          bestAttempt < newAttempt.duration ? newAttempt.duration : bestAttempt
      });
      console.log("updated state ", this.state);

      updateHandstandTodayData(newAttempt);
    }
  };

  timeTotal() {
    return this.state.timeTotal;
  }

  get handstandsToday() {
    return this.state.attemptsToday;
  }

  get dailyGoal() {
    return this.state.dailyGoal;
  }

  get bestAttempt() {
    return this.state.bestAttempt;
  }
}
