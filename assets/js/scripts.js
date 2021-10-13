// wait for the DOM tro finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for(let button of buttons){
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    runGame("addition");
})

/**
 * The main game "loop", called when the script is first loaded 
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else {
        alert(`unknown game type: ${gameType}`);
        throw `unknown game type ${gameType}. Aborting!`;
    }

}

/**
 * Check the answer against the first element in the
 * returned calculatedCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value); //need to use value here as it is an input field and NOT use innerText//
    let calculatedAnswer = calculateCorrectAnswer();        // call to calculatedCorrectAnswer function to get the correct answer.
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awwwww.... you answered ${userAnswer}. The correct answer is ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);   // last thing to do after completing the check is to run the same game type again for the next question
}


/**
 * Gets the operands (the numbers) amd the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];  // the return from this function is an array, (index0 = answer), (index1 = the type of operation)
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    let newScore = oldScore + 1;
    oldScore = newScore;
    document.getElementById("score").textContent = oldScore;

    //let oldScore = parseInt(document.getElementById("score").innerText);
    //document.getElementById("score").innnerText = ++oldScore;
}

/**
 * Gets the current tally of the incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    let oldWrongScore = parseInt(document.getElementById("incorrect").innerText);
    let newWrongScore = oldWrongScore + 1;
    oldWrongScore = newWrongScore;
    document.getElementById("incorrect").textContent = oldWrongScore;

    // let oldScore = parseInt(.document.getElementById("incorrect").innerText);
    // let document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}

function displayDivisionQuestion() {

}