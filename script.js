const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const  nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');

//Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin","padding","border-radius","border-collapse"],
        answer:"border-collapse"
    },
    {
        question: "Q. Which of the following is not a operator in JavaScript?",
        choices: ["logical operator", "assignment operator", "array", "comparison operator"],
        answer:"array"
    },
    {
        question: "Q. Which of the following is not a JavaScript Data type?",
        choices: ["string", "boolean", "object", "float"],
        answer:"float"
    },
    {
        question: "Q. Which of the following is not a array method?",
        choices: ["push()", "unshift()", "pop()", "string()"],
        answer:"string()"
    }
];

//Making variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;

//Arrow function to show questions
const showQuestions = () => {
    // console.log('question');
    const questionDetails = quiz[currentQuestionIndex];
    // console.log(questionDetails);
    questionBox.textContent = questionDetails.question;
    

    choicesBox.textContent = "";
    for(let i = 0; i < questionDetails.choices.length; i++){
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', ()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }else{
                choiceDiv.classList.add('selected');
            }
        })
    }

}

//Function to check answer
const checkAnswer = () => {
const selectedChoice = document.querySelector('.choice.selected');
// console.log(selectedChoice);
if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
    // alert('Correct Answer!');
    displayAlert("Correct Answer!");
    score++;
}else{
    // alert('Wrong Answer!');
    displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
}
currentQuestionIndex++;
 if(currentQuestionIndex < quiz.length){
        showQuestions();
    }else{
        showScore();
        quizOver = true;
    }
}
//Function to score
const showScore = ()=>{
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    // nextBtn.addEventListener('click',()=>{
    //     currentQuestionIndex = 0;
    //     showQuestions();
    //     nextBtn.textContent = "Next";
    //     scoreCard.textContent = "";
    // });
}

//Function to show alert
const displayAlert = (msg) =>{
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000)
}
showQuestions();
nextBtn.addEventListener('click', ()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        // alert("Select your answer");
        displayAlert("Select Your Answer!");
        return;
    }
    if(quizOver){
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        showQuestions();
        quizOver = false;
        score = 0;
    }
    else{

        checkAnswer(); 
    }
   
});