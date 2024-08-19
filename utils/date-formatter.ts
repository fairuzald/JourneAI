import moment from "moment";

export function dateFormatter(startDate?: Date, endDate?: Date) {
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startMoment = moment(start);
    const endMoment = moment(end);
    // Check is same month and year
    if (
      startMoment.isSame(endMoment, "month") &&
      startMoment.isSame(endMoment, "year")
    ) {
      return `${startMoment.format("MMMM D")} - ${endMoment.format("D, YYYY")}`;
    }

    // Check is same year
    if (startMoment.isSame(endMoment, "year")) {
      return `${startMoment.format("MMMM D")} - ${endMoment.format(
        "MMMM D, YYYY"
      )}`;
    }

    return `${startMoment.format("MMMM D, YYYY")} - ${endMoment.format(
      "MMMM D, YYYY"
    )}`;
  } else {
    return "";
  }
}

export function formatDateTimeIsoString(isoString: string): string {
  return moment(isoString).format("MMMM Do, HH:mm");
}

export function formatDuration(
  departureTime: string,
  arrivalTime: string
): string {
  let string = "";
  const departure = moment(departureTime);
  const arrival = moment(arrivalTime);
  const duration = moment.duration(arrival.diff(departure));

  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  if (hours > 0) {
    string += `${hours}h `;
  }
  if (minutes > 0) {
    string += `${minutes}m`;
  }

  return string;
}
