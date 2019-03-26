import { Override } from "framer";
import {
  convertToString,
  convertToMinSecToString,
  convertMsToSecToString
} from "./Helpers";

import { DataController } from "./DataController";

const dataController = new DataController();

export const DailySum: Override = () => {
  return {
    dailySum: convertToMinSecToString(dataController.timeTotal)
  };
};

export const Arc: Override = () => {
  const progress = (dataController.timeTotal * 360) / dataController.dailyGoal;
  console.log("Best Attempt ", dataController.bestAttempt);
  return {
    length: progress
  };
};

export const ProgressStats: Override = () => {
  const progressStats =
    Math.floor(
      (dataController.timeTotal / dataController.dailyGoal) * 100 * 10
    ) / 10;
  return {
    progress: `${progressStats}%`,
    dailyGoal: `of ${convertToString(dataController.dailyGoal)}`
  };
};

export const AllTimeBest: Override = () => ({
  bestTime: `${convertMsToSecToString(
    dataController.bestAttempt
  )} all time best`
});

export const StackData: Override = () => {
  console.log("Stack data ", dataController.handstandsToday);
  return {
    data: dataController.handstandsToday
  };
};
