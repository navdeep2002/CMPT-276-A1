// Define your quiz questions and answers
const quizData = [
    {
        question: "1.) What is the opposite of hot?",
        options: ["Warm", "Cold", "Steaming", "Dog"],
        correctAnswer: "Cold"
    },
    {
        question: "2.) Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Neptune", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "3.) What is the largest mammal on Earth?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Dolphin"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "4.) What is the capital of Japan?",
        options: ["Beijing", "Madrid", "Tokyo", "Mumbai"],
        correctAnswer: "Tokyo"
    },
    {
        question: "5.) What is the capital of France?",
        options: ["Paris", "Madrid", "Berlin", "Rome"],
        correctAnswer: "Paris"
    },
    // Add more questions as needed
];

let currentQuestion = 0;
let userAnswers = [];

//show questions and options at the start of
displayQuestion();
function displayQuestion(){
    const questionContainer = document.getElementById("question-container");
    const currentQuizData = quizData[currentQuestion];

    questionContainer.innerHTML = `
        <h2>${currentQuizData.question}</h2>
        <form id="options-form">
            ${currentQuizData.options.map(option => `
                <label>
                    <input type="radio" name="answer" value="${option}" onclick="selectAnswer('${option}')" ${userAnswers[currentQuestion] === option ? 'checked' : ''}>
                    ${option}
                </label>
            `).join('')}
        </form>
    `;
}

updateSubmitButton();
function updateSubmitButton(){
    const submitButton = document.getElementById("submit-button");
    if(currentQuestion === quizData.length - 1){
        submitButton.innerHTML = "Submit";
    }else{
        submitButton.innerHTML = "Next";
    }
}


function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const currentQuizData = quizData[currentQuestion];

    questionContainer.innerHTML = `
        <h2>${currentQuizData.question}</h2>
        <form id="options-form">
            ${currentQuizData.options.map(option => `
                <label>
                    <input type="radio" name="answer" value="${option}" onclick="selectAnswer('${option}')">
                    ${option}
                </label>
            `).join('')}
        </form>
    `;
}


function prevQuestion() {
    currentQuestion--; // Decrement the current question index

    // Check if the current question index is out of bounds
    if (currentQuestion < 0) {
        currentQuestion = 0; // Set the current question index to the first question
    }

    displayQuestion(); // Display the previous question
}

function nextQuestion() {
    if (userAnswers[currentQuestion]) {
        currentQuestion++;
        if (currentQuestion === quizData.length) {
            showResults();
        } else {
            loadQuestion();
        }
    } else {
        alert("Please select an answer before moving to the next question.");
    }
}


function selectAnswer(answer) {
    userAnswers[currentQuestion] = answer;
    // Add feedback logic if desired (e.g., highlighting selected answer)
    const selectedOption = document.querySelector(`#options-form label input[value='${answer}']`);
    selectedOption.parentNode.classList.add("selected"); // Add a selected class for styling
}

function submitQuiz() {
    if (userAnswers.every(answer => answer !== undefined)) {
        showResults();
    } else {
        alert("Please answer all questions before submitting.");
    }
}


function showResults() {
    const resultsContainer = document.getElementById("results-container");
    let score = 0;

    let resultHTML = ""; // Variable to store the HTML for displaying results

    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;

        if (isCorrect) {
            score++;
        }

        // Build the HTML for displaying the question, correct answer, and user's answer
        resultHTML += `
            <div>
                <h3>Question ${index + 1}</h3>
                <p>Question: ${question.question}</p>
                <p>Correct Answer: ${question.correctAnswer}</p>
                <p>Your Answer: ${userAnswer}</p>
            </div>
        `;
    });

    // Display the overall score and the results for each question
    resultsContainer.innerHTML = `
        <h2>Your Score: ${score} out of ${quizData.length}</h2>
        ${resultHTML}
    `;
    resultsContainer.style.display = "block";
}
