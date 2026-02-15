const quizApp = {
    state: {
        questions: [],
        currentQuestionIndex: 0,
        mode: 'learning',
        userAnswers: {},
        selectedAnswers: [],
        isFinished: false,
        timer: null,        // ID интервала таймера
        timeRemaining: 0    // Оставшееся время в секундах
    },

    dom: {
        screens: {
            setup: document.getElementById('setup-screen'),
            quiz: document.getElementById('quiz-screen'),
            result: document.getElementById('result-screen'),
        },
        modeRadios: document.getElementsByName('mode'),
        variantButtonsContainer: document.getElementById('variant-buttons'),
        questionText: document.getElementById('question-text'),
        instructionText: document.getElementById('instruction-text'),
        optionsList: document.getElementById('options-list'),
        feedback: document.getElementById('feedback'),
        submitBtn: document.getElementById('submit-btn'),
        nextBtn: document.getElementById('next-btn'),
        qCurrent: document.getElementById('q-current'),
        qTotal: document.getElementById('q-total'),
        modeBadge: document.getElementById('mode-badge'),
        navigation: document.getElementById('quiz-navigation'),
        backBtn: null,
        homeBtn: null,
        timerDisplay: null // Элемент для отображения времени
    },

    init() {
        this.dom.variantButtonsContainer.querySelectorAll('.variant-btn').forEach(btn => {
            btn.onclick = () => {
                const variant = btn.dataset.v;
                this.start(variant);
            };
        });

        this.initUI();
    },

    initUI() {
        // Кнопка Назад
        if (!document.getElementById('back-btn')) {
            const btn = document.createElement('button');
            btn.id = 'back-btn';
            btn.innerText = '⬅ Назад';
            btn.className = 'btn-secondary';
            btn.onclick = () => this.prevQuestion();
            const controls = this.dom.submitBtn.parentElement;
            controls.insertBefore(btn, this.dom.submitBtn);
            this.dom.backBtn = btn;
        }

        // Кнопка Меню
        const statusBar = document.querySelector('.status-bar');
        if (!document.getElementById('home-btn')) {
            const btn = document.createElement('button');
            btn.id = 'home-btn';
            btn.innerText = '🏠 Меню';
            btn.className = 'btn-secondary';
            btn.style.padding = '4px 10px';
            btn.style.fontSize = '14px';
            btn.style.marginLeft = '10px';
            btn.onclick = () => {
                if(confirm('Выйти в меню? Прогресс будет сброшен.')) {
                    this.goToMenu();
                }
            };
            statusBar.appendChild(btn);
            this.dom.homeBtn = btn;
        }

        // Таймер (добавляем в status-bar перед кнопкой меню)
        if (!document.getElementById('timer-display')) {
            const timerDiv = document.createElement('div');
            timerDiv.id = 'timer-display';
            timerDiv.style.fontWeight = 'bold';
            timerDiv.style.color = '#ef4444';
            timerDiv.style.marginLeft = 'auto'; // Сдвигаем вправо
            timerDiv.style.marginRight = '10px';
            timerDiv.style.display = 'none'; // Скрыт по умолчанию
            statusBar.insertBefore(timerDiv, this.dom.homeBtn);
            this.dom.timerDisplay = timerDiv;
        }
    },

    start(variant) {
        const mode = Array.from(this.dom.modeRadios).find(r => r.checked).value;

        // 1. Выбираем вопросы
        let selectedQuestions = [];
        if (variant === 'all') {
            selectedQuestions = [...questionsDB];
            selectedQuestions.sort(() => Math.random() - 0.5);
        } else {
            selectedQuestions = questionsDB.filter(q => q.v == variant);
        }

        if (selectedQuestions.length === 0) {
            alert('Ошибка: Вопросы не найдены.');
            return;
        }

        // 2. Клонируем и перемешиваем ответы
        this.state.questions = selectedQuestions.map(q => {
            const qClone = JSON.parse(JSON.stringify(q));
            this.shuffleOptions(qClone);
            return qClone;
        });

        // 3. Сброс состояния
        this.state.currentQuestionIndex = 0;
        this.state.userAnswers = {};
        this.state.mode = mode;
        this.state.isFinished = false;

        this.showScreen('quiz');
        this.dom.qTotal.innerText = this.state.questions.length;
        this.dom.modeBadge.innerText = mode === 'learning' ? '🎓 Обучение' : '⏱️ Экзамен';

        // 4. Логика таймера
        this.stopTimer(); // Сброс предыдущего таймера
        if (mode === 'exam') {
            // Расчет времени: 90 секунд (1.5 мин) на вопрос
            this.state.timeRemaining = this.state.questions.length * 90;
            this.dom.timerDisplay.style.display = 'block';
            this.startTimer();
        } else {
            this.dom.timerDisplay.style.display = 'none';
        }

        this.renderNavigation();
        this.renderQuestion();
    },

    // --- Функции таймера ---
    startTimer() {
        this.updateTimerDisplay();
        this.state.timer = setInterval(() => {
            this.state.timeRemaining--;
            this.updateTimerDisplay();

            if (this.state.timeRemaining <= 0) {
                this.stopTimer();
                alert('Время вышло! Тест будет завершен автоматически.');
                this.calculateResults();
            }
        }, 1000);
    },

    stopTimer() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
            this.state.timer = null;
        }
    },

    updateTimerDisplay() {
        if (!this.dom.timerDisplay) return;

        const minutes = Math.floor(this.state.timeRemaining / 60);
        const seconds = this.state.timeRemaining % 60;

        // Форматирование MM:SS
        const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        this.dom.timerDisplay.innerText = `⏳ ${timeString}`;

        // Визуальное предупреждение, если осталось мало времени (< 10% или < 1 мин)
        if (this.state.timeRemaining < 60) {
            this.dom.timerDisplay.style.color = 'red';
            this.dom.timerDisplay.style.animation = 'blink 1s infinite'; // (Можно добавить keyframes в CSS для мигания)
        } else {
            this.dom.timerDisplay.style.color = '#ef4444';
            this.dom.timerDisplay.style.animation = 'none';
        }
    },

    shuffleOptions(question) {
        const optionsWithIndex = question.o.map((text, index) => ({ text, index }));
        for (let i = optionsWithIndex.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
        }
        question.o = optionsWithIndex.map(item => item.text);
        const newCorrectIndices = [];
        optionsWithIndex.forEach((item, newIndex) => {
            if (question.a.includes(item.index)) {
                newCorrectIndices.push(newIndex);
            }
        });
        question.a = newCorrectIndices;
    },

    renderNavigation() {
        const navContainer = this.dom.navigation;
        navContainer.innerHTML = '';

        this.state.questions.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            dot.innerText = index + 1;
            dot.onclick = () => this.jumpToQuestion(index);
            dot.id = `nav-dot-${index}`;
            navContainer.appendChild(dot);
        });
        this.updateNavigationStyles();
    },

    updateNavigationStyles() {
        this.state.questions.forEach((q, index) => {
            const dot = document.getElementById(`nav-dot-${index}`);
            const isCurrent = index === this.state.currentQuestionIndex;
            const existingAns = this.state.userAnswers[index];
            const isAnswered = existingAns !== undefined;

            dot.className = 'nav-dot';
            if (isCurrent) dot.classList.add('active');

            if (isAnswered) {
                if (this.state.mode === 'learning') {
                    const isCorrect = this.checkIsCorrect(existingAns, q.a);
                    dot.classList.add(isCorrect ? 'correct' : 'wrong');
                } else {
                    dot.classList.add('answered');
                }
            }
        });
    },

    jumpToQuestion(index) {
        this.state.currentQuestionIndex = index;
        this.renderQuestion();
    },

    renderQuestion() {
        const index = this.state.currentQuestionIndex;
        const q = this.state.questions[index];
        const isMulti = q.a.length > 1;

        const existingAnswer = this.state.userAnswers[index];
        const isAnswered = existingAnswer !== undefined;

        this.dom.questionText.innerText = q.q;
        this.dom.instructionText.innerText = isMulti
            ? `Выберите ${q.a.length} ${this.getDeclension(q.a.length)}`
            : 'Выберите один ответ';
        this.dom.optionsList.innerHTML = '';
        this.dom.feedback.classList.add('hidden');

        this.dom.backBtn.classList.toggle('hidden', index === 0);

        if (isAnswered && this.state.mode === 'learning') {
            this.dom.submitBtn.classList.add('hidden');
            this.dom.nextBtn.classList.remove('hidden');
            if (index === this.state.questions.length - 1) {
                this.dom.nextBtn.innerText = 'Завершить тест';
            } else {
                this.dom.nextBtn.innerText = 'Далее ➜';
            }
            this.showFeedback(this.checkIsCorrect(existingAnswer, q.a), q.a, q.o);
        } else {
            this.dom.submitBtn.classList.remove('hidden');
            this.dom.nextBtn.classList.add('hidden');
            this.dom.submitBtn.innerText = (index === this.state.questions.length - 1 && !isAnswered) ? 'Завершить' : 'Ответить';
            this.dom.submitBtn.disabled = !isAnswered;
        }

        this.state.selectedAnswers = isAnswered ? [...existingAnswer] : [];
        this.dom.qCurrent.innerText = index + 1;

        q.o.forEach((optText, optIndex) => {
            const li = document.createElement('li');
            li.className = 'option-item';

            const input = document.createElement('input');
            input.type = isMulti ? 'checkbox' : 'radio';
            input.value = optIndex;

            if (this.state.selectedAnswers.includes(optIndex)) {
                input.checked = true;
                li.classList.add('selected');
            }

            if (isAnswered && this.state.mode === 'learning') {
                input.disabled = true;
                li.style.cursor = 'default';
            } else {
                li.onclick = () => this.handleOptionClick(optIndex, isMulti, li, input);
            }

            input.onclick = (e) => e.stopPropagation();
            const span = document.createElement('span');
            span.innerText = optText;

            li.appendChild(input);
            li.appendChild(span);
            this.dom.optionsList.appendChild(li);
        });

        this.updateNavigationStyles();
    },

    handleOptionClick(index, isMulti, li, input) {
        if (!isMulti) {
            this.state.selectedAnswers = [index];
            document.querySelectorAll('.option-item').forEach(el => {
                el.classList.remove('selected');
                el.querySelector('input').checked = false;
            });
            li.classList.add('selected');
            input.checked = true;
        } else {
            if (this.state.selectedAnswers.includes(index)) {
                this.state.selectedAnswers = this.state.selectedAnswers.filter(i => i !== index);
                li.classList.remove('selected');
                input.checked = false;
            } else {
                this.state.selectedAnswers.push(index);
                li.classList.add('selected');
                input.checked = true;
            }
        }
        this.dom.submitBtn.disabled = this.state.selectedAnswers.length === 0;
    },

    checkAnswer() {
        const index = this.state.currentQuestionIndex;
        const userAns = [...this.state.selectedAnswers];
        this.state.userAnswers[index] = userAns;

        if (this.state.mode === 'learning') {
            this.renderQuestion();
        } else {
            this.nextQuestion();
        }
    },

    checkIsCorrect(userAns, correctAns) {
        return JSON.stringify(userAns.sort()) === JSON.stringify(correctAns.sort());
    },

    showFeedback(isCorrect, correctIndices, options) {
        const feedback = this.dom.feedback;
        feedback.classList.remove('hidden', 'correct', 'wrong');
        if (isCorrect) {
            feedback.classList.add('correct');
            feedback.innerText = "✅ Верно!";
        } else {
            feedback.classList.add('wrong');
            const correctText = correctIndices.map(i => options[i]).join('; ');
            feedback.innerText = `❌ Ошибка. Правильный ответ: ${correctText}`;
        }
    },

    nextQuestion() {
        if (this.state.currentQuestionIndex < this.state.questions.length - 1) {
            this.state.currentQuestionIndex++;
            this.renderQuestion();
        } else {
            this.calculateResults();
        }
    },

    prevQuestion() {
        if (this.state.currentQuestionIndex > 0) {
            this.state.currentQuestionIndex--;
            this.renderQuestion();
        }
    },

    goToMenu() {
        this.stopTimer(); // Останавливаем таймер при выходе
        this.showScreen('setup');
    },

    calculateResults() {
        this.stopTimer(); // Останавливаем таймер при подсчете результатов

        let score = 0;
        const mistakes = [];
        this.state.questions.forEach((q, index) => {
            const userAns = this.state.userAnswers[index] || [];
            const isCorrect = this.checkIsCorrect(userAns, q.a);
            if (isCorrect) score++;
            else {
                mistakes.push({
                    question: q.q,
                    userAnswer: userAns.length > 0 ? userAns.map(i => q.o[i]).join(', ') : "Нет ответа",
                    correctAnswer: q.a.map(i => q.o[i]).join(', ')
                });
            }
        });
        this.showResults(score, mistakes);
    },

    showResults(score, mistakes) {
        this.showScreen('result');
        const total = this.state.questions.length;
        const percent = Math.round((score / total) * 100);
        document.getElementById('final-score-text').innerText = `Верно: ${score} из ${total}`;
        document.getElementById('final-percent').innerText = `${percent}%`;

        const circle = document.getElementById('score-circle');
        circle.style.background = percent >= 80 ? '#10b981' : percent >= 60 ? '#f59e0b' : '#ef4444';

        const mistakesList = document.getElementById('mistakes-list');
        const mistakesWrapper = document.getElementById('mistakes-wrapper');

        if (mistakes.length > 0) {
            mistakesWrapper.classList.remove('hidden');
            mistakesList.innerHTML = mistakes.map((m, i) => `
                <div class="mistake-card">
                    <p><strong>${i+1}. ${m.question}</strong></p>
                    <p style="color: var(--error)">❌ Вы: ${m.userAnswer}</p>
                    <p style="color: var(--success)">✅ Верно: ${m.correctAnswer}</p>
                </div>
            `).join('');
        } else {
            mistakesWrapper.classList.add('hidden');
        }
    },

    showScreen(name) {
        Object.values(this.dom.screens).forEach(s => s.classList.remove('active'));
        this.dom.screens[name].classList.add('active');
    },

    getDeclension(num) { return num === 1 ? 'вариант' : (num < 5 ? 'варианта' : 'вариантов'); }
};

document.addEventListener('DOMContentLoaded', () => {
    quizApp.init();
});