import { Override } from "framer";
import { HandstandTodayData } from "./HandstandHistoryData";

export const StackData: Override = () => {
  console.log("Stack data from Data Object ", HandstandTodayData.attemptsToday);
  return {
    data: HandstandTodayData.attemptsToday
  };
};
