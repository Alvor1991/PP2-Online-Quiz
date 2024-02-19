const quiz = [
    {
        question: "Practice Question?",
        answers: [
            { text: "Answer1", correct: false},
            { text: "Answer2", correct: false},
            { text: "Answer3", correct: true},
            { text: "Answer4", correct: false},
        ]
    },

    {
        question: "Practice Question?",
        answers: [
            { text: "Answer1", correct: false},
            { text: "Answer2", correct: true},
            { text: "Answer3", correct: false},
            { text: "Answer4", correct: false},
        ]
    },

    {
        question: "Practice Question?",
        answers: [
            { text: "Answer1", correct: false},
            { text: "Answer2", correct: false},
            { text: "Answer3", correct: false},
            { text: "Answer4", correct: true},
        ]
    },

    {
        question: "Practice Question?",
        answers: [
            { text: "Answer1", correct: true},
            { text: "Answer2", correct: false},
            { text: "Answer3", correct: false},
            { text: "Answer4", correct: false},
        ]
    },

    {
        question: "Practice Question?",
        answers: [
            { text: "Answer1", correct: true},
            { text: "Answer2", correct: false},
            { text: "Answer3", correct: false},
            { text: "Answer4", correct: false},
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar"); 
const timerElement = document.getElementById("timer");

let questionIndex = 0;
let playerScore = 0;
let timeLeft = 20; 

// Function to start the quiz
function beginQuiz(){
    questionIndex = 0;
    playerScore = 0;
    nextButton.innerHTML = "Next";
    displayQuestion();  
    updateProgressBar(); 
    progressBar.style.width = "0%"; 
}

function startTimer() {
    timerElement.textContent = timeLeft; 
    const timer = setInterval(() => { 
        timeLeft--; 
        timerElement.textContent = timeLeft;
    }
}

// Function to display question
function displayQuestion(){
    clearAnswer();
    let currentQuestion = quiz[questionIndex];
    let questionNo = questionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
    updateProgressBar(); 
}

// Function to clear answer and reset
function clearAnswer(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function when user clicks on answer 
function selectAnswer(e){
    const clickedButton = e.target;
    const correctAnswer = clickedButton.dataset.correct === "true";
    if(correctAnswer){
        clickedButton.classList.add("correct");
        playerScore++;
    }else{
        clickedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// Function to display score
function displayScore(){
    clearAnswer();
    questionElement.innerHTML = `You scored ${playerScore} out of ${quiz.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Function to update progress bar
function updateProgressBar() {
    const progress = ((questionIndex) / quiz.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Function to handle next button click
function handleNextButton(){
    questionIndex++;
    updateProgressBar();
    if(questionIndex < quiz.length){
        displayQuestion();
    }else{
        displayScore();
    }
}

// Event listener for next button click
nextButton.addEventListener("click", ()=>{
    if(questionIndex < quiz.length){
        handleNextButton();
    }else{
        beginQuiz();
    }
});

beginQuiz();