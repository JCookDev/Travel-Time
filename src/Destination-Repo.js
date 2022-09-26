import Destination from "../src/Destinations";

class DestinationRepo {
  constructor(data) {
    this.data = data;
  }

  instantiateDestination = data => {
    return (this.data = this.data.map(destination => {
      return new Destination(destination);
    }));
  };

  findDestination = id => {
    const chosenDestination = this.data.find(destination => {
      return destination.id === id;
    });
    return chosenDestination;
  };
}
export default DestinationRepo;
