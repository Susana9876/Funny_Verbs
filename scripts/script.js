const test = document.getElementById('pruebas');

// Para mostrar los verbos
const showVerb = document.getElementById("showVerb");
const showImage = document.getElementById("showImage");
const showAudio = document.getElementById("showAudio");

// Complementos
const next = document.getElementById("next");
const verbsCounter = document.getElementById("verbs-counter");
const allRightCounter = document.getElementById("all-right-answers");
const verbsContainer = document.getElementById("verbs-container");
// Responder
const first = document.getElementById("first-verb");
const second = document.getElementById("second-verb");
const third = document.getElementById("third-verb");
const fourth = document.getElementById("fourth-verb");

// Contar verbos
const numberOfVerbs = verbs.length;
// Una respuesta correcta y tres incorrectas
let answerRoullete = [0,1,1,1];

let everyNumberOfVerbs = [];

let rightAnswer; // Respuesta correcta
let rightAnswersCounter = 0; // Contador de respuestas

// SVG starter play button listener
next.addEventListener("click",function(){
  ponerVerbo();
  next.style.display = 'none';
});

// Lista aleatoria
makeRandomList();
// Empezar en la última posición
let lastPosition = everyNumberOfVerbs.length-1;

function makeRandomList(){
  // Mismos elementos que verbos
  for (var i = 0; i < numberOfVerbs; i++){
    everyNumberOfVerbs.push(i);
  }
  // Mezclar verbos
  everyNumberOfVerbs = everyNumberOfVerbs.sort(() => Math.random() - 0.5);
}


// Botones de respuesta

function buttonEffect(itsRight,button){
  if (itsRight){
    button.classList.add('rightAnswer');
    setTimeout(function(){
      button.classList.remove('rightAnswer');
    },1000);
    rightAnswersCounter = rightAnswersCounter+1;
  }else{
    button.classList.add('wrongAnswer');
    setTimeout(function(){
      button.classList.remove('wrongAnswer');
    },1000);
  }
  setTimeout(function(){
    ponerVerbo();
  },500);
}

// Primer botón
first.addEventListener("click",function(){
  buttonEffect(isItRight_(first.innerHTML),this);
});

// Segundo botón
second.addEventListener("click", function(){
  buttonEffect(isItRight_(second.innerHTML),this);
});

// Tercer botón
third.addEventListener("click", function(){
  buttonEffect(isItRight_(third.innerHTML),this);
});

// Cuarto botón
fourth.addEventListener("click", function(){
  buttonEffect(isItRight_(fourth.innerHTML),this);
});



// Diferentes opciones de respuesta
function shuffleAnswers(array) {
  let numberOfAnswerButtons = array.length;
  let randomIndex;

  // Por si hay más elementos
  while (numberOfAnswerButtons != 0) {

    // Elemento restante
    randomIndex = Math.floor(Math.random() * numberOfAnswerButtons);
    numberOfAnswerButtons--;
    // Cambiar
    [array[numberOfAnswerButtons], array[randomIndex]] = [
    array[randomIndex], array[numberOfAnswerButtons]];
  }

  return array;
}


// Respuesta correcta
function isItRight_(answer){
  return answer==rightAnswer?true:false;
}

// Respuesta incorrecta
function randomVerbo(notThisOne){
  theOne = Math.floor(Math.random()*verbos.length);

  return theOne == notThisOne?randomVerbo(notThisOne):theOne;
}

function ponerVerbo(){

  // Cambiar las respuestas cada vez
  answerRoullete = shuffleAnswers(answerRoullete);

  let randomPosition = everyNumberOfVerbs[lastPosition];
  let imgText = "<img src='assets/img/"+verbs[randomPosition]+".jpg' height:'140px' width='100px'>";

  // Estilo de botones
  first.classList.add("btn","btn-outline-primary","btn-md");
  second.classList.add("btn","btn-outline-primary","btn-md");
  third.classList.add("btn","btn-outline-primary","btn-md");
  fourth.classList.add("btn","btn-outline-primary","btn-md");

  if (lastPosition >= 0){
    var just_position = lastPosition+1;
    verbsCounter.innerHTML = ""+just_position+" / "+numberOfVerbs;
    allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
    showVerb.innerHTML = verbs[randomPosition];
    showImage.innerHTML = imgText;

    showAudio.src = "assets/audio/"+verbs[randomPosition]+".mp3";
    showAudio.play();

    first.innerHTML = !answerRoullete[0]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    second.innerHTML = !answerRoullete[1]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    third.innerHTML = !answerRoullete[2]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    fourth.innerHTML = !answerRoullete[3]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];

    rightAnswer = verbos[randomPosition];
    lastPosition =lastPosition - 1;
  }else{
    // Terminación
    verbsCounter.innerHTML = "0 / "+numberOfVerbs;
    allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
    showVerb.innerHTML = "Thank you !";

    //Ocultar
    verbsContainer.innerHTML = "";
  }
}

