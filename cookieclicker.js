document.title = "Home - Cookie Clicker"

let sMultiplier = localStorage.getItem("Multiplier") || 1;
sMultiplier = parseInt(sMultiplier); // Parse as integer


const firstUpgKey = "firstUpg";
let timerId = localStorage.getItem("timerSave") || 5
let points = localStorage.getItem("pointSave") || 0;
let newTimer;

function updateMultiplier(newMultiplier) {
  sMultiplier = newMultiplier;
  localStorage.setItem("Multiplier", newMultiplier);
}

function updatePoints(newPoints) {
  points = newPoints;
  localStorage.setItem("pointSave", newPoints);
}
function updateTimer(newTimer){
    timerId = newTimer;
    localStorage.setItem("timerSave", newTimer)
}
function playMusic(music){
    let x =localStorage.getItem("ifMutedM") === "true"
    if (x === false){
        
        music.play()
    }
}

function playSound(sound){
    let x =localStorage.getItem("ifMutedS") === "true"
    if (x === false){
        
        sound.play()
    }
}

export { sMultiplier, updateMultiplier, points, updatePoints, timerId , newTimer, pointCounter, menusound, playSound };
const cookieClick = document.getElementById("press-me")
const scoreBrd = document.getElementById("score-brd")
const HighScore = document.getElementById("high-score")
const startT = document.getElementById("start")
const timerCd = document.getElementById("timer")
const pointCounter = document.getElementById("points")
const dispmult = document.getElementById("multdisplay")
let e = document.querySelector('.volume-slider-con');
let eInner = document.querySelector('.volume-slider');
const speakericon = document.querySelector(".speaker")


const tunes = new Audio("RuneFactorySpring.mp3")
const menusound = new Audio("menubutton.mp3")
const CClick = new Audio("Cookieclick.wav")
document.addEventListener('DOMContentLoaded', function() {

    // All your code goes here
  


timerCd.innerHTML = `00`;


dispmult.innerHTML = `${localStorage.getItem("sMultiplier")||1}x`


let score = 0

 startT.disabled = false



let highs = localStorage.getItem("highscoreSave")|| 0
let points = localStorage.getItem("pointSave")|| 0




HighScore.innerHTML = `High-Score: ${highs}`
pointCounter.innerHTML = `Points: ${points}`
cookieClick.disabled = true

function disabledBtn(){
    if(startT.disabled===true){
        startT.style.opacity= '0.3';
        
    }else if (startT.disabled===false){
        startT.style.opacity = '1'
    }
   
}



function setHigh(){
    if(highs<score){
        localStorage.setItem("highscoreSave",score)
        HighScore.innerHTML = `High-Score: ${localStorage.getItem("highscoreSave")}`
        alert("Congratulations, new high score!")
        
        highs = score
    }
}
 console.log(JSON.parse(localStorage.getItem("maxUpg")))
let cdt;  // Declare cdt globally

function countdown() {
    timerId--;
    if (timerId >= 0) {
        timerCd.innerHTML = `${timerId}`;
        startT.disabled =true
        disabledBtn();
        updateTimer(timerId);
    }
    if (timerId === 0) {
        alert('Sorry, out of time');
        clearInterval(cdt);
        startT.disabled = false;
        cookieClick.disabled = true;
        disabledBtn();
        setHigh();
        tunes.pause()
        points = score + JSON.parse(localStorage.getItem("pointSave"));
        pointCounter.innerHTML = `Points: ${points}`;
        localStorage.setItem("pointSave", points);
        score = 0;
        scoreBrd.innerHTML = `Score: ${score}`;
        startT.innerHTML = `Try Again`;
        timerCd.innerHTML = ` ${JSON.parse(localStorage.getItem("initialTimer"))}`;
         // Reset timer on expiry
    }
}

startT.addEventListener("click", function() {
    clearInterval(cdt);
    TryAgain();
    if (timerId === 5) {
        // Only store the start time if the timer is being started from zero
        const startTime = Math.floor(Date.now() / 1000);
        localStorage.setItem("startTime", startTime);
    }
    cookieClick.disabled = false;
    cdt = setInterval(countdown, 1000);
});

// Add this function to adjust the timer when the page loads
function adjustTimer() {
    const savedStartTime = localStorage.getItem("startTime");
    if (savedStartTime) {
        const currentTime = Math.floor(Date.now() / 1000);
        const elapsed = currentTime - parseInt(savedStartTime);
        timerId = Math.max(0, timerId - elapsed);
        if (timerId > 0) {
            cdt = setInterval(countdown, 1000);
        }
    }
}

// Call the adjustTimer function when the page loads
adjustTimer();
 

function startTimer() {
    clearInterval(cdt);
    timerId = localStorage.getItem("initialTimer") || 5;  // Reset timer to initial value
    updateTimer(timerId);
    localStorage.setItem("initialTimer", timerId);  // Save initial timer value
    cookieClick.disabled = false;
    cdt = setInterval(countdown, 1000);
    playMusic(tunes)
}

startT.addEventListener("click", startTimer);
if (localStorage.getItem("timerInProgress") === "true") {
    // Timer is in progress, use the current timer value
    timerId = localStorage.getItem("timerSave");
    cdt = setInterval(countdown, 1000);
    
} else {
    // Timer is not in progress, reset the timer to the initial value
    localStorage.removeItem("timerSave");
    localStorage.removeItem("timerInProgress");
    
  
}


cookieClick.addEventListener("click", function(){
    console.log("clicked ");
    if (timerId >= 0){
        score = score + (100 * sMultiplier);  // Use sMultiplier directly
        console.log(`Score increment: ${score}`);
        scoreBrd.innerHTML = `Score: ${score}`;
        localStorage.setItem("scoreSave", score);
       
        cookieClick.style.transform = 'scale(0.85) translate(-55%,45%)';
        
          setTimeout(function () {
            
            cookieClick.style.transform = '';
        }, 100);
    }
});
function TryAgain(){

    timerId = localStorage.getItem("timerSave") || 5;

 
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
    
    playSound(menusound)
    dropdown.classList.toggle("show");} 

document.querySelector(".dropbtn").addEventListener("click", myFunction);



//Volume bar

let drag = false;
e.addEventListener('mousedown',function(ev){
   drag = true;
   updateBar(ev.clientX);
});
document.addEventListener('mousemove',function(ev){
   if(drag){
      updateBar(ev.clientX);
   }
});
document.addEventListener('mouseup',function(ev){
 drag = false;
});
const updateBar = function (x, vol) {
    const volume = e;
        let percentage;
        //if only volume have specificed
        //then direct update volume
        if (vol) {
            percentage = vol * 100;
        } else {
            var position = x - volume.offsetLeft;
            percentage = 100 * position / volume.clientWidth;
        }

        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            percentage = 0;
            speakericon.style.backgroundImage = 'url("nosound.png")';

        }
        if (percentage > 0){
            speakericon.style.backgroundImage = `url("speaker.png")`
        }

        //update volume bar and video volume
        eInner.style.width = percentage +'%';
        tunes.volume = percentage / 100;
};


});




