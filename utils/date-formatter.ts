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
