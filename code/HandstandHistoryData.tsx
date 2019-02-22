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

const base = new Airtable({ apiKey: "keycKv16qQ85dB1SD" }).base(
  "appyL0FkVEkJ0rSS3"
);

const sum = attemptsToday =>
  attemptsToday.reduce((sum, attempt) => sum + attempt.duration, 0);

export const loadHandstandData = () =>
  base("Statistics")
    .select({
      fields: ["id", "duration", "goal", "date"],
      view: "Grid view",
      filterByFormula: "IS_AFTER({date},TODAY())"
    })
    .all()
    .then(records => {
      console.log("Records processing, # of records: ", records.length);
      const results = records.map(record => ({
        duration: record.fields.duration,
        date: record.fields.date,
        key: record.id
      }));

      return results;
    })
    .catch(err => {
      console.error(err);
    });

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
      console.log("New Record Added ", record);
    }
  );
};

export const HandstandTodayData = HandstandData;
