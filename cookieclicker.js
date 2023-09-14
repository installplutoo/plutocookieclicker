const cookieClick = document.getElementById("press-me")
const scoreBrd = document.getElementById("score-brd")
const HighScore = document.getElementById("high-score")
const startT = document.getElementById("start")
const timerCd = document.getElementById("timer")
const pointCounter = document.getElementById("points")
const menuBtn = document.getElementById("menu-btn")
let sMultiplier = 1;


let score = 0
let timerId = 5
startT.disabled = false



let highs = localStorage.getItem("highscoreSave")
let points = localStorage.getItem("pointSave")




HighScore.innerHTML = `High-Score: ${highs}`
pointCounter.innerHTML = `Points: ${points}`
cookieClick.disabled = true

function disabledBtn(button){
    if(button.disabled===true){
        button.style.opacity= '0.3';
        
        
    }
    if(button.disabled === false){
        button.style.backgroundColor = '#4477CE';
        button.style.opacity = "1";
      
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

startT.addEventListener("click", function startTimer(){
    cookieClick.disabled = false
    let cdt = setInterval(function countdown() {
       
		timerId--
        if (timerId >= 0){
            timerCd.innerHTML = `Time Left(s): ${timerId}`
            startT.disabled = true
        
            disabledBtn(startT)
        }
        if (timerId === 0) {
            alert('sorry, out of time');
            clearInterval(timerId);
            startT.disabled = false
            cookieClick.disabled = true
            disabledBtn(startT)
            setHigh()
            points = score+JSON.parse(localStorage.getItem("pointSave"))
            pointCounter.innerHTML = `Points: ${points}`
            localStorage.setItem("pointSave", points)
            score = 0
            scoreBrd.innerHTML = `Score: ${score}`
            startT.innerHTML = `Try Again`
            
            clearInterval(cdt)
        }
        
       

    
	}, 1000)
    
   
    TryAgain()
})
cookieClick.addEventListener("click", function(){
    console.log("clicked ")
    if (timerId >= 0){
    score = score +(100*sMultiplier)
    
    scoreBrd.innerHTML = `Score: ${score}`
    localStorage.setItem("scoreSave", score)
    
    
    }
    

})
function TryAgain(){

timerId = 5
startTimer()
 
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