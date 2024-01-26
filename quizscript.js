const questions = [
    {
        question: " Welke programmeertaal gebruik je om een website te maken?",
        answers: [
            { text: "WebsiteScript", correct: false },
            { text: "Code-taal", correct: false },
            { text: "HTML", correct: true },
            { text: "WebSpeak", correct: false },
        ]
    },
    {
        question: "Welke programmeertaal wordt vaak gebruikt voor het ontwikkelen van mobiele apps, zoals op Android- en iOS-platforms?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "Swift", correct: false },
            { text: "Ruby", correct: true },
        ]
    },
    {
        question: "Wat is de rol van HTML in webontwikkeling?",
        answers: [
            { text: "Stijldefinities", correct: false },
            { text: "Progameertaal voor back-end", correct: false },
            { text: "Databasequertytaal", correct: false },
            { text: "opmaaktaal voor het structureren van webinhoud", correct: true },
        ]
    },
    {
        question: "Wat betekent de afkorting 'API' in de context van softwareontwikkeling?",
        answers: [
            { text: "Applicatie Programmeer Interface", correct: false },
            { text: "Advanced Programming Interface", correct: true },
            { text: "Automated Processing Interface", correct: false },
            { text: "Application Processing Interface", correct: false },
        ]
    },
    {
        question: "Wat is een 'bug' in de computerwereld?",
        answers: [
            { text: "Een kriebelend insect in de computer", correct: false },
            { text: "Een fout in de code", correct: true },
            { text: "Een knop op het toetsenbord", correct: false },
            { text: "en soort computerprogramma", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
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

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
