const quiz = [
    {
        question: "Practice Question?",
        answers: [
            { text: "Answer1", correct: false},
            { text: "Answer2", correct: false},
            { text: "Answer3", correct: true},
            { text: "Answer4", correct: false},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let questionIndex = 0;
let playerScore = 0;