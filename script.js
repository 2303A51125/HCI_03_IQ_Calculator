// Define a large pool of easy and tough questions
const easyQuestions = [
    { text: "What is 2 + 2?", correctAnswer: 4 },
    { text: "What color is the sky on a clear day?", correctAnswer: "blue" },
    { text: "What comes after the number 3?", correctAnswer: 4 },
    { text: "How many legs does a spider have?", correctAnswer: 8 },
    { text: "What is 10 divided by 2?", correctAnswer: 5 },
    { text: "What shape is a stop sign?", correctAnswer: "octagon" },
    { text: "What is 7 + 3?", correctAnswer: 10 },
    { text: "How many days are there in a week?", correctAnswer: 7 },
    { text: "What is 5 times 2?", correctAnswer: 10 },
    { text: "What is the first letter of the alphabet?", correctAnswer: "a" }
  ];
  
  const toughQuestions = [
    { text: "What is the square root of 256?", correctAnswer: 16 },
    { text: "Solve: (8 * 5) + 12 - 4", correctAnswer: 48 },
    { text: "If a train travels at 80 km/h for 2.5 hours, how far does it go?", correctAnswer: 200 },
    { text: "How many sides does a dodecagon have?", correctAnswer: 12 },
    { text: "What is the 10th Fibonacci number?", correctAnswer: 55 },
    { text: "What is the cube root of 27?", correctAnswer: 3 },
    { text: "If a car's speed is 60 km/h, how long does it take to travel 90 km?", correctAnswer: 1.5 },
    { text: "What is 15% of 200?", correctAnswer: 30 },
    { text: "Solve: 144 ÷ 12 + 7", correctAnswer: 19 },
    { text: "How many prime numbers are there between 1 and 20?", correctAnswer: 8 }
  ];
  
  // DOM elements
  const ageForm = document.getElementById("age-form");
  const ageInput = document.getElementById("age");
  const quizForm = document.getElementById("quiz-form");
  const questionsContainer = document.getElementById("questions-container");
  const resultSection = document.getElementById("result-section");
  const quizSection = document.getElementById("quiz-section");
  const ageSection = document.getElementById("age-section");
  const resultDisplay = document.getElementById("result");
  const retryButton = document.getElementById("retry-btn");
  
  // Function to shuffle and pick 10 random questions
  function getRandomQuestions(questionsPool, count = 10) {
    return questionsPool.sort(() => Math.random() - 0.5).slice(0, count);
  }
  
  // Start quiz based on age
  document.getElementById("start-btn").addEventListener("click", () => {
    const age = parseInt(ageInput.value);
    if (isNaN(age) || age < 1) {
      alert("Please enter a valid age.");
      return;
    }
  
    // Show a waiting message
    ageSection.innerHTML = "<h2>Please wait... Preparing your quiz!</h2>";
  
    // Set a 3-second delay before showing the quiz
    setTimeout(() => {
      // Select appropriate question pool and get 10 random questions
      const selectedQuestions = age < 18 ? getRandomQuestions(easyQuestions) : getRandomQuestions(toughQuestions);
  
      // Dynamically create questions
      questionsContainer.innerHTML = ""; // Clear previous questions
      selectedQuestions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.innerHTML = `
          <label for="q${index}">${question.text}</label>
          <input type="text" id="q${index}" name="q${index}" required>
        `;
        questionsContainer.appendChild(questionDiv);
      });
  
      // Store the selected questions for grading
      quizForm.dataset.questions = JSON.stringify(selectedQuestions);
  
      // Show quiz section
      ageSection.style.display = "none";
      quizSection.style.display = "block";
    }, 3000); // 3 seconds
  });
  
  // Calculate IQ and show feedback
  document.getElementById("submit-btn").addEventListener("click", () => {
    const selectedQuestions = JSON.parse(quizForm.dataset.questions);
  
    let score = 0;
    let feedback = ""; // To store feedback on incorrect answers
  
    selectedQuestions.forEach((question, index) => {
      const userAnswer = document.getElementById(`q${index}`).value;
      const correctAnswer = question.correctAnswer.toString().toLowerCase();
      const userAnswerLower = userAnswer.toString().toLowerCase();
  
      if (userAnswerLower === correctAnswer) {
        score += 100 / selectedQuestions.length;
      } else {
        feedback += `<p><strong>Q${index + 1}:</strong> ${question.text}<br> 
                     <strong>Your Answer:</strong> ${userAnswer || "No answer"}<br> 
                     <strong>Correct Answer:</strong> ${question.correctAnswer}</p>`;
      }
    });
  
    // Determine performance level based on score
    let performanceMessage = "";
    if (score >= 90) {
      performanceMessage = "Master";
    } else if (score >= 75) {
      performanceMessage = "Perfect";
    } else if (score >= 50) {
      performanceMessage = "Excellent";
    } else {
      performanceMessage = "Good";
    }
  
    // Display result, performance, and feedback
    resultDisplay.innerHTML = `
      <p>Your IQ Score: <strong>${Math.round(score)}</strong></p>
      <p>Performance Level: <strong>${performanceMessage}</strong></p>
      ${feedback ? `<h3>Incorrect Answers:</h3>${feedback}` : "<p>Great job! You answered all questions correctly!</p>"}
    `;
  
    quizSection.style.display = "none";
    resultSection.style.display = "block";
  });
  
  // Retry button to reset
  retryButton.addEventListener("click", () => {
    ageForm.reset();
    quizForm.reset();
    location.reload(); // Reload the page to reset everything
  });
  