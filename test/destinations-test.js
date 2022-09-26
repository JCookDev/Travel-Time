import chai from "chai";
const expect = chai.expect;
//import Destination from "../src/Destinations";
import destinations from "../src/data/sample-destination-data";

describe("Destination", () => {
  let destination1;
  let destination2;
  beforeEach(() => {
    destination1 = new Destination(destinations[0]);
    destination2 = new Destination(destinations[2]);
  });

  it.skip("should be a function", () => {
    expect(Destination).to.be.a("function");
  });

  it.skip("should instantiate a destination", () => {
    expect(destination1).to.be.an.instanceof(Destination);
    expect(destination2).to.be.an.instanceOf(Destination);
  });

  it.skip("should have a destination id", () => {
    expect(destination1.id).to.equal(41);
    expect(destination2.id).to.equal(18);
  });

  it.skip("should have a destination name", () => {
    expect(destination1.destination).to.equal("Montego Bay, Jamaica");
    expect(destination2.destination).to.equal("Cape Town, South Africa");
  });

  it.skip("should have an estimated lodging cost per day", () => {
    expect(destination1.estimatedLodgingCostPerDay).to.equal(500);
    expect(destination2.estimatedLodgingCostPerDay).to.equal(120);
  });

  it.skip("should have an estimated flight cost per person", () => {
    expect(destination1.estimatedFlightCostPerPerson).to.equal(100);
    expect(destination2.estimatedFlightCostPerPerson).to.equal(1200);
  });

  it.skip("should have an image of destination", () => {
    expect(destination1.image).to.equal(
      "https://images.unsplash.com/photo-1557129604-0e50f1300fab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
    );
    expect(destination2.image).to.equal(
      "https://images.unsplash.com/photo-1522576775862-7168ae29372c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80"
    );
  });

  it.skip("should have an alt description for destination image", () => {
    expect(destination1.alt).to.equal(
      "boats docked beside trees on river"
    );
    expect(destination2.alt).to.equal(
      "a city with mountain cliffs by the sea"
    );
  });
});
