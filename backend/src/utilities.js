const timeToSeconds = (timeString) => {
  const timeUnits = {
    s: 1, // second
    m: 60, // minute
    h: 3600, // hour
    d: 86400, // day
    w: 604800, // week
    mth: 2628000, // month (average)
    y: 31536000, // year (365 days)
  };

  // Use regex to extract the number and the unit
  const regex = /^(\d+)([a-zA-Z]+)$/;
  const match = timeString.match(regex);

  if (!match) {
    throw new Error("Invalid time format");
  }

  const value = parseInt(match[1], 10);
  let unit = match[2];

  // If 'm' is used, it can be ambiguous (minute or month), so handle that
  if (unit === "m") {
    if (value >= 60) {
      // If the value is 60 or more, we assume it's "month"
      unit = "mth";
    }
  }

  // Check if the unit exists in the timeUnits object
  if (!timeUnits[unit]) {
    throw new Error("Unknown time unit");
  }

  return value * timeUnits[unit];
};
