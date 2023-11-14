export const CustomDateWithoutYear = (isoDate) => {
  try {
    const date = new Date(isoDate);

    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
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
      "DEC",
    ];

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];

    return `${dayOfWeek} , ${day} `;
  } catch (error) {
    console.log("error in date");
    return "Invalid Date";
  }
};
