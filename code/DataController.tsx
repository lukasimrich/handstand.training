import {
  updateHandstandTodayData,
  loadHandstandData,
  loadBestAttemptEver
} from "./HandstandHistoryData";
import { sum } from "./Helpers";
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
  attemptsToday: any;
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
      loading: false,
      durationStart: 0,
      attemptsToday: [],
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

    if (handstandsToday.length != 0) {
      this.setState({
        attemptsToday: handstandsToday,
        timeTotal: sum(handstandsToday),
        dailyGoal: handstandsToday[handstandsToday.length - 1].goal,
        bestAttempt: bestAttemptEver,
        loading: false
      });
    }
  };

  handleOrientation = event => {
    const { beta } = event;
    if (beta < -55 && beta > -125 && !this.state.isDown) {
      this.state.isDown = true;
      this.state.durationStart = Date.now();
    } else if ((beta < -125 || beta > -55) && this.state.isDown) {
      this.state.isDown = false;

      // TODO date now asssign (cache) to a variable and then
      let attemptTime = Math.abs(this.state.durationStart - Date.now());
      const newAttempt = {
        duration: attemptTime,
        goal: 600000,
        date: Date.now(),
        key: Date.now()
      };
      const { bestAttempt } = this.state;
      this.setState({
        timeTotal: sum([...this.state.attemptsToday, newAttempt]),
        dailyGoal: newAttempt.goal,
        attemptsToday: [...this.state.attemptsToday, newAttempt],
        bestAttempt:
          bestAttempt < newAttempt.duration ? newAttempt.duration : bestAttempt,
        loading: false
      });

      updateHandstandTodayData(newAttempt);
    }
  };

  get timeTotal() {
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

  get isLoading() {
    return this.state.loading;
  }
}
