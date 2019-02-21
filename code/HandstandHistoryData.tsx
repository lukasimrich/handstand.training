import * as React from "react";
import "whatwg-fetch";
import { Data } from "framer";

let HandstandData = Data({
  attemptsToday: [],
  bestAttempt: 0,
  dailyGoal: 0,
  dailySum: 0
});

const sum = attemptsToday =>
  attemptsToday.reduce((sum, attempt) => sum + attempt.duration, 0);

export const fetchHandstandTodayData = () => {
  console.log("Getting Airtable Data");

  const key = "keycKv16qQ85dB1SD";
  const url =
    "https://api.airtable.com/v0/appyL0FkVEkJ0rSS3/Statistics?filterByFormula=IS_AFTER(%7Bdate%7D%2C+TODAY())";

  fetch(url, {
    headers: {
      Authorization: `Bearer ${key}`
    }
  })
    .then(response => response.json())
    .then(response => {
      console.log("Response ", response);
      if (response.records) {
        response.records.map(record => {
          console.log("Record from airtable ", record);
          let attempt = {};
          attempt.duration = record.fields.duration;
          attempt.date = record.fields.date;
          attempt.time = record.fields.duration;
          attempt.key = record.id;
          return HandstandData.attemptsToday.push(attempt);
        });
        HandstandData.dailySum = sum(HandstandData.attemptsToday);
        console.log("Fetched data ", HandstandData);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

// export const fetchBestAttempt = () => {
//   console.log("Getting Airtable Data");

//   const key = "keycKv16qQ85dB1SD";
//   const url =
//     "https://api.airtable.com/v0/appyL0FkVEkJ0rSS3/Statistics?filterByFormula=IS_AFTER(%7Bdate%7D%2C+TODAY())";

//   fetch(url, {
//     headers: {
//       Authorization: `Bearer ${key}`
//     }
//   })
//     .then(response => response.json())
//     .then(response => {
//       if (response.records) {
//         HandstandData.bestAttempt = response.records;

//         console.log(
//           "Airtable best attempt fetched successfully",

//           HandstandData.bestAttempt
//         );
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

export const HandstandTodayData = HandstandData;
