// ========== FUNKCJE "MODUŁOWE" ==========

// pobiera losowych bohaterów z SWAPI
async function fetchCharacters() {
  try {
    const randomPage = Math.floor(Math.random() * 9) + 1; // 9 stron postaci
    const res = await fetch(`https://swapi.dev/api/people/?page=${randomPage}`);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Błąd przy pobieraniu danych:", error);
    return [];
  }
}

// tworzy pytanie i opcje odpowiedzi
function generateQuestion(characters) {
  if (!characters.length) {
    return {
      question: "Nie udało się załadować danych z SWAPI 😢",
      correct: "",
      options: []
    };
  }

  const correct = characters[Math.floor(Math.random() * characters.length)];
  const options = [correct.name];

  while (options.length < 4) {
    const random = characters[Math.floor(Math.random() * characters.length)].name;
    if (!options.includes(random)) options.push(random);
  }

  options.sort(() => Math.random() - 0.5);

  const question = `Która postać ma wzrost ${correct.height} cm i kolor oczu ${correct.eye_color}?`;
  return { question, correct: correct.name, options };
}

// ========== GŁÓWNY KOD ==========

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next');

let score = 0;
let currentQuestion = null;

async function loadQuestion() {
  questionEl.textContent = "Ładowanie pytania...";
  answersEl.innerHTML = "";

  const characters = await fetchCharacters();
  currentQuestion = generateQuestion(characters);
  renderQuestion(currentQuestion);
}

function renderQuestion(q) {
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(answer) {
  if (answer === currentQuestion.correct) {
    score++;
    alert("✅ Poprawna odpowiedź!");
  } else {
    alert(`❌ Zła odpowiedź! Poprawna to: ${currentQuestion.correct}`);
  }
  scoreEl.textContent = `Wynik: ${score}`;
}

nextBtn.addEventListener("click", loadQuestion);

// Pierwsze pytanie:
loadQuestion();
