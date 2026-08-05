let liveResult = document.getElementById("liveResult");
let historyList = document.getElementById("historyList");

// Purani History Load
let savedHistory = localStorage.getItem("history");

if(savedHistory){
historyList.innerHTML = savedHistory;
}
let display = document.getElementById("display");
let expression = document.getElementById("expression");
let lastAnswer = "";
document.querySelectorAll(".buttons button").forEach(button => {

button.addEventListener("click",()=>{
  
if(navigator.vibrate){
    navigator.vibrate(20);
}
let value = button.innerText;
if (value == "x³") {
    cube();
    return;
}
if(value=="×") value="*";
if(value=="C"){
display.value="";
}
else if(value=="⌫"){
display.value=display.value.slice(0,-1);
}
else if(value=="√"){
    try{
        display.value = Math.sqrt(Number(display.value));
    }
    catch{
        display.value = "Error";
    }
}
else if(value=="x²"){
    if(display.value!=""){
        display.value = Math.pow(Number(display.value),2);
    }
}
else if(value=="1/x"){
    if(display.value!=""){
        display.value = 1 / Number(display.value);
    }
}
else if(value=="ANS"){
    display.value += lastAnswer;
}
else if(value=="="){
    try{
        let exp = display.value
    .replace(/×/g,"*")
    .replace(/÷/g,"/")
    .replace(/%/g,"/100");

let historyExpression = display.value;
let result = eval(exp);

expression.innerText = historyExpression;
        display.value = result;
        lastAnswer = result;
        let li = document.createElement("li");
        li.innerText = historyExpression + " = " + result;

        document.getElementById("historyList").prepend(li);
localStorage.setItem("history", historyList.innerHTML);
    }
    catch{
        display.value="Error";
    }
}
else{
if(value=="*"){
    display.value += "×";
}
else if(value=="/"){
    display.value += "÷";
}
else{
    if(value=="." && display.value.split(/[\+\-\×\÷]/).pop().includes(".")){
        return;
    }
    display.value += value;
    expression.innerText = display.value;
}
}

});

});
let themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){
themeBtn.innerText="🌞 Light Mode";
}else{
themeBtn.innerText="🌙 Dark Mode";
}

});
let historyBtn=document.getElementById("historyBtn");
let historyBox=document.getElementById("historyBox");

historyBtn.addEventListener("click",()=>{

if(historyBox.style.display=="block"){
historyBox.style.display="none";
}else{
historyBox.style.display="block";
}

});
let clearBtn = document.getElementById("clearHistory");

clearBtn.addEventListener("click",()=>{

historyList.innerHTML = "";
localStorage.removeItem("history");

alert("History Cleared Successfully!");

});
function cube() {
    if (display.value === "") return;

    let num = Number(display.value);
    display.value = num * num * num;

    expression.innerText = num + "³";
}
function updateLiveResult() {
    try {
        let exp = display.value
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/%/g, "/100");

        if (exp === "") {
            liveResult.innerText = "";
            return;
        }

        let ans = eval(exp);

        if (!isNaN(ans)) {
            liveResult.innerText = "= " + ans;
        } else {
            liveResult.innerText = "";
        }
    } catch {
        liveResult.innerText = "";
    }
}