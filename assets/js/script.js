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
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let questionIndex = 0;
let playerScore = 0;

function beginQuiz(){
    questionIndex = 0;
    playerScore = 0;
    nextButton.innerHTML = "Next";
    displayQuestion();
}

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
}


function clearAnswer(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

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


beginQuiz();