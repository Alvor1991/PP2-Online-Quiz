const quiz = [
    {
        question: "What was the title of Michael Jackson's first solo album, in 1979?",
        answers: [
            { text: "Thriller", correct: false},
            { text: "Off the Wall", correct: true},
            { text: "Bad", correct: false},
            { text: "Dangerous", correct: false},
        ]
    },

    {
        question: "Which band released the album 'Dark Side of the Moon' in 1973?",
        answers: [
            { text: "The Rolling Stones", correct: false},
            { text: "Led Zeppelin", correct: false},
            { text: "The Who", correct: false},
            { text: "Pink Floyd", correct: true},
        ]
    },

    {
        question: "Who released the hit song 'American Pie' in 1971?",
        answers: [
            { text: "Don McLean", correct: true},
            { text: "Bob Dylan", correct: false},
            { text: "Simon & Garfunkel", correct: false},
            { text: "James Taylor", correct: false},
        ]
    },

    {
        question: "Which American rock band released the album 'Hotel California' in 1976?",
        answers: [
            { text: "Aerosmith", correct: false},
            { text: "The Eagles", correct: true},
            { text: "Lynyrd Skynyrd", correct: false},
            { text: "Boston", correct: false},
        ]
    },

    {
        question: "Who released the hit song 'I Will Survive' in 1978?",
        answers: [
            { text: "Diana Ross", correct: false},
            { text: "Donna Summer", correct: false},
            { text: "Gloria Gaynor", correct: true},
            { text: "Cher", correct: false},
        ]
    },

    {
        question: "Who was the lead guitarist of the band Led Zeppelin?",
        answers: [
            { text: "Jimmy Page", correct: true},
            { text: "Robert Plant", correct: false},
            { text: "Keith Richards", correct: false},
            { text: "Joe Perry", correct: false},
        ]
    },

    {
        question: "Who sang the hit song 'Let It Be' in 1970?",
        answers: [
            { text: "John Lennon", correct: false},
            { text: "Paul McCartney", correct: true},
            { text: "George Harrison", correct: false},
            { text: "Ringo Starr", correct: false},
        ]
    },

    {
        question: "Who sang the hit song 'Superstition', released in 1972?",
        answers: [
            { text: "Marvin Gaye", correct: false},
            { text: "Al Green", correct: false},
            { text: "Curtis Mayfield", correct: false},
            { text: "Stevie Wonder", correct: true},
        ]
    },

    {
        question: "Which Bee Gees song was their first number-one hit single in 1971?",
        answers: [
            { text: "How Can You Mend a Broken Heart", correct: true},
            { text: "How Deep Is Your Love", correct: false},
            { text: "Tragedy", correct: false},
            { text: "Stayin' Alive", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar"); 
const correctAnswersElement = document.getElementById("correct-answers");
const incorrectAnswersElement = document.getElementById("incorrect-answers");


let questionIndex = 0;
let playerScore = 0;

/** Function to begin the quiz */ 
function beginQuiz(){
    questionIndex = 0;
    playerScore = 0;
    nextButton.innerHTML = "Next";
    updateProgressBar(); 
    progressBar.style.width = "0%"; 
    displayQuestion();  
    correctAnswersElement.textContent = '0';
    incorrectAnswersElement.textContent = '0';
    document.getElementById("score").style.display = "block";
}

/** Function to display question */ 
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

/** Function to clear answer and reset */ 
function clearAnswer(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

/** Function when user clicks on answer */ 
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
    scoreCounter();
}

/** Function for score counter feature */ 
function scoreCounter() {
    correctAnswersElement.textContent = playerScore;
    incorrectAnswersElement.textContent = questionIndex + 1 - playerScore;
}

/** Function to display score */ 
function displayScore(){
    clearAnswer();
    let scoreMessage = "";
    if (playerScore === 10) {
        scoreMessage = "Perfect score! You're a true 1970s music expert!";
    } else if (playerScore >= 7) {
        scoreMessage = "Great job! You really know your 1970s music!";
    } else if (playerScore >= 5) {
        scoreMessage = "Not bad! Keep rocking and learning!";
    } else {
        scoreMessage = "Keep exploring! You'll improve with practice!";
    }
    questionElement.innerHTML = `<span class="score-message">You scored ${playerScore} / ${quiz.length}!<br>${scoreMessage}</span>`;
    document.getElementById("score").style.display = "none";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

/** Function to update progress bar */ 
function updateProgressBar() {
    const progress = ((questionIndex) / quiz.length) * 100;
    progressBar.style.width = `${progress}%`;
}

/** Function to handle next button click */
function handleNextButton(){
    questionIndex++;
    updateProgressBar();
    if(questionIndex < quiz.length){
        displayQuestion();
    }else{
        displayScore();
    }
}

/** Event listener for next button click */ 
nextButton.addEventListener("click", ()=>{
    if(questionIndex < quiz.length){
        handleNextButton();
    }else{
        beginQuiz();
    }
});

beginQuiz();

/** Function to hide quiz container */ 
function hideQuizContainer() {
    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.style.display = "none"; 
}

/** Function to show quiz container */ 
function showQuizContainer() {
    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.style.display = "block"; 
}

/** Function to show welcome modal */ 
function showWelcomeModal() {
    var welcomeModal = document.getElementById("welcome-modal");
    var startButton = document.getElementById("start-btn");
    var rulesButton = document.getElementById("quiz-rules");

    startButton.onclick = function() {
        welcomeModal.style.display = "none";
        beginQuiz();
        showQuizContainer();
    }

    rulesButton.onclick = function() {
        welcomeModal.style.display = "none";
        rulesModal.style.display = "block";
        hideQuizContainer();
    }

    welcomeModal.style.display = "block";
    hideQuizContainer();
}

window.onload = showWelcomeModal;

var rulesModal = document.getElementById("rules-modal");
var homeButtons = document.getElementsByClassName("home");


/** Function to go welcome modal from the home icon */ 
function goToWelcomeModal() {
    var welcomeModal = document.getElementById("welcome-modal");
    var modals = document.getElementsByClassName("modal");
    
    for (var i = 0; i < modals.length; i++) {
        modals[i].style.display = "none"; 
    }
    
    welcomeModal.style.display = "block"; 
    showQuizContainer(); // 
}

// Attach click event listener to each home button/icon
for (var i = 0; i < homeButtons.length; i++) {
    homeButtons[i].addEventListener("click", goToWelcomeModal);
}

var startFromRules = document.getElementById("rules-btn");

startFromRules.onclick = function() {
    rulesModal.style.display = "none";
    beginQuiz();
    showQuizContainer(); 
}
