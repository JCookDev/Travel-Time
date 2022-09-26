import chai from "chai";
const expect = chai.expect;

import Destination from "../src/Destinations";
import DestinationRepo from "../src/Destination-Repo";

describe("DestinationRepo", () => {
  let destination1;
  let destination2;
  let destinationRepo;
  beforeEach(() => {
    destination1 = {
      id: 41,
      destination: "Montego Bay, Jamaica",
      estimatedLodgingCostPerDay: 500,
      estimatedFlightCostPerPerson: 100,
      image: "https://images.unsplash.com/photo-1557129604-0e50f1300fab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      alt: "boats docked beside trees on river"
    };

    destination2 = {
      id: 18,
      destination: "Cape Town, South Africa",
      estimatedLodgingCostPerDay: 120,
      estimatedFlightCostPerPerson: 1200,
      image: "https://images.unsplash.com/photo-1522576775862-7168ae29372c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80",
      alt: "a city with mountain cliffs by the sea"
    };
    destinationRepo = new DestinationRepo([destination1, destination2]);
  });

  it("should be a function", () => {
    expect(DestinationRepo).to.be.a("function");
  });

  it("should be an instance of DestinationRepo", () => {
    expect(destinationRepo).to.be.an.instanceof(DestinationRepo);
  });

  it("should store data for multiple destinations", () => {
    expect(destinationRepo.data).to.deep.equal([destination1, destination2]);
  });

  it("should mutate data of multiple destination instances", () => {
    destinationRepo.instantiateDestination();
    expect(destinationRepo.data[0]).to.be.an.instanceOf(Destination);
    expect(destinationRepo.data[1]).to.be.an.instanceOf(Destination);
  });

  it("should find destination by id", () => {
    let findDestination1 = destinationRepo.findDestination(destination1.id);
    expect(findDestination1).to.deep.equal(destination1);
    let findDestination2 = destinationRepo.findDestination(destination2.id);
    expect(findDestination2).to.deep.equal(destination2);
  });
});
