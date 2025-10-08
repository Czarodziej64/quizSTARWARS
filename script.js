let pytanie = document.getElementById("question");
let odpowiedzi = document.getElementById("answers");
let wynik = document.getElementById("score");
let przycisk = document.getElementById("next");

let punkty = 0;
let poprawna = "";

async function pobierzPostacie() {
  let losowaStrona = Math.floor(Math.random() * 9) + 1;
  let dane = await fetch("https://swapi.dev/api/people/?page=" + losowaStrona);
  let json = await dane.json();
  return json.results;
}

function stworzPytanie(postacie) {
  let wylosowana = postacie[Math.floor(Math.random() * postacie.length)];
  poprawna = wylosowana.name;

  let mozliwe = [poprawna];
  while (mozliwe.length < 4) {
    let inna = postacie[Math.floor(Math.random() * postacie.length)].name;
    if (!mozliwe.includes(inna)) {
      mozliwe.push(inna);
    }
  }

  mozliwe.sort(() => Math.random() - 0.5);
  pytanie.textContent = "Która postać ma wzrost " + wylosowana.height + " cm i kolor oczu " + wylosowana.eye_color + "?";

  odpowiedzi.innerHTML = "";
  for (let i = 0; i < mozliwe.length; i++) {
    let b = document.createElement("button");
    b.textContent = mozliwe[i];
    b.addEventListener("click", function () {
      sprawdzOdpowiedz(mozliwe[i]);
    });
    odpowiedzi.appendChild(b);
  }
}

async function zaladujPytanie() {
  let postacie = await pobierzPostacie();
  stworzPytanie(postacie);
}

function sprawdzOdpowiedz(odpowiedz) {
  if (odpowiedz == poprawna) {
    alert(" Dobrze!");
    punkty++;
  } else {
    alert(" Źle! Poprawna odpowiedź to: " + poprawna);
  }
  wynik.textContent = "Wynik: " + punkty;
  zaladujPytanie();
}

przycisk.addEventListener("click", zaladujPytanie);
zaladujPytanie();
