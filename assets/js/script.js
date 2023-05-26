// VARIABLES
var vhsBtnEl = document.querySelector(".vhsBtn");
var timerEl = document.querySelector(".timer");
var questionEl = document.querySelector(".question");
var answerEl = document.querySelector(".answer");
var submitEl = document.querySelector("[type=submit]");
var startBtnEl = document.querySelector(".startBtn");
var quizIntroEl = document.querySelector("#quizIntro");
var index = 0;
var timeLeft = 10;
var currentQuestion = 0;
var alertEl = document.querySelector("#alert");
var presOptionsEl = document.querySelector(".presOptions");
var askQuestionEl = document.querySelector(".askQuestion");
var endGameEl = document.querySelector(".endGame");
var scoreEl = document.querySelector(".score");

var questions = [
  {
    question: "What is your name?",
    options: ["Sir Lancelot", "Sir Robin", "Sir Galahad", "Not Listed"],
    answer: "Not Listed",
  },
  {
    question: "What is your quest?",
    options: [
      "To seek the Holy Grail",
      "To pass this quiz",
      "To always be coding",
      "To be or not to be",
    ],
    answer: "To always be coding",
  },
  {
    question: "What is your favorite color?",
    options: [
      "Blue",
      "Blue... No Yellow",
      "A Duck",
      "All the colors of the rainbow",
    ],
    answer: "All the colors of the rainbow",
  },
  {
    question: "What is the capital of Assyria?",
    options: [
      "I don't know that",
      "Assur",
      "A shrubery",
      "Two halves of a coconut",
    ],
    answer: "Assur",
  },
  {
    question: "What is the air-speed velocity of an unladen swallow?",
    options: ["20mph", "30mph", "42", "She turned me into a newt"],
    answer: "20mph",
  },
  {
    question: "How did you become king then?",
    options: [
      "Some watery tart threw a sword at you",
      "Some moistened bint lobbed a scimitar at you",
      "The Lady of the Lake extended forth, Excalibur",
      "A strange woman lying in a pond",
    ],
    answer: "The Lady of the Lake extended forth, Excalibur",
  },
];

// FUNCTIONS
function startQuiz() {
  console.log("Started Quiz");
  // Hide intro and start button
  quizIntroEl.style.display = "none";
  // start timer
  var quizTimer = setInterval(function () {
    // display and start a countdown timer starting at 70 seconds when the start quiz button is clicked
    timeLeft = timeLeft - 1;
    timerEl.textContent = timeLeft;
    if (timeLeft < 0) {
      clearInterval(quizTimer);
      timerEl.textContent = "Time's Up!";
    }
    // if timer runs out, user is navigated to end of quiz.
  }, 1000);
  executeQuestions();

  function executeQuestions() {
    if (currentQuestion >= questions.length || timeLeft <= 0) {
      gameOver();
      return;
    }
    askQuestionEl.textContent = questions[currentQuestion].question; //shows the question
    presOptionsEl.textContent = ""; //Helps eliminate options already seen
    for (var i = 0; i < questions[currentQuestion].options.length; i++) {
      var li = document.createElement("li");
      li.className = "dynli";
      li.textContent = `${i + 1}. ${questions[currentQuestion].options[i]}`;
      li.setAttribute("data-value", questions[currentQuestion].options[i]);
      li.addEventListener("click", selectAnswer);
      presOptionsEl.appendChild(li);
      console.log(currentQuestion);
    }
  }
  //get answer
  function selectAnswer() {
    console.log(this.dataset.value); //console.logs the option chosen
    if (this.dataset.value === questions[currentQuestion].answer) {
      //if the option chosen is correct, it moves onto the next question and gives a correct answer alert
      currentQuestion++;
      alertEl.textContent = "The Holy Grail is almost yours!";
      executeQuestions();
    } else {
      // if the option chosen is incorrec, it moves on to the next question and gives an incorrect answer alert
      currentQuestion++;
      alertEl.textContent = "Fetchez la vache!";
      timeLeft = timeLeft - 10;
      executeQuestions();
    }
  }

  function gameOver() {
    clearInterval(quizTimer);
    timerEl.textContent = "Game over!";
    alertEl.textContent = "";
    askQuestionEl.textContent = "";
    presOptionsEl.textContent = "";
    endGameEl.style.visibility = "visible";
    endGameEl.style.height = "425px";
    var dynDivEl = document.querySelector(".dynDiv");
    dynDivEl.style.height = "0px";
    if (timeLeft > 0) {
      scoreEl.textContent = "Your score is " + timeLeft + "!";
    }

    var addSubmitBtn = $(".formSub");

    initialsFormEl = {
      initials: "",
      timeLeft: "",
    };

    printToTable();

    addSubmitBtn.on("click", function () {
      window.location = highScore.html;
      // Submits project form
      SubmitBtn.on("submit", function (e) {
        e.preventDefault();
        initialsFormEl.initials = $('input[name=""]').val();
        initialsFormEl.timeLeft = $('input[name=""]').val();
        localStorage.setItem("Form Info", JSON.stringify(initialsFormEl));
        $('input[name=""]').val("");
      });

      printToTable();

      function printToTable() {
        var storedScore = JSON.parse(localStorage.getItem("Form Info"));
        var newInitials = $("<td>");
        var newRow = $("<tr>");
        var newInitials = $("<td>");
        var newScore = $("<td>");
        newInitials.text(storedScore.initials);
        newScore.text(storedScore.timeLeft);

        newRow.append(newInitials);
        newRow.append(newScore);

        $("tbody").append(newRow);
      }
    });
  }
}

startBtnEl.addEventListener("click", startQuiz);
