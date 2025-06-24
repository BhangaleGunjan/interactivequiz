// script.js
const questionBank = [
  {
    question: "Which planet is known as the Red Planet?",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
    explanation: "Mars is called the Red Planet because of the iron oxide (rust) on its surface."
  },
  {
    question: "What is the capital of Japan?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/1024px-Skyscrapers_of_Shinjuku_2009_January.jpg",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    answer: "Tokyo",
    explanation: "Tokyo has been the capital of Japan since 1868."
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg",
    options: ["William Wordsworth", "William Shakespeare", "Jane Austen", "Charles Dickens"],
    answer: "William Shakespeare",
    explanation: "Shakespeare wrote 'Romeo and Juliet' in the late 16th century."
  },
  {
    question: "What is the chemical symbol for water?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Water_drop_001.jpg/1024px-Water_drop_001.jpg",
    options: ["H2O", "O2", "NaCl", "CO2"],
    answer: "H2O",
    explanation: "H2O represents two hydrogen atoms and one oxygen atom."
  },
  {
    question: "Which is the largest mammal?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg/1024px-Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg",
    options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    answer: "Blue Whale",
    explanation: "The Blue Whale is the largest known animal to have ever existed."
  },
  {
    question: "What is the square root of 64?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Nuvola_apps_edu_mathematics_blue-p.svg/1024px-Nuvola_apps_edu_mathematics_blue-p.svg.png",
    options: ["6", "7", "8", "9"],
    answer: "8",
    explanation: "8 × 8 = 64, so the square root of 64 is 8."
  },
  {
    question: "In which continent is the Sahara Desert located?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Libya_4985_Tadrart_Acacus_Luca_Galuzzi_2007.jpg/1024px-Libya_4985_Tadrart_Acacus_Luca_Galuzzi_2007.jpg",
    options: ["Asia", "Africa", "Australia", "South America"],
    answer: "Africa",
    explanation: "The Sahara Desert is located in North Africa."
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Aerial_view_of_the_Amazon_Rainforest.jpg/1024px-Aerial_view_of_the_Amazon_Rainforest.jpg",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide",
    explanation: "Plants use CO2 in photosynthesis to produce energy."
  },
  {
    question: "Who painted the Mona Lisa?",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
    options: ["Michelangelo", "Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci"],
    answer: "Leonardo da Vinci",
    explanation: "Leonardo da Vinci painted the Mona Lisa in the early 1500s."
  },
  {
    question: "What is the boiling point of water in Celsius?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Boilingkettle.jpg/800px-Boilingkettle.jpg",
    options: ["90°C", "95°C", "100°C", "105°C"],
    answer: "100°C",
    explanation: "At standard atmospheric pressure, water boils at 100°C."
  }
];

function getRandomQuestions(bank, count) {
  const shuffled = bank.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

let questions = getRandomQuestions(questionBank, 5);
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let timer;
let timeLeft = 15;

const quizForm = document.getElementById('quiz-form');
const submitBtn = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');
submitBtn.innerText = 'Next';

const timerDiv = document.createElement('div');
timerDiv.id = 'timer';
timerDiv.style.textAlign = 'center';
timerDiv.style.fontSize = '18px';
timerDiv.style.marginBottom = '10px';
resultDiv.before(timerDiv);

function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timerDiv.innerText = `Time Left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDiv.innerText = `Time Left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      submitBtn.click();
    }
  }, 1000);
}

function loadQuestion(index) {
  quizForm.innerHTML = '';
  resultDiv.innerText = '';
  const q = questions[index];

  const questionBlock = document.createElement('div');
  questionBlock.classList.add('question-block');

  if (q.image) {
    const img = document.createElement('img');
    img.src = q.image;
    img.alt = 'question image';
    img.style.maxWidth = '100%';
    img.style.borderRadius = '10px';
    img.style.marginBottom = '10px';
    questionBlock.appendChild(img);
  }

  const questionTitle = document.createElement('div');
  questionTitle.classList.add('question');
  questionTitle.innerText = `${index + 1}. ${q.question}`;
  questionBlock.appendChild(questionTitle);

  const options = document.createElement('div');
  options.classList.add('options');

  q.options.forEach(opt => {
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="radio" name="question${index}" value="${opt}"> ${opt}
    `;
    options.appendChild(label);
  });

  questionBlock.appendChild(options);
  quizForm.appendChild(questionBlock);
  startTimer();
}

submitBtn.addEventListener('click', function () {
  clearInterval(timer);
  const selected = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
  userAnswers.push(selected ? selected.value : null);
  if (selected && selected.value === questions[currentQuestionIndex].answer) {
    score++;
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion(currentQuestionIndex);
  } else {
    submitBtn.style.display = 'none';
    timerDiv.style.display = 'none';
    quizForm.innerHTML = '';
    resultDiv.innerText = `You scored ${score} out of ${questions.length} questions correctly.`;
    showOptionsAfterQuiz();
  }
});

function showOptionsAfterQuiz() {
  const buttonContainer = document.createElement('div');
  buttonContainer.style.textAlign = 'center';
  buttonContainer.style.marginTop = '20px';

  const reviewBtn = document.createElement('button');
  reviewBtn.textContent = 'Review Answers';
  reviewBtn.className = 'review-btn';

  const restartBtn = document.createElement('button');
  restartBtn.textContent = 'Start New Quiz';
  restartBtn.className = 'restart-btn';

  buttonContainer.appendChild(reviewBtn);
  buttonContainer.appendChild(restartBtn);
  resultDiv.after(buttonContainer);

  reviewBtn.addEventListener('click', showReview);
  restartBtn.addEventListener('click', restartQuiz);
}

function showReview() {
  quizForm.innerHTML = '';
  resultDiv.innerText = 'Review Answers:';

  questions.forEach((q, i) => {
    const block = document.createElement('div');
    block.classList.add('question-block');

    const question = document.createElement('div');
    question.classList.add('question');
    question.innerText = `${i + 1}. ${q.question}`;
    block.appendChild(question);

    const userAns = userAnswers[i];
    const correctAns = q.answer;
    const explanation = q.explanation || '';

    const answer = document.createElement('div');
    if (userAns === correctAns) {
      answer.innerHTML = `✅ Your Answer: <strong>${userAns}</strong>`;
    } else {
      answer.innerHTML = `❌ Your Answer: <strong style="color:red">${userAns || 'No answer'}</strong><br>✅ Correct Answer: <strong style="color:green">${correctAns}</strong><br>🧠 ${explanation}`;
    }
    block.appendChild(answer);
    quizForm.appendChild(block);
  });

  document.querySelectorAll('.review-btn').forEach(btn => btn.remove());
}

function restartQuiz() {
  questions = getRandomQuestions(questionBank, 5);
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  submitBtn.style.display = 'inline-block';
  timerDiv.style.display = 'block';
  resultDiv.innerText = '';
  quizForm.innerHTML = '';
  document.querySelectorAll('.restart-btn').forEach(btn => btn.remove());
  loadQuestion(currentQuestionIndex);
}

loadQuestion(currentQuestionIndex);
