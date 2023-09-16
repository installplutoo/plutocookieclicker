
import { sMultiplier, updateMultiplier, points, updatePoints, newTimer, timerId } from "./cookieclicker.js";

console.log("Initial sMultiplier:", sMultiplier);
const firstUpg = 500;
let oUpg = firstUpg *1.5;
let isFirstUpgrade = true;
let timeUpgClicks = 0;


const multupg = document.getElementById("upg-Mult")
const timeupg = document.getElementById("upg-timer")


console.log(JSON.parse(localStorage.getItem("maxUpg")))

multupg.addEventListener("click", function upgMult() {
  if (isFirstUpgrade && points >= firstUpg) {
    console.log("Before update - sMultiplier:", sMultiplier);
    const newMultiplier = sMultiplier * 2;
    updateMultiplier(newMultiplier); // Update sMultiplier

    // Subtract firstUpg from points and update localStorage
    const updatedPoints = points - firstUpg;
    updatePoints(updatedPoints);

    console.log("Points after upgrade:", points);
    console.log("After update - sMultiplier:", sMultiplier);
    isFirstUpgrade = false; 
  }
    else if (!isFirstUpgrade && points >= oUpg) {
      console.log("Applying subsequent upgrade");
      const newMultiplier = sMultiplier * 2;
      updateMultiplier(newMultiplier);
      
      const updatedPoints = points - oUpg;
      updatePoints(updatedPoints);
  
      console.log("Points after subsequent upgrade:", points);
      console.log("After update - sMultiplier:", sMultiplier);
  
  } else {
    alert("You do not have enough points");
  }
  // Update the display or perform any other actions related to the multiplier change
});

timeupg.addEventListener("click", function () {
  if (timeUpgClicks < 3) {  // Allow up to 3 clicks for time upgrade
    const currentTimer = parseInt(localStorage.getItem("timerSave")) || 5;
    const newTimer = currentTimer + 5;
    console.log("New timer value:", newTimer);
    localStorage.setItem("timerSave", newTimer);
    timeUpgClicks++;
    console.log("Timeupg clicks:", timeUpgClicks);

    // Add the following code to update the initialTimer
    const initialTimer = parseInt(localStorage.getItem("initialTimer")) || 5;
    const updatedInitialTimer = initialTimer + 5;
    localStorage.setItem("initialTimer", updatedInitialTimer);
    console.log("Updated initialTimer value:", updatedInitialTimer);


    if (timeUpgClicks === 3 || localStorage.getItem("maxUpg") === '3') {
      timeupg.disabled = true;
      localStorage.setItem("maxUpg", '3');  // Update maxUpg to '3' in localStorage
      console.log("You have reached max upgrades");
    }
  } else {
    alert("You have already reached the maximum number of time upgrades.");
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // Disable timeupg button if maxUpg is 3
  if (localStorage.getItem("maxUpg") === '3') {
    timeupg.disabled = true;
    console.log("You have reached max upgrades");
  }

  // Call the startTimerFromLocalStorage function
  startTimerFromLocalStorage();
});

console.log("Initial sMultiplier:", sMultiplier);
document.addEventListener('DOMContentLoaded', function() {
 
  startTimerFromLocalStorage();

  
});
function startTimerFromLocalStorage() {
  
  const timerValue = parseInt(localStorage.getItem("timerSave")) || 5;
  
}


  document.addEventListener("click", function(event) {
    const dropdown = document.getElementById("myDropdown");
    
    // Check if the clicked element is the button or inside the dropdown
    if (!event.target.matches('.dropbtn') && !dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
    }
});

// Toggle the dropdown when clicking the dropbtn
function myFunction() {
    const dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");} 

document.querySelector(".dropbtn").addEventListener("click", myFunction);