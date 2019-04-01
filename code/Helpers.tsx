import * as Canvas from "./canvas";

const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

export function pad(n) {
  return n < 10 ? "0" + n : n;
}

export function dateWithFullMonthName(month, date, hours, minutes) {
  return `${monthNames[month]} ${date}, ${hours}:${pad(minutes)}`;
}

export function convertMsToSecToString(ms) {
  const seconds = Math.floor((ms / 1000) * 10) / 10;
  return `${seconds} s`;
}

export function convertToString(ms, delim = " : ") {
  const showWith0 = value => (value < 10 ? `0${value}` : value);
  const hours = showWith0(Math.floor((ms / (1000 * 60 * 60)) % 60));
  const minutes = showWith0(Math.floor((ms / (1000 * 60)) % 60));
  const seconds = showWith0(Math.floor((ms / 1000) % 60));
  return `${parseInt(hours) ? `${hours}${delim}` : ""}${minutes} minutes`;
}

export function convertToMinSecToString(ms, delim = " : ") {
  const showWith0 = value => (value < 10 ? `0${value}` : value);
  const hours = showWith0(Math.floor((ms / (1000 * 60 * 60)) % 60));
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = showWith0(Math.floor((ms / 1000) % 60));
  return `${
    parseInt(hours) ? `${hours}${delim}` : ""
  }${minutes} minutes ${seconds} seconds`;
}

export const sum = handstandsToday =>
  handstandsToday.reduce((sum, handstand) => sum + handstand.duration, 0);

export const getComponents = componentType => {
  let componentList = [];
  for (var key in Canvas) {
    if (!key.endsWith("__") && key.includes(componentType)) {
      componentList.push(key);
    }
  }
  return componentList;
};
