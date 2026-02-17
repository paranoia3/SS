let activeQuestions = [];
let currentQ = 0;
let score = 0;
let userAns = [];
let mode = 'training';
let answered = false;
let currentShuffledOptions = [];
let correctShuffledIdx = -1;

// Фишер-Йейтс для перемешивания
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz(m, variant) {
    mode = m;
    score = 0;
    currentQ = 0;
    userAns = [];

    // Используем все вопросы
    activeQuestions = questions;
    // Если нужно разделение на варианты, можно раскомментировать и адаптировать:
    // const mid = Math.ceil(questions.length / 2);
    // activeQuestions = (variant === 1) ? questions.slice(0, mid) : questions.slice(mid);

    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('mode-indicator').innerText = `РЕЖИМ: ${m === 'training' ? 'ОБУЧЕНИЕ' : 'ЭКЗАМЕН'}`;

    window.scrollTo(0, 0);
    renderQuestion();
}

function renderQuestion() {
    answered = false;
    const q = activeQuestions[currentQ];

    document.getElementById('question-counter').innerText = `Question ${currentQ + 1} of ${activeQuestions.length}`;
    document.getElementById('question-text').innerText = q.text;
    document.getElementById('progress-bar').style.width = `${(currentQ / activeQuestions.length) * 100}%`;
    document.getElementById('feedback').style.opacity = '0';

    const codeCont = document.getElementById('code-container');
    if (q.code) {
        codeCont.classList.remove('hidden');
        document.getElementById('question-code').innerText = q.code;
    } else {
        codeCont.classList.add('hidden');
    }

    // ЛОГИКА РАНДОМИЗАЦИИ ВАРИАНТОВ
    const optionsWithIndices = q.options.map((text, index) => ({
        text,
        isOriginalCorrect: index === q.correct
    }));

    currentShuffledOptions = shuffle([...optionsWithIndices]);
    correctShuffledIdx = currentShuffledOptions.findIndex(o => o.isOriginalCorrect);

    const optCont = document.getElementById('options-container');
    optCont.innerHTML = '';

    currentShuffledOptions.forEach((opt, i) => {
        const btn = document.createElement('div');
        btn.className = 'option-btn';
        btn.innerHTML = `
            <div class="option-letter">${String.fromCharCode(65 + i)}</div>
            <div class="option-text">${opt.text}</div>
        `;
        btn.onclick = () => selectOpt(i, btn);
        optCont.appendChild(btn);
    });

    // --- KaTeX Rendering Trigger ---
    // Этот код найдет все элементы с LaTeX ($...$) внутри quiz-card и отрендерит их
    if (window.renderMathInElement) {
        renderMathInElement(document.getElementById('quiz-screen'), {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false}
            ],
            throwOnError: false
        });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('next-btn').innerText = currentQ === activeQuestions.length - 1 ? 'ФИНИШ' : 'ДАЛЕЕ →';
}

function selectOpt(idx, el) {
    if (answered && mode === 'training') return;

    answered = true;
    const isCorrect = idx === correctShuffledIdx;

    userAns[currentQ] = {
        selectedIdx: idx,
        correctIdx: correctShuffledIdx,
        shuffledOptions: [...currentShuffledOptions]
    };

    const allBtns = document.querySelectorAll('.option-btn');

    if (mode === 'training') {
        if (isCorrect) {
            el.classList.add('correct');
            score++;
            showFeedback("Correct!", true);
        } else {
            el.classList.add('wrong');
            allBtns[correctShuffledIdx].classList.add('correct');
            showFeedback("Incorrect!", false);
        }
    } else {
        allBtns.forEach(b => b.classList.remove('selected'));
        el.classList.add('selected');
    }
}

function showFeedback(txt, ok) {
    const f = document.getElementById('feedback');
    f.innerText = txt;
    f.style.color = ok ? '#10b981' : '#ef4444';
    f.style.opacity = '1';
}

function handleNext() {
    if (!answered) {
        alert("Выберите вариант ответа!");
        return;
    }
    if (currentQ < activeQuestions.length - 1) {
        currentQ++;
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    if (mode === 'exam') {
        score = userAns.filter(a => a && a.selectedIdx === a.correctIdx).length;
    }

    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = `${score} / ${activeQuestions.length}`;

    const review = document.getElementById('review-container');
    review.innerHTML = '<h3 class="font-bold text-slate-800 mb-4 uppercase tracking-tighter italic text-sm">Разбор ваших ответов:</h3>';

    activeQuestions.forEach((q, i) => {
        const data = userAns[i];
        if (!data) return;
        const isOk = data.selectedIdx === data.correctIdx;

        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = `
            <p style="font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; font-size: 0.95rem;">${i+1}. ${q.text}</p>
            <div style="font-size: 0.85rem; font-weight: 600; line-height: 1.4;">
                <span style="color: ${isOk ? '#10b981' : '#ef4444'}">Ваш ответ: ${data.shuffledOptions[data.selectedIdx].text}</span><br>
                ${!isOk ? `<span style="color: #10b981">Правильный: ${data.shuffledOptions[data.correctIdx].text}</span>` : ''}
            </div>
        `;
        review.appendChild(div);
    });

    // Рендер формул в результатах
    if (window.renderMathInElement) {
        renderMathInElement(review, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false}
            ],
            throwOnError: false
        });
    }

    window.scrollTo(0, 0);
}