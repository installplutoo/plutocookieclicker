
import { sMultiplier, updateMultiplier, points, updatePoints, newTimer, timerId, pointCounter } from "./cookieclicker.js";

console.log("Initial sMultiplier:", sMultiplier);

const firstUpgKey = "firstUpg";
let firstUpgM = parseInt(localStorage.getItem(firstUpgKey)) || 500;
let isFirstUpgradeM = localStorage.getItem(firstUpgKey) !== "false";
let oUpgM = firstUpgM;

let isFirstUpgradeT = localStorage.getItem("UpgOne") !== "false"
let firstUpgT = isFirstUpgradeT ? 500 : Math.ceil(localStorage.getItem("UpgOne") * 1.5);



const multupg = document.getElementById("upg-Mult")
const timeupg = document.getElementById("upg-timer")
const multbar = document.getElementById("skill-mult")
const timebar = document.getElementById("skill-time")
const mcostUpg = document.getElementById("mcost")
const tcostUpg = document.getElementById("tcost")
let pts = localStorage.getItem("pointSave")||0;
pointCounter.innerHTML = `Points: ${pts}`


mcostUpg.innerHTML = `2x Multiplier: $${firstUpgM}`;
tcostUpg.innerHTML = `+5  Time: ${firstUpgT}`

function disabledbtn(lclbutton, button){
  if(localStorage.getItem(lclbutton) === '5'){
    button.style.backgroundcolor = '#4477CE';
}
}

multupg.addEventListener("click", function upgMult() {
  if (isFirstUpgradeM && points >= firstUpgM) {
    console.log("Before update - sMultiplier:", sMultiplier);
    const newMultiplier = sMultiplier * 2;
    updateMultiplier(newMultiplier); // Update sMultiplier

    // Subtract firstUpg from points and update localStorage
    const updatedPoints = points - firstUpgM;
    updatePoints(updatedPoints);

    console.log("Points after upgrade:", points);
    console.log("After update - sMultiplier:", sMultiplier);

    isFirstUpgradeM = false;
    firstUpgM = Math.ceil(firstUpgM * 1.5);
    localStorage.setItem(firstUpgKey, firstUpgM);

    oUpgM = firstUpgM;

    
    multbar.innerHTML = `Multiplier: ${newMultiplier}`;
    mcostUpg.innerHTML = `2x Multiplier: $${firstUpgM}`
    // Store the updated multiplier value in localStorage
    localStorage.setItem("sMultiplier", newMultiplier);
    const currentWidth = parseFloat(multbar.style.width) || 0;  // Retrieve the current width
    const newWidth = currentWidth + 20;  // Calculate the new width
    multbar.style.width = `${newWidth}%`; 

    localStorage.setItem("multbarWidth", newWidth);
    pointCounter.innerHTML = `Points: ${updatedPoints}`
    
    
  }
  else if (!isFirstUpgradeM) {  // Only subtract points for subsequent upgrades
    if (points >= oUpgM) {
      console.log("Applying subsequent upgrade");
      const newMultiplier = sMultiplier * 2;
      updateMultiplier(newMultiplier);
      
      const updatedPoints = points - oUpgM;
      updatePoints(updatedPoints);
      pointCounter.innerHTML = `Points: ${updatedPoints}`
    
      console.log("Points after subsequent upgrade:", points);
      console.log("After update - sMultiplier:", sMultiplier);

      oUpgM = Math.ceil(oUpgM * 1.5);
      localStorage.setItem(firstUpgKey, oUpgM);

      multbar.innerHTML = `Multiplier: ${newMultiplier}`;
      mcostUpg.innerHTML = `2x Multiplier: $${oUpgM}`
      // Store the updated multiplier value in localStorage
      localStorage.setItem("sMultiplier", newMultiplier);
      const currentWidth = JSON.parse(localStorage.getItem("multbarWidth"));
      const newWidth = currentWidth + 20;
      multbar.style.width = `${newWidth}%`; 
      localStorage.setItem("multbarWidth", newWidth);
      console.error("Invalid width stored in localStorage.");
    
    
      }
  } else if(JSON.parse(localStorage.getItem("pointSave")) < JSON.parse(localStorage.getItem("firstUpg"))){
    alert("You do not have enough points");
  }
 
console.log('maxUpgMult:', JSON.parse(localStorage.getItem('maxUpgMult')));
console.log('multibarWidth:', JSON.parse(localStorage.getItem('multibarWidth')));
  if ( localStorage.getItem("maxUpgMult") === '5' || localStorage.getItem("multibarWidth")==='100') {
    multupg.disabled = true;
    localStorage.setItem("maxUpgMult", '5');  // Update maxUpg to '5s'in localStorage
    console.log("You have reached max upgrades");
    return
  }
}

  
  // Update the display or perform any other actions related to the multiplier change
);

timeupg.addEventListener("click", function () {

    
    let upgradeCost = parseInt(localStorage.getItem("UpgValueT"))||500
    console.log(typeof upgradeCost)
    console.log(upgradeCost)
   if ( points >= upgradeCost) {  
    const initialTimer = parseInt(localStorage.getItem("initialTimer")) || 5;
    const updatedInitialTimer = initialTimer + 5;
    localStorage.setItem("initialTimer", updatedInitialTimer);
    console.log("Updated initialTimer value:", updatedInitialTimer);
   
   
  
    //progress bar
    const currentWidth = parseFloat(timebar.style.width) || 0
    const newWidth = currentWidth + 20
    timebar.style.width = `${newWidth}%`
    localStorage.setItem("timebarWidth", newWidth)

    const timerValue = parseInt(localStorage.getItem("initialTimer")) || 5;
    timebar.innerHTML = `Timer: ${timerValue}`;
    
      if (isFirstUpgradeT) {
      localStorage.setItem("UpgValueT", firstUpgT*1.5)
      tcostUpg.innerHTML = `+5 Time: $${Math.round(upgradeCost)}`
      const updatedPoints = points - firstUpgT;
      pointCounter.innerHTML = `Points: ${updatedPoints}`
     
        console.log(firstUpgT)
      isFirstUpgradeT = false;
      localStorage.setItem("UpgOne", isFirstUpgradeT)
      updatePoints(updatedPoints);
     
      
    } else {
      firstUpgT = Math.ceil(firstUpgT * 1.5);
      console.log(firstUpgT)
      localStorage.setItem("UpgValueT", firstUpgT*1.5)
      let valueUpg = localStorage.getItem("UpgValueT")
      let parsedUpg = parseFloat(valueUpg)
      let roundedUpg = Math.round(parsedUpg)
      
      const updatedPoints = points - firstUpgT;
      tcostUpg.innerHTML = `+5  Time: $${roundedUpg}`
      pointCounter.innerHTML = `Points: ${updatedPoints}`
      updatePoints(updatedPoints); 
      

    }}
   else if (points < firstUpgT) {
    alert("You do not have enough points")
   }
  
  
    if (localStorage.getItem("initialTimer") === '30' || localStorage.getItem("maxUpg") === '5'|| localStorage.getItem("timebarWidth") === '100') {
      timeupg.disabled = true;
      localStorage.setItem("maxUpg", '5');  // Update maxUpg to '5s'in localStorage
      console.log("You have reached max upgrades");
      
      disabledbtn(timeupg)
      timebar.innerHTML = (`Timer: ${JSON.parse(localStorage.getItem("initialTimer"))}`)
    }
  //} else {
    //alert("You have already reached the maximum number of time upgrades.");
    //const timerValue = parseInt(localStorage.getItem("initialTimer")) || 5;
    //timebar.innerHTML = `Timer: ${timerValue}`;
 // }
});
document.addEventListener('DOMContentLoaded', function() {
  // Disable timeupg button if maxUpg is 5
  if (localStorage.getItem("maxUpg") === '5') {
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
  
  const storedupg = localStorage.getItem("FirstUpg");
  const storedWidth = localStorage.getItem("timebarWidth");
  const newMultiplier = parseInt(localStorage.getItem("sMultiplier")) || 1;
  const storedWidtht = localStorage.getItem("multbarWidth");
  const storedTupg = localStorage.getItem("UpgValueT")
  localStorage.getItem("UpgOne")
  if (storedWidth) {
    // Set the retrieved width as the initial width of timebar
    timebar.style.width = `${parseFloat(storedWidth)}%`;
  }
  if (storedWidtht) {
    // Set the retrieved width as the initial width of timebar
    multbar.style.width = `${parseFloat(storedWidtht)}%`;
  } if (storedupg) {
    // Set the retrieved width as the initial width of timebar
    mcostUpg.innerHTML = JSON.parse(localStorage.getItem("firstUpg"))
  }
  if (storedTupg) {
    // Set the retrieved width as the initial width of timebar
    tcostUpg.innerHTML =  `+5 Time: $${JSON.parse(Math.ceil(localStorage.getItem("UpgValueT")))}`
  }
  
  
  timebar.innerHTML = `Timer: ${JSON.parse(localStorage.getItem("initialTimer"))||5 }(s)`
  multbar.innerHTML = `Multiplier: ${newMultiplier}`;
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