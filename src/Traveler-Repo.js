import Traveler from "../src/Traveler";

class TravelerRepo {
  constructor(data) {
    this.data = data;
  }

  instantiateTraveler = () => {
    return (this.data = this.data.map(traveler => {
      return new Traveler(traveler);
    }));
  };

  findCurrentTraveler = id => {
    return this.data.find(traveler => {
      return traveler.id === id;
    });
  };
}

export default TravelerRepo;
