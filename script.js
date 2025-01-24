const questions = [
    {
        question: "Which data structure uses LIFO order?",
        answers: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Array", correct: false },
            { text: "Linked List", correct: false }
        ]
    },
    {
        question: "What is the time complexity of binary search?",
        answers: [
            { text: "O(n)", correct: false },
            { text: "O(log n)", correct: true },
            { text: "O(n^2)", correct: false },
            { text: "O(1)", correct: false }
        ]
    },
    {
        question: "Which method is used to find the length of a string in JavaScript?",
        answers: [
            { text: "length()", correct: false },
            { text: "getLength()", correct: false },
            { text: "size()", correct: false },
            { text: "length", correct: true }
        ]
    },
    {
        question: "What is the optimal substructure property in dynamic programming?",
        answers: [
            { text: "The problem can be solved by dividing it into smaller subproblems.", correct: true },
            { text: "The solution can be derived from a greedy approach.", correct: false },
            { text: "It requires recursion without overlapping subproblems.", correct: false },
            { text: "It cannot be solved using memoization.", correct: false }
        ]
    },
    {
        question: "In which of the following problems can a greedy approach be applied?",
        answers: [
            { text: "0/1 Knapsack Problem", correct: false },
            { text: "Prim's Algorithm for Minimum Spanning Tree", correct: true },
            { text: "Fibonacci Series", correct: false },
            { text: "Tower of Hanoi", correct: false }
        ]
    },
    {
        question: "Which data structure allows for constant time complexity for insertion and lookup?",
        answers: [
            { text: "Array", correct: false },
            { text: "Linked List", correct: false },
            { text: "Hash Map", correct: true },
            { text: "Binary Tree", correct: false }
        ]
    },
    {
        question: "What is the height of a binary tree?",
        answers: [
            { text: "Number of nodes in the longest path from root to leaf", correct: false },
            { text: "Number of edges in the longest path from root to leaf", correct: true },
            { text: "Total number of nodes", correct: false },
            { text: "The depth of the tree", correct: false }
        ]
    },
    {
        question: "Which traversal technique can be used to find the shortest path in an unweighted graph?",
        answers: [
            { text: "Depth-First Search (DFS)", correct: false },
            { text: "Breadth-First Search (BFS)", correct: true },
            { text: "Dijkstra's Algorithm", correct: false },
            { text: "A* Algorithm", correct: false }
        ]
    },
    {
        question: "Which of the following is true about space complexity?",
        answers: [
            { text: "It only includes the space required for input.", correct: false },
            { text: "It includes both auxiliary and input space.", correct: true },
            { text: "It is the same as time complexity.", correct: false },
            { text: "It is never constant.", correct: false }
        ]
    },
    {
        question: "What is a base case in recursion?",
        answers: [
            { text: "The case that breaks the recursion loop", correct: true },
            { text: "The maximum depth of the recursive calls", correct: false },
            { text: "The case where recursion is always optimal", correct: false },
            { text: "The scenario where recursion cannot be applied", correct: false }
        ]
    },                      
];


let currentQuestionIndex, score, timeLeft, timerInterval;

function startGame() {
    document.getElementById("result-container").classList.add("hidden"); // Hide result container when the game starts
    document.getElementById("quiz-container").classList.remove("hidden"); // Show quiz container
    document.getElementById("start-button").style.display = 'none';
    document.getElementById("next-button").style.display = 'none';
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 15;
    document.getElementById("current-score").innerText = score;
    document.getElementById("progress-bar").style.width = '0%';
    startTimer();
    showQuestion();
}

function startTimer() {
    document.getElementById("time-left").innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("time-left").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showNextButton();
        }
    }, 1000);
}

function showQuestion() {
    resetState();
    const question = questions[currentQuestionIndex];
    document.getElementById("question").innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        document.getElementById("answer-buttons").appendChild(button);
    });
    updateProgressBar();
}

function resetState() {
    document.getElementById("next-button").style.display = 'none';
    const answerButtons = document.getElementById("answer-buttons");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
        document.getElementById("current-score").innerText = score;
        showEmojiAnimation('👍');
    } else {
        showEmojiAnimation('😢');
    }
    Array.from(document.getElementById("answer-buttons").children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    clearInterval(timerInterval);
    showNextButton();
}

function setStatusClass(element, correct) {
    if (correct) {
        element.style.backgroundColor = '#4CAF50';
    } else {
        element.style.backgroundColor = '#f44336';
    }
}

function showEmojiAnimation(emoji) {
    const emojiElement = document.createElement("div");
    emojiElement.className = "emoji-animation";
    emojiElement.innerText = emoji;
    document.body.appendChild(emojiElement);
    setTimeout(() => emojiElement.remove(), 1000);
}

function showNextButton() {
    document.getElementById("next-button").style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    timeLeft = 15;
    if (currentQuestionIndex < questions.length) {
        startTimer();
        showQuestion();
    } else {
        showFinalScore(); 
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

function showFinalScore() {
    document.getElementById('quiz-container').classList.add('hidden');
    const resultContainer = document.getElementById('result-container');
    resultContainer.classList.remove('hidden');

    let emoji = '😐';
    let message = '';

    if (score === questions.length) {
        emoji = '🎉';
        message = 'Congratulations!!';
    } else if (score > questions.length / 2) {
        emoji = '😊';
        message = 'Great Job!';
    } else {
        emoji = '😢';
        message = 'You can do it! Play again.';
    }

    document.getElementById("result-emoji").innerText = emoji;
    document.getElementById("result-message").innerText = `You scored ${score} out of ${questions.length}.\n${message}`;
}

function restartQuiz() {
    startGame();
}
