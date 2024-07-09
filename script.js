const questions = [
    {
        question: "What is 2 + 2?",
        correctAnswer: "4",
        answers: ["4", "5", "3", "6"]
    },
    {
        question: "What is the capital of France?",
        correctAnswer: "Paris",
        answers: ["Paris", "London", "Berlin", "Madrid"]
    },
    {
        question: "What is the largest planet in our solar system?",
        correctAnswer: "Jupiter",
        answers: ["Earth", "Jupiter", "Mars", "Saturn"]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        correctAnswer: "Harper Lee",
        answers: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"]
    },
    {
        question: "What is the chemical symbol for water?",
        correctAnswer: "H2O",
        answers: ["O2", "H2O", "CO2", "H2"]
    },
    {
        question: "What is the fastest land animal?",
        correctAnswer: "Cheetah",
        answers: ["Lion", "Cheetah", "Elephant", "Gazelle"]
    },
    {
        question: "What is the capital of Japan?",
        correctAnswer: "Tokyo",
        answers: ["Tokyo", "Kyoto", "Osaka", "Nagoya"]
    },
    {
        question: "Who painted the Mona Lisa?",
        correctAnswer: "Leonardo da Vinci",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"]
    },
    {
        question: "What is the square root of 64?",
        correctAnswer: "8",
        answers: ["6", "7", "8", "9"]
    },
    {
        question: "What is the capital of Australia?",
        correctAnswer: "Canberra",
        answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

const questionSection = document.getElementById("questionSection");
const questionElement = document.getElementById("questions");
const answerButtonsElement = document.getElementById("answer-btns");
const timerElement = document.getElementById("time");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionSection.classList.remove('hide');
    scoreContainer.classList.add('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        if (answer === question.correctAnswer) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    timeLeft = 10;
    clearInterval(timerInterval);
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });
    clearInterval(timerInterval);
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setNextQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function startTimer() {
    timerElement.innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                setNextQuestion();
            } else {
                endQuiz();
            }
        }
    }, 1000);
}

function endQuiz() {
    questionSection.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = `Your score: ${score}`;
}

restartButton.addEventListener('click', startQuiz);

startQuiz();
