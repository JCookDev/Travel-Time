const dayjs = require("dayjs");

class Trip {
  constructor(tripData) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
    this.cost = 0;
    this.timeFrame = "";
  }

  //Test with api in scripts file
  calculateSingleTrip = destination => {
    const tripCost =
    (destination.estimatedFlightCostPerPerson * this.travelers +
      destination.estimatedLodgingCostPerDay * this.duration) * 1.1;

    this.cost = tripCost;
  };

  //Test with api in scripts file
  getTripTimeFrame = trip => {
    if (dayjs().isAfter(dayjs(this.date)) && this.status === "approved") {
      return (this.timeFrame = "past");
    } else if (dayjs().isSame(dayjs(this.date))) {
      return (this.timeFrame = "present");
    } else if (
      dayjs().isBefore(dayjs(this.date)) &&
      this.status === "approved"
    ) {
      return (this.timeFrame = "upcoming");
    } else if (this.status === "pending") {
      return (this.timeFrame = "pending");
    }
  };
}
export default Trip;
