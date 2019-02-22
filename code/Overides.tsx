import { Override } from "framer";
import { HandstandTodayData } from "./HandstandHistoryData";

export const StackData: Override = () => {
  console.log("From Data Object to Stack ", HandstandTodayData.attemptsToday);
  return {
    data: HandstandTodayData.attemptsToday
  };
};

export const Test: Override = () => {
  console.log("From Data Object to Test ", HandstandTodayData.attemptsToday);
  return {
    test: HandstandTodayData.attemptsToday.length
  };
};
