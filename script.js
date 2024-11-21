let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;
let memory = 0;
let isInDegrees = true;
let isScientificNotation = false;

// Display Functions
function updateDisplay() {
    const currentDisplay = document.querySelector('.current-operand');
    const previousDisplay = document.querySelector('.previous-operand');
    
    if (isScientificNotation && !isNaN(currentOperand)) {
        currentDisplay.textContent = parseFloat(currentOperand).toExponential(2);
    } else {
        currentDisplay.textContent = currentOperand;
    }
    previousDisplay.textContent = previousOperand;
}

// Number Input
function appendNumber(number) {
    if (shouldResetScreen) {
        currentOperand = number;
        shouldResetScreen = false;
    } else {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand === '0' ? number : currentOperand + number;
    }
    updateDisplay();
}

// Clear Functions
function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

// Basic Operations
function setOperation(op) {
    if (operation !== undefined) {
        compute();
    }
    operation = op;
    previousOperand = currentOperand + ' ' + op;
    shouldResetScreen = true;
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch(operation) {
        case '+': computation = prev + current; break;
        case '−': computation = prev - current; break;
        case '×': computation = prev * current; break;
        case '÷': 
            if (current === 0) {
                alert("Cannot divide by zero!");
                return;
            }
            computation = prev / current;
            break;
        default: return;
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

// Scientific Functions
function calculate(type) {
    const current = parseFloat(currentOperand);
    let result;

    switch(type) {
        case 'sin':
            result = isInDegrees ? 
                Math.sin(current * Math.PI / 180) : 
                Math.sin(current);
            break;
        case 'cos':
            result = isInDegrees ? 
                Math.cos(current * Math.PI / 180) : 
                Math.cos(current);
            break;
        case 'tan':
            result = isInDegrees ? 
                Math.tan(current * Math.PI / 180) : 
                Math.tan(current);
            break;
        case 'asin':
            result = isInDegrees ? 
                (Math.asin(current) * 180 / Math.PI) : 
                Math.asin(current);
            break;
        case 'acos':
            result = isInDegrees ? 
                (Math.acos(current) * 180 / Math.PI) : 
                Math.acos(current);
            break;
        case 'atan':
            result = isInDegrees ? 
                (Math.atan(current) * 180 / Math.PI) : 
                Math.atan(current);
            break;
        case 'log': result = Math.log10(current); break;
        case 'ln': result = Math.log(current); break;
        case 'sqrt': result = Math.sqrt(current); break;
        case 'cbrt': result = Math.cbrt(current); break;
        case 'square': result = current * current; break;
        case 'cube': result = current * current * current; break;
        case 'factorial': result = factorial(current); break;
        case 'pi': result = Math.PI; break;
        case 'e': result = Math.E; break;
        case 'exp2': result = Math.pow(2, current); break;
    }

    if (result !== undefined) {
        currentOperand = result.toString();
        shouldResetScreen = true;
        updateDisplay();
    }
}

// Helper Functions
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Memory Functions
function memoryClear() {
    memory = 0;
}

function memoryRecall() {
    currentOperand = memory.toString();
    updateDisplay();
}

function memoryAdd() {
    memory += parseFloat(currentOperand);
}

// Mode Toggle Functions
function toggleDegRad() {
    isInDegrees = !isInDegrees;
    document.querySelector('.memory').textContent = isInDegrees ? 'DEG' : 'RAD';
}

function toggleScientificNotation() {
    isScientificNotation = !isScientificNotation;
    updateDisplay();
}

function handleEquals() {
    if (operation && previousOperand !== '') {
        compute();
    }
}

// Initialize
updateDisplay();

// Keyboard Support
document.addEventListener('keydown', (event) => {
    if (/[0-9.]/.test(event.key)) {
        appendNumber(event.key);
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        const opMap = {'+': '+', '-': '−', '*': '×', '/': '÷'};
        setOperation(opMap[event.key]);
    } else if (event.key === 'Enter' || event.key === '=') {
        handleEquals();
    } else if (event.key === 'Escape') {
        clearAll();
    }
});


