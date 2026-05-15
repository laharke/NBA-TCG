function decodeAnswer(encoded){
    return atob(encoded)
}

let game = {
    selectedCard: null,
    selectedCardText: null,
    questions: [],
    currentQuestion: 0,
    score: 0,
    timer: null
}

function api(){
    loadQuestions().then(() => {

        console.log(game.questions)

        game.questions.forEach(element => {
            console.log(element)
            console.log(decodeAnswer(element.answer))
        });

    });
}

function startGame(){

    cardId = $("#cardToBetOffline").val()
    selectedOption = document.getElementById("cardToBetOffline");
    cardText = selectedOption.options[selectedOption.selectedIndex].text;

    game.selectedCardText = cardText;

    if(!confirm("You are about to bet " + cardText + " card. Are you sure?")){
        return;
    }
    game.selectedCard = cardId
    
    // Escondo select card y muestro la game screen.
    document.getElementById("screen-select-card").style.display = "none";
    document.getElementById("screen-game").style.display = "block";

    
    // Start timer, questions, and shit. 
    // Si loadeo las questions creo eu tengo qeu ahcer el loadquestion.then()
    // Quen o me copa mucho pero bueno

    loadQuestions().then(() => {
        console.log(game);
        
        // Aca iria la logica del game?
        // Un loop por las questions ya no ahrdcore.
        //showQuestion
        //showTimer
        showQuestion()
        
    });

}


async function loadQuestions() {
    const res = await fetch("/get_questions_api/10/")
    game.questions = await res.json()
}


function showQuestion() {

    let q = game.questions[game.currentQuestion]

    document.getElementById("question").innerText = q.question

    let optionsHtml = ""

    q.options.forEach(option => {
        optionsHtml += `<button onclick="answer('${option}')">${option}</button>`
    })

    document.getElementById("options").innerHTML = optionsHtml

    startTimer()
}

function startTimer() {

    let time = 10

    game.timer = setInterval(() => {

        document.getElementById("timer").innerText = time

        time--

        if(time < 0){
            clearInterval(game.timer)
            nextQuestion()
        }

    },1000)
}


function answer(selectedOption){

    clearInterval(game.timer);

    correctAnswer = decodeAnswer(game.questions[game.currentQuestion].answer);
   
    if(selectedOption === correctAnswer){
        game.score++
    }

    nextQuestion()
}

function nextQuestion(){

    game.currentQuestion++

    if(game.currentQuestion >= game.questions.length){
        finishGame()
        return
    }

    showQuestion()
}

function finishGame(){

    document.getElementById("screen-game").style.display = "none"
    document.getElementById("screen-result").style.display = "block"

    if (game.score >= 7){
        // Aca podria hacer que se agrege la CARTA que te dan, necseiot una API que te deuvle una random CARD.
        resultText = "Congratulations! You won! Heres the card you won: ";
    }else{
        resultText = "Oh no, you lost! Your " + game.selectedCardText + " is gone.";
    }


    document.getElementById("result-text").innerText = "Score: " + game.score + "/10" + '\n' + resultText;

    // Abajo de esto tengo que hacer un api request a una case que agregre o saque la carta que gano o perdió.
    // Que sea uno solo y haga las dos cosas.


}