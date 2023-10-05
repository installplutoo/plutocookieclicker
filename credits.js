document.title = "About - Cookie Clicker"


import { menusound, playSound } from "./cookieclicker.js";


const resetbtn = document.getElementById("reset")
const toggleMusic = document.getElementById("tMusic")
const toggleSound = document.getElementById("tSound")
const cStateS = document.getElementById("tSound")
const cStateM = document.getElementById("tMusic")


resetbtn.addEventListener("click", function(){
    localStorage.clear()
    cStateM.innerHTML = `Music: ON`
    cStateS.innerHTML = `Sound: ON`
})

toggleMusic.addEventListener("click", function(){
    
    let m =localStorage.getItem("ifMutedM") === "true";
    if (m ===false){ 
        cStateM.innerHTML = `Music: OFF`
        localStorage.setItem("ifMutedM", "true")
       }
    else {
        cStateM.innerHTML = `Music: ON`
        localStorage.setItem("ifMutedM", "false")
       }
})
toggleSound.addEventListener("click", function(){
   let s = localStorage.getItem("ifMutedS") === "true"
   
   if (s === false){ 
    cStateS.innerHTML = `Sound: OFF`
    localStorage.setItem("ifMutedS", "true")
   }
    else {
        cStateS.innerHTML = `Sound: ON`
    localStorage.setItem("ifMutedS", "false")
   }
   console.log(s)
})

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