import './css/styles.css';
import TravelerRepo from "./Traveler-Repo";
import TripRepo from "./Trip-Repo";
import DestinationRepo from "./Destination-Repo";
import Traveler from "../src/Traveler";
import apiCalls from "./apiCalls";

const dayjs = require("dayjs");

// Query Selectors
const welcomeMessage = document.querySelector("#welcomeMessage");
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

console.log('This is the JavaScript entry file - your code begins here.');
