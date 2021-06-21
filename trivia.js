// Elementos creados para Html
let trivForm = document.getElementById("trivia");
let questionsContainer = document.getElementById("questionsContent");
let amount = document.getElementById("amount");
let categoria = document.getElementById("categoria");
let dificultad = document.getElementById("dificultad");
let type = document.getElementById("type");
let answers = document.getElementsByClassName("answer");

// variables globales
let score = 0;
let questions;
let qIndex = 0;
let correct_index_answer;
let correct_index;

// funciones 
let getAPIData = e => {
    e.preventDefault();
    let url = `https://opentdb.com/api.php?amount=${amount.value}&category=${categoria.value}&difficulty=${dificultad.value}&type=${type.value}`;
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data =>{
        questions = data.results;
        startGame();
    });

const startGame = () => {
    questionsContainer.style.display = "flex";
    trivForm.style.display = "none";
    console.log("Puntuacion", + score);
    if(qIndex > amount.value){
        showResultado();
        return;
    }else {

    // variable para controlar preguntas
    let manejoPre = questions[qIndex];
    document.getElementById("questionName").innerText = manejoPre.question;

       if(manejoPre.incorrect_answers.length == 1){
           document.getElementById("1").innerText = "True";
           document.getElementById("2").innerText = "False";
           document.getElementById("3").style.display= "none";
           document.getElementById("4").style.display= "none";
           if(manejoPre.correct_answer === "True") correct_index_answer = 1;
           else correct_index_answer = 2;
      
        }else{
           document.getElementById("1").style.display = "Block";
           document.getElementById("2").style.display = "block";
           document.getElementById("3").style.display = "block";
           document.getElementById("4").style.display = "block";

           correct_index_answer = Math.floor(Math.random() * 4) + 1;
           document.getElementById(correct_index_answer).innerText = manejoPre.correct_answer;
           console.log(correct_index_answer);
           let j = 0;
           for(let i = 1; i <= 4; i++){
               if(i === correct_index_answer) continue;
               document.getElementById(i).innerText = manejoPre.incorrect_answers[j];
               j++;
           }
       }
    }
}
};

let selectAnswer = id => {
    let answerId = id;
    console.log(answerId);
    if(answerId == correct_index_answer){
        score = score + 1;
        console.log("Respuesta correcta !");
    }else{
        console.log("Respuesta incorrecta");
    }
    console.log(qIndex == amount.value);
    if(qIndex < amount.value - 1){
        qIndex++;
    startGame();
    }else if(qIndex == amount.value - 1){
        showResultado(score);
    }
};
// for que recorre todos los botones

for(let i = 0 ; i < answers.length; i ++){
    const element = answers[i];
    element.addEventListener("click", () => selectAnswer(element.id));
    console.log(element.id);
}

const showResultado = () =>{
    questionsContainer.innerHTML = ""
    let score = document.createElement("p");
    score.innerText= `juego terminado, puntuacion: ${score}`
    let restartBtn = document.createElement("a");
    restartBtn.setAttribute("href", "index.html");

    questionsContainer.appendChild(score);
    questionsContainer.appendChild(restartBtn);
}
// listeners
trivForm.addEventListener("submit", getAPIData);
