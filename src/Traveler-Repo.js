import chai from "chai";
const expect = chai.expect;

import Traveler from "../src/Traveler";
//import TravelerRepo from "../src/traveler-repo";

describe("TravelerRepo", () => {
  let traveler1;
  let traveler2;
  let travelerRepo;
  beforeEach(() => {
    traveler1 = {
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer"
    };

    traveler2 = {
      id: 2,
      name: "Rachael Vaughten",
      travelerType: "thrill-seeker"
    };
    travelerRepo = new TravelerRepo([traveler1, traveler2]);
  });

  it.skip("should be a function", () => {
    expect(TravelerRepo).to.be.a("function");
  });

  it.skip("should be an instance of TravelerRepo", () => {
    expect(travelerRepo).to.be.an.instanceof(TravelerRepo);
  });

  it.skip("should store data for multiple travelers", () => {
    expect(travelerRepo.data).to.deep.equal([traveler1, traveler2]);
  });

  it.skip("should have multiple instances of Traveler", () => {
    travelerRepo.instantiateTraveler();
    expect(travelerRepo.data[0]).to.be.an.instanceOf(Traveler);
    expect(travelerRepo.data[1]).to.be.an.instanceOf(Traveler);
  });

  it.skip("should find traveler by id", () => {
    const selectedTraveler1 = travelerRepo.findCurrentTraveler(traveler1.id);
    expect(selectedTraveler1.id).to.equal(traveler1.id);
  });
});
