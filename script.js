// Array of quiz questions
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", submitQuiz);

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Render questions to the screen
const questionsElement = document.getElementById("questions");

// Function to load quiz and display selected answers from session storage
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    // Display the question text
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    // Create radio buttons for each choice
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Check if the user has already selected this option (from session storage)
      const storedAnswer = sessionStorage.getItem(`question-${i}`);
      if (storedAnswer === choice) {
        choiceElement.setAttribute("checked", true);
      }

      // Display the choice text next to the radio button
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

// Save user's selected answers in session storage
function saveProgress() {
  const inputs = document.querySelectorAll("input[type=radio]:checked");
  inputs.forEach((input) => {
    const name = input.getAttribute("name");
    const value = input.getAttribute("value");
    sessionStorage.setItem(name, value);
  });
}

// Calculate the user's score
function submitQuiz() {
  saveProgress(); // Ensure all selections are saved
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const storedAnswer = sessionStorage.getItem(`question-${i}`);
    if (storedAnswer === questions[i].answer) {
      score++;
    }
  }

  // Display the score on the page
  const resultElement = document.getElementById("result");
  resultElement.innerText = `Your score is ${score} out of 5.`;

  // Store the score in localStorage
  localStorage.setItem("score", score);
}

// Attach event listeners
document.body.addEventListener("change", saveProgress);

// Load the quiz when the page loads
window.onload = renderQuestions;
