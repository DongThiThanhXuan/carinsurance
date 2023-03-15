
const tabs = document.querySelectorAll('.tab')
const total = 0;
let progress = -100;
let per = 0;
let lengthTab = tabs.length
var currentTab = 0; 

const updateBarLength = (number) => {
   document.getElementById("progress-bar").style.left =  number +"%"
   
}
const updateText = (number)=>{
  
   document.querySelector(".percentage").innerHTML = "Complete " +number +"%"
}

function payPalDone(){
  progress +=20
  per +=20
  updateBarLength(progress);
  updateText(per)
}



function showTab(n) {
 
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";


}

function nextPrev(n) {

  var x = document.getElementsByClassName("tab");


 
  x[currentTab].style.display = "none";
  
  currentTab = currentTab + n;
  

  
  showTab(currentTab);
  if(n ==-1){
    
  if (progress > -100) {
    progress-=10;
    per-= 10
    updateBarLength(progress);
    updateText(per)
  } 
}else{
    if (progress < total) {
   progress += 10
   per += 10
    updateBarLength(progress);
    updateText(per)
  }
  }
 
}

function validateForm() {
 
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  
  for (i = 0; i < y.length; i++) {
  
    if (y[i].value == "") {
      
      y[i].className += " invalid";
    
      valid = false;
    }
  }

 
  return valid;
}

function chooseItem(event){
  const btns=event.target.parentElement.querySelectorAll('input')

  btns.forEach(x=>x.classList.remove("active"))
  event.target.classList.add("active")
  nextPrev(1)
}

function showCurrentTab(){
  showTab(currentTab) 
 
}
