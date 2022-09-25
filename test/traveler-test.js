import chai from "chai";
const expect = chai.expect;

//import Traveler from "../src/Traveler";
import travelers from "../src/data/sample-traveler-data";

describe("Traveler", () => {
  let traveler1;
  let traveler2;
  beforeEach(() => {
    traveler1 = new Traveler(travelers[0]);
    traveler2 = new Traveler(travelers[1]);
  });

  it.skip("should be a function", () => {
    expect(Traveler).to.be.a("function");
  });

  it.skip("should instantiate a traveler", () => {
    expect(traveler1).to.be.an.instanceof(Traveler);
    expect(traveler2).to.be.an.instanceOf(Traveler);
  });

  it.skip("should store a traveler's id", () => {
    expect(traveler1.id).to.equal(1);
    expect(traveler2.id).to.equal(2);
  });

  it.skip("should store a traveler's name", () => {
    expect(traveler1.name).to.equal("Ham Leadbeater");
    expect(traveler2.name).to.equal("Rachael Vaughten");
  });

  it.skip("should store a traveler's type", () => {
    expect(traveler1.travelerType).to.equal("relaxer");
    expect(traveler2.travelerType).to.equal("thrill-seeker");
  });

  it.skip("should only return the traveler's first name", () => {
    const firstName1 = traveler1.returnFirstName();
    const firstName2 = traveler2.returnFirstName();
    expect(firstName1).to.equal("Ham");
    expect(firstName2).to.equal("Rachael");
  });
});
