import * as React from "react";
import "whatwg-fetch";
import { Data } from "framer";
import * as Airtable from "airtable";

// const Airtable = require("airtable");

let HandstandData = Data({
  attemptsToday: [],
  bestAttempt: 0,
  dailyGoal: 0,
  dailySum: 0
});

// console.log(
//   "Handstands History ",
//   HandstandTodayData,
//   HandstandTodayData.attemptsToday.length
// );

const base = new Airtable({ apiKey: "keycKv16qQ85dB1SD" }).base(
  "appyL0FkVEkJ0rSS3"
);

const sum = attemptsToday =>
  attemptsToday.reduce((sum, attempt) => sum + attempt.duration, 0);

if (HandstandData.attemptsToday.length < 1) {
  base("Statistics")
    .select({
      fields: ["id", "duration", "goal", "date"],
      view: "Grid view",
      filterByFormula: "IS_AFTER({date},TODAY())"
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.map(record => {
          let attempt = {};
          attempt.duration = record.fields.duration;
          attempt.date = record.fields.date;
          attempt.time = record.fields.duration;
          attempt.key = record.id;
          return HandstandData.attemptsToday.push(attempt);
        });
        HandstandData.dailySum = sum(HandstandData.attemptsToday);
        console.log("Fetched data ", HandstandData);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
}

export const updateHandstandTodayData = record => {
  base("Statistics").create(
    {
      duration: record,
      goal: "600000",
      SummaryLink: ["recWn5G5DYEQqAYRi"]
    },
    function(err, record) {
      if (err) {
        console.error(err);
        return;
      }

      let attempt = {};
      attempt.duration = record.fields.duration;
      attempt.date = record.fields.date;
      attempt.time = record.fields.duration;
      attempt.time = record.fields.goals;
      attempt.key = record.id;

      HandstandData.dailySum = sum(HandstandData.attemptsToday);
      HandstandData.attemptsToday.push(attempt);

      console.log("New Record");
    }
  );
};

export const HandstandTodayData = HandstandData;
