const numberList = document.body.querySelectorAll(".number"); 
const numbers = Array.from(numberList);

const addB = document.querySelector(".add");
const divideB = document.querySelector(".divide");
const multiplyB = document.querySelector(".multiply");
const subtractB = document.querySelector(".subtract");
const equals = document.querySelector(".equals");
const clearB = document.querySelector(".clear");

const MAX_DISPLAY_LENGTH = 15;

clearB.addEventListener("click", () => clear());
equals.addEventListener("click", () => operate());
subtractB.addEventListener("click", () =>  operand("subtract"));
addB.addEventListener("click", () =>  operand("add"));
multiplyB.addEventListener("click", () => operand("multiply"));
divideB.addEventListener("click", () =>  operand("divide"));


const display = document.querySelector(".current-num");
const prevNum = document.querySelector(".prev-num");

numbers.map(item => {
    item.addEventListener("click", () => populate(item.textContent));
})


let currentNum = 0;
let numToSum = 0;
let operating = false;
let currentOp = "";
let justOperated = false;

function clear(){
    display.textContent = "";
    prevNum.textContent = "";
    operating = false;
    currentOp = "";
}

function checkLimit() {
    if (display.textContent.length > MAX_DISPLAY_LENGTH) {
        display.textContent = display.textContent.slice(0, MAX_DISPLAY_LENGTH);
    }
}

function populate(x){
    if (justOperated) {
        display.classList.remove("calculation");
        display.textContent = "";
        justOperated = false;
    }

    display.textContent += x;

    if(!operating){
        currentNum = display.textContent;    
    }
    numToSum = display.textContent;
    checkLimit();
}

function operand(op) {
    var opSymbol = "";
    if (op == "add") opSymbol = "+";
    else if (op == "divide") opSymbol = "÷";
    else if (op == "subtract") opSymbol = "-";
    else if (op == "multiply") opSymbol = "*";

    prevNum.textContent = display.textContent + " " + opSymbol;
    display.textContent = "";
    prevNum.classList.remove("prev-anim");
    prevNum.classList.add("prev-anim");
    currentOp = op;
    operating = true;
    checkLimit();
}

function add(a, b){
    display.textContent = a + b;
}
function subtract(a, b){
    display.textContent = a - b;
}

function multiply(a, b) {
    display.textContent = a * b
}

function divide(a, b) {
    display.textContent = a / b
} 

function operate(){
    
    if (currentOp == "") return;
    prevNum.textContent = "";
    currentNum = parseFloat(currentNum);
    numToSum = parseFloat(numToSum);

    if (currentOp == "add") add(currentNum, numToSum);
    else if (currentOp == "divide") divide(currentNum, numToSum);
    else if (currentOp == "subtract") subtract(currentNum, numToSum);
    else if (currentOp == "multiply") multiply(currentNum, numToSum);
    currentNum = display.textContent; 
    prevNum.classList.remove("prev-anim");
    display.classList.add("calculation");
    if(justOperated){
        display.style.webkitAnimation = 'none';
    }
    setTimeout(function() {
        display.style.webkitAnimation = '';
    }, 10);
    justOperated = true;
    operating = false;
    checkLimit();

}