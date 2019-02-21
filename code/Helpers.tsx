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

// Move to separate file ^
