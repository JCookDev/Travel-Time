import chai from "chai";
const expect = chai.expect;

//import Trip from "../src/Trips";
import trips from "../src/data/sample-trip-data";

describe("Trip", () => {
  let trip1;
  let trip2;

  beforeEach(() => {
    trip1 = new Trip(trips[0]);
    trip2 = new Trip(trips[5]);
  });

  it.skip("should be a function", () => {
    expect(Trip).to.be.a("function");
  });

  it.skip("should instantiatea a trip", () => {
    expect(trip1).to.be.an.instanceof(Trip);
    expect(trip2).to.be.an.instanceOf(Trip);
  });

  it.skip("should have a trip id", () => {
    expect(trip1.id).to.equal(117);
    expect(trip2.id).to.equal(171);
  });

  it.skip("should have a userID", () => {
    expect(trip1.userID).to.equal(1);
    expect(trip2.userID).to.equal(2);
  });

  it.skip("should have a destinationID", () => {
    expect(trip1.destinationID).to.equal(28);
    expect(trip2.destinationID).to.equal(43);
  });

  it.skip("should keep track of number of travelers", () => {
    expect(trip1.travelers).to.equal(3);
    expect(trip2.travelers).to.equal(1);
  });

  it.skip("should have a trip start date", () => {
    expect(trip1.date).to.equal("2021 / 01 / 09");
    expect(trip2.date).to.equal("2020 / 12 / 27");
  });

  it.skip("should have a trip duration", () => {
    expect(trip1.duration).to.equal(15);
    expect(trip2.duration).to.equal(18);
  });

  it.skip("should have a trip status", () => {
    expect(trip1.status).to.equal("approved");
    expect(trip2.status).to.equal("pending");
  });

  it.skip("should have suggested activities", () => {
    expect(trip1.suggestedActivities).to.deep.equal([]);
    expect(trip2.suggestedActivities).to.deep.equal([]);
  });
});
