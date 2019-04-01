import { Override } from "framer";
import {
  convertToString,
  convertToMinSecToString,
  convertMsToSecToString
} from "./Helpers";

import { DataController } from "./DataController";

const dataController = new DataController();

export const DailySum: Override = () => {
  if (!dataController.isLoading) {
    return {
      dailySum: convertToMinSecToString(dataController.timeTotal)
    };
  }
};

export const Arc: Override = () => {
  if (!dataController.isLoading) {
    const progress =
      (dataController.timeTotal * 360) / dataController.dailyGoal;
    return {
      length: progress
    };
  }
};

export const ProgressStats: Override = () => {
  if (!dataController.isLoading) {
    const progressStats =
      Math.floor(
        (dataController.timeTotal / dataController.dailyGoal) * 100 * 10
      ) / 10;
    return {
      progress: `${progressStats}%`,
      dailyGoal: `of ${convertToString(dataController.dailyGoal)}`
    };
  }
};

export const AllTimeBest: Override = () => {
  if (!dataController.isLoading) {
    bestTime: `${convertMsToSecToString(
      dataController.bestAttempt
    )} all time best`;
  }
};

export const StackData: Override = () => {
  if (!dataController.isLoading) {
    return {
      data: dataController.handstandsToday
    };
  }
};

export const InitialState: Override = () => {
  return {
    isLoading: dataController.isLoading
  };
};
