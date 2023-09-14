
import { sMultiplier } from "./cookieclicker";
function upgMult(){
    sMultiplier*2;
localStorage.setItem("Multiplier", sMultiplier)
  }
  console.log(sMultiplier)