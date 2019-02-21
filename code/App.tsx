import { Override } from "framer";
import {
  HandstandTodayData,
  fetchHandstandTodayData
} from "./HandstandHistoryData";

if (HandstandTodayData.attemptsToday.length < 1) fetchHandstandTodayData();
console.log(
  "Handstands History ",
  HandstandTodayData,
  HandstandTodayData.attemptsToday.length
);

export const Text: Override = () => {
  return {
    text: HandstandTodayData.dailySum
  };
};

export const StackData: Override = () => {
  console.log("Stack data from Data Object ", HandstandTodayData.attemptsToday);
  return {
    data: HandstandTodayData.attemptsToday
  };
};
