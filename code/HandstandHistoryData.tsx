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

// Async await, try, catch

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
        key: record.id,
        goal: record.fields.goal
      }));

      return results;
    })
    .catch(err => {
      console.error(err);
    });

export const loadBestAttemptEver = () =>
  base("Summary")
    .select({
      fields: ["BestAttempt"],
      view: "Grid view"
    })
    .all()
    .then(records => {
      console.log("Records processing, # of records: ", records);
      return records[0].fields.BestAttempt;
    })
    .catch(err => {
      console.error(err);
    });

export const updateHandstandTodayData = record => {
  base("Statistics").create(
    {
      duration: record.duration,
      goal: record.goal,
      SummaryLink: ["recWn5G5DYEQqAYRi"]
    },
    function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

export const HandstandTodayData = HandstandData;
