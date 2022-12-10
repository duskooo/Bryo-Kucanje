word = document.getElementById('word')
text = document.getElementById('text')
scoreEl = document.getElementById('score')
timeEl = document.getElementById('time')
endgameEl = document.getElementById('end-game-container')
difficultySelect=document.getElementById("difficulty")

// lista reči za brzo prekucavanje
// https://randomwordgenerator.com/
words = [
  'finish',
  'glance',
  'broadcast',
  'conceive',
  'exaggerate',
  'astonishing',
  'speculate',
  'behavior',
  'progress',
  'inject',
  'acquisition',
  'advertising',
  'dangerous',
  'education',
  'face',
  'spend',
  'simplicity',
  'bean',
  'exploit',
  'unit'
]
difficulty="medium"
// za čuvanje nasumično odabrane reči
randomWord = ''

// za čuvanje trenutnog rezultata
score = 0

// za čuvanje preostalog vremena
time = 10

// započinjemo sa odbrojavanjem vremena, i to
// svake sekunde (1000 milisekundi) pozivamo updateTime funkciju
timeInterval = setInterval(updateTime, 1000)

// funkcija za generisanje nasumične reči (iz postojećeg niza reči)
function getRandomWord() {
  // Math.random() nam vraća decimalni broj između 0 i 1 (ne uključujući 1)
  // Math.floor() zaokružuje decimalni broj na prvi manji ceo broj (npr. 3.517 -> 3)
  randomNum = Math.floor(Math.random() * words.length)
  // dohvatamo reč iz niza putem nasumičnog broja
  return words[randomNum]
}

// funkcija za postavljanje nasumične reči u okviru stranice
function placeRandomWord() {
  randomWord = getRandomWord()
  word.innerText = randomWord
}

// funkcija za povećavanje rezultata
function updateScore() {
  score++
  scoreEl.innerText = score
}

// funkcija za umanjivanje preostalog vremena
function updateTime() {
  time--

  // ispiši preostalo vreme (npr. 9s)
  timeEl.innerText = time + 's'

  // proveri da li je kraj igre
  if (time == 0) {
    // u slučaju da jeste prekini dalje odbrojavanje vremena
    clearInterval(timeInterval)
    // i prikaži konačan rezultat
    gameOver()
  }
}

// funkcija za prikaz kraja igre
function gameOver() {
  // ispisujemo konačan rezultat, uz mogućnost ponovne igre
  // location.reload() se ponaša identično kao osveživanje stranice u pretraživaču
  endgameEl.innerHTML = `
    <h1>Vreme je isteklo</h1>
    <p>Vaš finalni rezultat je ${score}</p>
    <button onclick="location.reload()">Probajte ponovo</button>
  `

  // kontejner više nije nevidljiv
  endgameEl.style.display = 'flex'
}

// na samom početku, postavljamo neku od nasumično odabranih reči
placeRandomWord()

// ukoliko nad tekstualnim input poljem detektujemo dodir taster (bilo kojeg - input)
text.addEventListener('input', e => {
  // reč koju je korisnik ukucao dohvatamo na sledeći način
  // alert(e.target.value)
  insertedText = e.target.value

  // ispitujemo da li je uneta rač zapravo i tražena reč
  if (insertedText == randomWord) {
    // u slučaju da jeste postavićemo novu reč i povećaćemo rezultat
    placeRandomWord()
    updateScore()

    // očistićemo input polje kako bi korisnik odmah mogao da pređe na prekucavanje druge reči
    text.value = ''

    time += 3 // povećaćemo vreme usled uspešno pogođene reči (npr. za 3)
    updateTime() // pozvaćemo ručno updateTime kako bi se novo vreme odmah i prikazalo na ekranu
  }
})