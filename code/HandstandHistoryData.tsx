// * is needed due to something which is not clear
import * as Airtable from "airtable";

/* 
Initiate Airtable
 */
const base = new Airtable({ apiKey: "keycKv16qQ85dB1SD" }).base(
  "appyL0FkVEkJ0rSS3"
);

/* 
Load data from Airtable, all handstands based on Filter option "IS_AFTER({date},TODAY())"
there is a tool for formula writing - Airtable API URL Encoder
-  https://codepen.io/airtable/pen/rLKkYB
 */
export const loadHandstandData = async () => {
  try {
    let records = await base("Statistics")
      .select({
        fields: ["id", "duration", "goal", "date"],
        view: "Grid view",
        filterByFormula: "IS_AFTER({date},TODAY())"
      })
      .all();
    return records.map(record => ({
      duration: record.fields.duration,
      date: record.fields.date,
      key: record.id,
      goal: record.fields.goal
    }));
  } catch (err) {
    console.error(err);
  }
};

/* 
Using different base to get best attempt
 */
export const loadBestAttemptEver = async () => {
  try {
    let records = await base("Summary")
      .select({
        fields: ["BestAttempt"],
        view: "Grid view"
      })
      .all();
    return records[0].fields.BestAttempt;
  } catch (err) {
    console.error(err);
  }
};

/* 
Create a new record
 */
export const updateHandstandTodayData = record => {
  base("Statistics").create(
    {
      duration: record.duration,
      goal: record.goal,
      SummaryLink: ["recWn5G5DYEQqAYRi"]
    },
    function(err) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};
