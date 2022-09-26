import chai from "chai";
const expect = chai.expect;

import Trip from "../src/Trips";
//import TripRepo from "../src/Trip-Repo";
import Destination from "../src/Destinations";

describe("TripRepo", () => {
  let trip1;
  let trip2;
  let tripRepo;
  beforeEach(() => {
    trip1 = {
      id: 117,
      userID: 1,
      destinationID: 28,
      travelers: 3,
      date: "2021 / 01 / 09",
      duration: 15,
      status: "approved",
      suggestedActivities: []
    };

    trip2 = {
      id: 171,
      userID: 2,
      destinationID: 43,
      travelers: 1,
      date: "2020 / 12 / 27",
      duration: 18,
      status: "pending",
      suggestedActivities: []
    };
    tripRepo = new TripRepo([trip1, trip2]);
  });

  it.skip("should be a function", () => {
    expect(TripRepo).to.be.a("function");
  });

  it.skip("should be an instance of TripRepo", () => {
    expect(tripRepo).to.be.an.instanceof(TripRepo);
  });

  it.skip("should store multiple trips for multiple travelers", () => {
    expect(tripRepo.data).to.deep.equal([trip1, trip2]);
  });

  it.skip("should find trip by id", () => {
    const foundTrip1 = tripRepo.findTrip(trip1.id);
    expect(foundTrip1).to.equal(trip1);
    const foundTrip2 = tripRepo.findTrip(trip2.id);
    expect(foundTrip2).to.equal(trip2);
  });
});
