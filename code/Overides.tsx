import { Override } from "framer";
import { HandstandTodayData } from "./HandstandHistoryData";
import {
  convertToString,
  convertToMinSecToString,
  convertMsToSecToString
} from "./Helpers";

export const DailySum: Override = () => {
  console.log(HandstandTodayData.dailySum);
  return {
    dailySum: HandstandTodayData.dailySum
  };
};

export const Arc: Override = () => {
  console.log("Arc ", HandstandTodayData);

  if (HandstandTodayData.dailyGoal != 0) {
    const progress =
      (HandstandTodayData.dailySum * 360) / HandstandTodayData.dailyGoal;
    console.log("Arc ", progress);

    return {
      length: progress
    };
  }
};

export const ProgressStats: Override = () => {
  if (HandstandTodayData.dailyGoal != 0) {
    const progressStats =
      Math.floor(
        (HandstandTodayData.dailySum / HandstandTodayData.dailyGoal) * 100 * 10
      ) / 10;
    console.log("Progress % ", progressStats);
    return {
      progress: `${progressStats}%`,
      dailyGoal: `of ${convertToString(HandstandTodayData.dailyGoal)}`
    };
  }
};

export const DailySumStats: Override = () => {
  if (HandstandTodayData.dailySum != 0) {
    return {
      dailySum: convertToMinSecToString(HandstandTodayData.dailySum)
    };
  }
};

export const AllTimeBest: Override = () => {
  if (HandstandTodayData.bestAttempt != 0) {
    return {
      bestTime: `${convertMsToSecToString(
        HandstandTodayData.bestAttempt
      )} all time best`
    };
  }
};
