
// =====================================
// QUIZNOVA ULTIMATE - script.js
// =====================================

// =========================
// GLOBAL VARIABLES
// =========================

let student = {};

let currentSubject = "";

let currentLevel = "";

let currentQuestions = [];

let currentQuestionIndex = 0;

let score = 0;

let timer;

let timeLeft = 15;


// =========================
// SAVE STUDENT DETAILS
// =========================

function saveStudentDetails() {

    // GET VALUES

    const name =
        document.getElementById("studentName")
        .value.trim();

    const usn =
        document.getElementById("studentUSN")
        .value.trim();

    const roll =
        document.getElementById("studentRoll")
        .value.trim();

    const email =
        document.getElementById("studentEmail")
        .value.trim();

    const phone =
        document.getElementById("studentPhone")
        .value.trim();


    // =========================
    // EMPTY VALIDATION
    // =========================

    if (
        name === "" ||
        usn === "" ||
        roll === "" ||
        email === "" ||
        phone === ""
    ) {

        alert("⚠️ Please fill all fields");

        return;
    }


    // =========================
    // NAME VALIDATION
    // =========================

    const nameRegex = /^[A-Za-z ]{3,30}$/;

    if (!nameRegex.test(name)) {

        alert(
            "⚠️ Name should contain only alphabets"
        );

        return;
    }


    // =========================
    // USN VALIDATION
    // =========================

    const usnRegex = /^[A-Za-z0-9]{5,20}$/;

    if (!usnRegex.test(usn)) {

        alert(
            "⚠️ Enter valid USN"
        );

        return;
    }


    // =========================
    // ROLL VALIDATION
    // =========================

    const rollRegex = /^[0-9]{1,5}$/;

    if (!rollRegex.test(roll)) {

        alert(
            "⚠️ Roll number should contain only digits"
        );

        return;
    }


    // =========================
    // EMAIL VALIDATION
    // =========================

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        alert(
            "⚠️ Enter valid email address"
        );

        return;
    }


    // =========================
    // PHONE VALIDATION
    // =========================

    const phoneRegex = /^[6-9][0-9]{9}$/;

    if (!phoneRegex.test(phone)) {

        alert(
            "⚠️ Enter valid 10 digit mobile number"
        );

        return;
    }


    // =========================
    // SAVE DATA
    // =========================

    student = {

        name: name,

        usn: usn,

        roll: roll,

        email: email,

        phone: phone

    };


    // =========================
    // SUCCESS
    // =========================

    alert(
        "✅ Student Details Verified Successfully"
    );


    // PAGE SWITCH

    document.getElementById("login-page")
        .classList.add("hidden");

    document.getElementById("subject-page")
        .classList.remove("hidden");

}



// =========================
// OPEN LEVEL PAGE
// =========================

function openLevels(subject) {

    currentSubject = subject;

    document.getElementById("subject-page")
        .classList.add("hidden");

    document.getElementById("level-page")
        .classList.remove("hidden");

    document.getElementById("selectedSubject")
        .innerText = subject;

}



// =========================
// START QUIZ
// =========================

function startQuiz(level) {

    currentLevel = level;

    currentQuestions =
        quizData[currentSubject][level];

    currentQuestionIndex = 0;

    score = 0;


    document.getElementById("level-page")
        .classList.add("hidden");

    document.getElementById("quiz-page")
        .classList.remove("hidden");


    document.getElementById("quizSubject")
        .innerText =
        currentSubject +
        " - " +
        level.toUpperCase();


    loadQuestion();

}



// =========================
// LOAD QUESTION
// =========================

function loadQuestion() {

    clearInterval(timer);

    timeLeft = 15;

    startTimer();


    let question =
        currentQuestions[currentQuestionIndex];


    document.getElementById("questionText")
        .innerText = question.q;


    let container =
        document.getElementById("optionsContainer");

    container.innerHTML = "";


    question.options.forEach((option, index) => {

        let button =
            document.createElement("button");

        button.className = "option-btn";

        button.innerText = option;


        button.onclick = () =>
            checkAnswer(index, button);


        container.appendChild(button);

    });


    document.getElementById("nextBtn")
        .classList.add("hidden");


    updateProgress();

}



// =========================
// CHECK ANSWER
// =========================

function checkAnswer(selected, button) {

    clearInterval(timer);

    let correct =
        currentQuestions[currentQuestionIndex]
        .answer;


    let buttons =
        document.querySelectorAll(".option-btn");


    buttons.forEach(btn => {

        btn.disabled = true;

    });


    if (selected === correct) {

        button.classList.add("correct");

        score++;

    }

    else {

        button.classList.add("wrong");

        buttons[correct]
            .classList.add("correct");

    }


    document.getElementById("nextBtn")
        .classList.remove("hidden");

}



// =========================
// NEXT QUESTION
// =========================

function nextQuestion() {

    currentQuestionIndex++;


    if (
        currentQuestionIndex <
        currentQuestions.length
    ) {

        loadQuestion();

    }

    else {

        showResult();

    }

}



// =========================
// UPDATE PROGRESS BAR
// =========================

function updateProgress() {

    let progress =

        (
            (currentQuestionIndex + 1)
            /
            currentQuestions.length
        ) * 100;


    document.getElementById("progress-fill")
        .style.width =
        progress + "%";

}



// =========================
// TIMER
// =========================

function startTimer() {

    document.getElementById("timer")
        .innerText =
        "Time: " + timeLeft;


    timer = setInterval(() => {

        timeLeft--;


        document.getElementById("timer")
            .innerText =
            "Time: " + timeLeft;


        if (timeLeft <= 0) {

            clearInterval(timer);

            nextQuestion();

        }

    }, 1000);

}



// =========================
// SHOW RESULT
// =========================

function showResult() {

    document.getElementById("quiz-page")
        .classList.add("hidden");


    document.getElementById("result-page")
        .classList.remove("hidden");


    let total =
        currentQuestions.length;


    let percentage =
        Math.round(
            (score / total) * 100
        );


    // =========================
    // SET VALUES
    // =========================

    document.getElementById("percentage")
        .innerText =
        percentage + "%";


    document.getElementById("resultName")
        .innerText =
        student.name;


    document.getElementById("resultUSN")
        .innerText =
        student.usn;


    document.getElementById("resultRoll")
        .innerText =
        student.roll;


    document.getElementById("resultEmail")
        .innerText =
        student.email;


    document.getElementById("resultPhone")
        .innerText =
        student.phone;


    document.getElementById("resultSubject")
        .innerText =
        currentSubject;


    document.getElementById("resultLevel")
        .innerText =
        currentLevel.toUpperCase();


    document.getElementById("resultScore")
        .innerText =
        score + "/" + total;



    // =========================
    // GRADE SYSTEM
    // =========================

    let grade = "FAIL";

    let message = "";


    if (percentage >= 90) {

        grade = "A+";

        message =
            "🏆 Outstanding Performance!";

    }

    else if (percentage >= 80) {

        grade = "A";

        message =
            "🔥 Excellent Work!";

    }

    else if (percentage >= 70) {

        grade = "B";

        message =
            "👏 Very Good Performance!";

    }

    else if (percentage >= 60) {

        grade = "C";

        message =
            "👍 Good Job!";

    }

    else {

        grade = "FAIL";

        message =
            "📚 Keep Learning & Growing!";

    }


    document.getElementById("resultGrade")
        .innerText = grade;


    document.getElementById("message")
        .innerText = message;



    // =========================
    // CIRCULAR PROGRESS
    // =========================

    let circle =
        document.getElementById("progressCircle");


    let radius = 90;


    let circumference =
        2 * Math.PI * radius;


    let offset =
        circumference -
        (
            percentage / 100
        ) * circumference;


    circle.style.strokeDasharray =
        circumference;


    circle.style.strokeDashoffset =
        offset;

}



// =========================
// GO HOME
// =========================

function goHome() {

    document.getElementById("result-page")
        .classList.add("hidden");


    document.getElementById("subject-page")
        .classList.remove("hidden");

}

