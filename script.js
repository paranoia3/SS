// --- GAME LOGIC ---
let activeQuestions = [];
let currentQ = 0;
let score = 0;
let userAns = [];

// Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz(variant) {
    score = 0;
    currentQ = 0;
    userAns = [];

    // Определяем диапазоны вопросов
    if (variant === 1) {
        // Original Part 1
        activeQuestions = questions.slice(0, 38);
    } else if (variant === 2) {
        // Original Part 2
        activeQuestions = questions.slice(38, 76);
    } else if (variant === 3) {
        // Отсебятина Part 1
        activeQuestions = questions.slice(76, 126);
    } else if (variant === 4) {
        // Отсебятина Part 2
        activeQuestions = questions.slice(126);
    }

    // Перемешиваем
    activeQuestions = shuffle([...activeQuestions]);

    // Переключаем экраны
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');

    renderQuestion();
}

function renderQuestion() {
    if (currentQ >= activeQuestions.length) {
        endQuiz();
        return;
    }

    const q = activeQuestions[currentQ];
    document.getElementById('question-counter').innerText = `QUESTION ${currentQ + 1} / ${activeQuestions.length}`;
    document.getElementById('question-text').innerHTML = q.text;

    // Code block
    const codeBox = document.getElementById('code-container');
    const codeEl = document.getElementById('question-code');
    if (q.code) {
        codeBox.classList.remove('hidden');
        codeEl.innerText = q.code;
    } else {
        codeBox.classList.add('hidden');
    }

    // Options
    const optsContainer = document.getElementById('options-container');
    optsContainer.innerHTML = '';

    const indexedOptions = q.options.map((opt, idx) => ({ text: opt, originalIdx: idx }));
    const shuffledOptions = shuffle([...indexedOptions]);
    activeQuestions[currentQ].shuffledState = shuffledOptions;

    shuffledOptions.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = opt.text;
        btn.onclick = () => handleAnswer(idx);
        optsContainer.appendChild(btn);
    });

    // Reset UI
    document.getElementById('feedback').classList.remove('show', 'correct', 'wrong');
    document.getElementById('next-btn').classList.remove('show');

    // Progress
    const pct = ((currentQ) / activeQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${pct}%`;

    // Render Math
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ]
        });
    }
}

function handleAnswer(selectedIndex) {
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);

    const q = activeQuestions[currentQ];
    const shuffled = q.shuffledState;
    const selectedOriginalIdx = shuffled[selectedIndex].originalIdx;
    const isCorrect = selectedOriginalIdx === q.correct;

    userAns.push({
        question: q,
        isCorrect: isCorrect,
        selectedText: shuffled[selectedIndex].text,
        correctText: q.options[q.correct]
    });

    const feedback = document.getElementById('feedback');
    feedback.classList.add('show');

    if (isCorrect) {
        score++;
        btns[selectedIndex].classList.add('correct');
        feedback.innerText = "Правильно!";
        feedback.classList.add('correct');
    } else {
        btns[selectedIndex].classList.add('wrong');
        feedback.innerText = "Неправильно";
        feedback.classList.add('wrong');

        shuffled.forEach((opt, idx) => {
            if (opt.originalIdx === q.correct) {
                btns[idx].classList.add('correct');
            }
        });
    }

    document.getElementById('next-btn').classList.add('show');
}

function handleNext() {
    currentQ++;
    renderQuestion();
}

function endQuiz() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');

    document.getElementById('final-score').innerText = `${score} / ${activeQuestions.length}`;

    const review = document.getElementById('review-container');
    review.innerHTML = '<h3 class="font-bold text-slate-800 mb-4 uppercase tracking-tighter italic text-sm">Обзор ответов:</h3>';

    userAns.forEach((ans, i) => {
        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = `
            <div class="mb-2">
                <span class="font-bold text-slate-500 mr-2">#${i+1}</span>
                <span class="font-bold text-slate-800">${ans.question.text}</span>
            </div>
            <div class="text-sm">
                <div class="${ans.isCorrect ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}">
                    Ваш ответ: ${ans.selectedText}
                </div>
                ${!ans.isCorrect ? `<div class="text-green-600 mt-1">Правильный: ${ans.correctText}</div>` : ''}
            </div>
        `;
        review.appendChild(div);
    });

    if (typeof renderMathInElement === 'function') {
        renderMathInElement(review, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ]
        });
    }
}

// ФУНКЦИЯ ВОЗВРАТА В МЕНЮ
function goToMenu() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}