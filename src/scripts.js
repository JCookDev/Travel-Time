import './css/styles.css';
import TravelerRepo from "./Traveler-Repo";
import TripRepo from "./Trip-Repo";
import DestinationRepo from "./Destination-Repo";
import Traveler from "../src/Traveler";
import apiCalls from "./apiCalls";

const dayjs = require("dayjs");

// Query Selectors
const welcomeMessage = document.querySelector("#welcomeMessage");
const expenditures = document.querySelector("#expenditures");
const destinationsDropDown = document.querySelector("#destinationsDropDown");
const bookingDateInput = document.querySelector("#bookingDateInput");
const durationInput = document.querySelector("#durationInput");
const guestsInput = document.querySelector("#guestsInput");
const estimateButton = document.querySelector("#estimateButton");
const submitButton = document.querySelector("#submitButton");
const estimateMessage = document.querySelector("#estimateMessage");
const tripCards = document.querySelector(".trip-cards");

//Global Variables
let today = dayjs().format("YYYY/MM/DD");
let travelerRepo, tripRepo, destinationRepo;
let currentTraveler;
let travelerInput;

//Functions
const fetchApiCalls = () => {
  apiCalls.fetchData().then(data => {
    let travelerData = data[0].travelers;
    let tripData = data[1].trips;
    let destinationData = data[2].destinations;
    currentTraveler = new Traveler(travelerData[getRandomIndex(travelerData)])
    //console.log(currentTraveler);
    travelerRepo = new TravelerRepo(travelerData);
    travelerRepo.instantiateTraveler();
    tripRepo = new TripRepo(tripData);
    tripRepo.instantiateTrips();
    destinationRepo = new DestinationRepo(destinationData);
    destinationRepo.instantiateDestination();
    tripRepo.filterTripsByTraveler(currentTraveler.id);
    loadPage();
  });
};

const loadPage = () => {
  greetTraveler();
  loadDestinationOptions();
  displayTripCards();
  calculateAnnualExpenditures();
  displayAmountSpent();
};

const greetTraveler = () => {
  welcomeMessage.innerHTML = `Welcome back, ${currentTraveler.returnFirstName()}!`;
};

const displayTripCards = () => {
  tripRepo.tripList.forEach(trip => {
    const destination = destinationRepo.findDestination(trip.destinationID);
    trip.calculateSingleTrip(destination);
    trip.getTripTimeFrame(trip);

    tripCards.appendChild(createTripCard(trip, destination));
    //console.log(tripRepo.tripList);
  });
};

const createTripCard = (trip, destination) => {
  let currentTripCard = document.createElement("article");
  currentTripCard.setAttribute("id", trip.id);
  currentTripCard.setAttribute("class", "trip-card");
  currentTripCard.setAttribute("tabIndex", 0);

  currentTripCard.innerHTML = `
  <img
    src=${destination.image}
    alt=${destination.alt}
  />
  <header class="trip-header">
    <p class='category ${trip.timeFrame}-category'>${trip.timeFrame}</p>
    <h3>${destination.destination}</h3>
    <h4>${dayjs(trip.date).format("MM/DD/YYYY")}</h4>
  </header>
  <div class="content">
    <span class="stat">
      <p class="detail">${trip.travelers}</p>
      <p>Travelers</p>
    </span>
    <span class="stat">
      <p class="detail">${trip.duration}</p>
      <p>Nights</p>
    </span>
  </div>
  <footer>
    <p>Trip Cost</p>
    <p class="detail">$${trip.cost.toFixed(2)}</p>
  </footer>
  `;

  return currentTripCard;
};

const calculateAnnualExpenditures = () => {
  const userTrips = tripRepo.filterTripsByTraveler(currentTraveler.id);
  //console.log(userTrips)
  const result = userTrips.reduce((acc, trip) => {
    if (trip.date.includes("2022") && trip.status === "approved") {
      acc += trip.cost;
    }
    return acc;
  }, 0);
  return result.toFixed(2);
};

const displayAmountSpent = () => {
  let amountSpent = calculateAnnualExpenditures();
  expenditures.innerHTML = `You've spent a total of $${amountSpent} on travel this year!`;
};

const loadDestinationOptions = () => {
  destinationRepo.data.forEach(destination => {
    destinationsDropDown.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`;
  });
  return;
};

const displayTripEstimate = event => {
  let estimate = calculateEstimatedCost();
  estimateMessage.innerHTML = `Your estimated trip cost is $${estimate}! Press "Book trip" to confirm or choose a different trip!`;
};

const calculateEstimatedCost = form => {
  event.preventDefault();
  let newTripDestination = destinationRepo.findDestination(
    parseInt(destinationsDropDown.value)
  );
  let newTripDuration = durationInput.value;
  let newTripTravelers = guestsInput.value;
  let newTripCost =
    (newTripDestination.estimatedFlightCostPerPerson * newTripTravelers +
      newTripDestination.estimatedLodgingCostPerDay * newTripDuration) *
    1.1;
  return newTripCost.toFixed(2);
};


const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}

//Event Listeners
window.addEventListener("load", fetchApiCalls());
estimateButton.addEventListener("click", calculateEstimatedCost);
estimateButton.addEventListener("click", displayTripEstimate);
