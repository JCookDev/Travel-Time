import "normalize.css"
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
const userName = document.querySelector("#userName");
const password = document.querySelector("#password");
const submitPasswordButton = document.querySelector("#submitPasswordButton");
const loginSection = document.querySelector("#loginSection");
const mainSection = document.querySelector(".main-section");
const logoutButton = document.querySelector(".logout-button");

//Global Variables
let today = dayjs().format("YYYY/MM/DD");
let travelerRepo, tripRepo, destinationRepo;
let currentTraveler;
let userID;

//Functions
const fetchApiCalls = () => {
  apiCalls.fetchData().then(data => {
    let travelerData = data[0].travelers;
    let tripData = data[1].trips;
    let destinationData = data[2].destinations;
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

const getTravelerInputData = form => {
  return {
    id: parseInt(tripRepo.data.length + 1),
    userID: parseInt(currentTraveler.id),
    destinationID: parseInt(form[0].value),
    travelers: parseInt(form[3].value),
    date: dayjs(form[1].value).format("YYYY/MM/DD"),
    duration: parseInt(form[2].value),
    status: "pending",
    suggestedActivities: []
  };
};

const loadPage = () => {
  greetTraveler();
  loadDestinationOptions();
  displayTripCards();
  calculateAnnualExpenditures();
  displayAmountSpent();
};

const toggleHidden = element => {
  element.classList.toggle("hidden");
};

const fetchUserCall = userID => {
  apiCalls.fetchUser(userID).then(data => {
    currentTraveler = new Traveler(data[0]);
    console.log(currentTraveler);
    tripCards.innerHTML = "";
    fetchApiCalls(userID);
    toggleHidden(loginSection);
    toggleHidden(mainSection);
    toggleHidden(logoutButton);
  });
};

const verifyCredentials = () => {
  event.preventDefault();
  let user = userName.value.substring(0, 8);
  userID = userName.value.substring(8);
  if (
    password.value === "travel" &&
    user === "traveler" &&
    userID <= 50 &&
    userID >= 1
  ) {
    fetchUserCall(userID);
    return userID;
  } else {
    alert("Incorrect username or password! Try again!");
  }
};

const returnToLoginPage = () => {
  event.preventDefault();
  toggleHidden(loginSection);
  toggleHidden(mainSection);
  toggleHidden(logoutButton);
};

const greetTraveler = () => {
  welcomeMessage.innerHTML = `Welcome back, ${currentTraveler.returnFirstName()}!`;
};


const calculateAnnualExpenditures = () => {
  const userTrips = tripRepo.filterTripsByTraveler(currentTraveler.id);
  console.log(userTrips)
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

const displayTripCards = () => {
  tripRepo.tripList.forEach(trip => {
    const destination = destinationRepo.findDestination(trip.destinationID);
    trip.calculateSingleTrip(destination);
    trip.getTripTimeFrame(trip);

    tripCards.appendChild(createTripCard(trip, destination));
  });
  clearInput();
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


const clearInput = () => {
  destinationsDropDown.value = "";
  durationInput.value = "";
  guestsInput.value = "";
  bookingDateInput.value = "";
  estimateMessage.innerHTML = "";
};

const postData = event => {
  event.preventDefault();
  const result = getTravelerInputData(event.target.form);
  apiCalls.postTripInfo(result).then(() => {
    tripCards.innerHTML = "";
    fetchApiCalls(currentTraveler.id);
  });
};

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}

//Event Listeners
estimateButton.addEventListener("click", calculateEstimatedCost);
estimateButton.addEventListener("click", displayTripEstimate);
submitButton.addEventListener("click", postData);
submitPasswordButton.addEventListener("click", verifyCredentials);
logoutButton.addEventListener("click", returnToLoginPage);
