const categories = {
    conocernos: {
        name: 'Conocernos',
        icon: '🫧',
        color: '#E8E4D8'
    },

    nosotros: {
        name: 'Nosotros',
        icon: '❤️',
        color: '#F1DDD8'
    },

    profundas: {
        name: 'Profundas',
        icon: '🧠',
        color: '#E6E0EA'
    },

    intimidad: {
        name: 'Intimidad',
        icon: '🔥',
        color: '#F2DFD1'
    },

    futuro: {
        name: 'Futuro',
        icon: '🔮',
        color: '#DDE6DE'
    },

    gilipolleces: {
        name: 'Gilipolleces',
        icon: '😂',
        color: '#F3E8C9'
    },

    fumadisimos: {
        name: 'Fumadísimos',
        icon: '🚬',
        color: '#DCC6B8'
    }
};


let currentQuestionIndex = 0;
let currentCategory = 'conocernos';
let currentCategoryQuestions = [];
let randomMode = false;
let answeredQuestions = JSON.parse(
    localStorage.getItem('answeredQuestions')
) || [];
let favoriteQuestions = JSON.parse(
    localStorage.getItem('favoriteQuestions')
) || [];
const homeScreen = document.getElementById('homeScreen');
const categoriesScreen = document.getElementById('categoriesScreen');

const openCategories = document.getElementById('openCategories');
const backHome = document.getElementById('backHome');

openCategories.addEventListener('click', () => {
    homeScreen.classList.remove('active-screen');
    categoriesScreen.classList.add('active-screen');

    updateCategoryProgress();
});

backHome.addEventListener('click', () => {
    categoriesScreen.classList.remove('active-screen');
    homeScreen.classList.add('active-screen');

    updateHomeContinue();
});
const questionScreen = document.getElementById('questionScreen');
const openRandom = document.getElementById('openRandom');
const openConocernos = document.getElementById('openConocernos');
const openNosotros = document.getElementById('openNosotros');
const openProfundas = document.getElementById('openProfundas');
const openIntimidad = document.getElementById('openIntimidad');
const openFuturo = document.getElementById('openFuturo');
const openGilipolleces = document.getElementById('openGilipolleces');
const openFumadisimos = document.getElementById('openFumadisimos');
const backCategories = document.getElementById('backCategories');
const continueButton = document.getElementById('continueButton');
const favoriteButton = document.getElementById('favoriteButton');
const favoritesScreen = document.getElementById('favoritesScreen');
const openFavorites = document.getElementById('openFavorites');
const backFromFavorites = document.getElementById('backFromFavorites');
const favoritesList = document.getElementById('favoritesList');
const settingsScreen = document.getElementById('settingsScreen');
const openSettings = document.getElementById('openSettings');
const backFromSettings = document.getElementById('backFromSettings');
const resetGame = document.getElementById('resetGame');
const progressScreen = document.getElementById('progressScreen');
const openProgress = document.getElementById('openProgress');
const backFromProgress = document.getElementById('backFromProgress');
const totalProgressNumber = document.getElementById('totalProgressNumber');
const progressDetails = document.getElementById('progressDetails');

function openRandomQuestion() {
    randomMode = true;

    const categoryKeys = Object.keys(categories);

    const availableCategories = categoryKeys.filter(categoryKey => {
        return questions.some(question =>
            question.category === categoryKey &&
            !answeredQuestions.includes(question.id)
        );
    });

    if (availableCategories.length === 0) {
        questionText.textContent =
            'Has respondido todas las preguntas del juego.';

        questionCounter.textContent =
            `${questions.length} / ${questions.length}`;

        return;
    }

    const randomCategory =
        availableCategories[
            Math.floor(Math.random() * availableCategories.length)
        ];

    currentCategory = randomCategory;

    currentCategoryQuestions = questions.filter(
        question =>
            question.category === currentCategory &&
            !answeredQuestions.includes(question.id)
    );

    currentQuestionIndex =
        Math.floor(Math.random() * currentCategoryQuestions.length);

    categoriesScreen.classList.remove('active-screen');
    questionScreen.classList.add('active-screen');

    localStorage.setItem('lastCategory', 'aleatorio');

    showQuestion();
}
function openCategory(categoryKey) {
    randomMode = false;
    currentCategory = categoryKey;

    currentCategoryQuestions = questions.filter(
        question => question.category === currentCategory
    );

    currentQuestionIndex = currentCategoryQuestions.findIndex(
        question => !answeredQuestions.includes(question.id)
    );

    categoriesScreen.classList.remove('active-screen');
    questionScreen.classList.add('active-screen');

    localStorage.setItem('lastCategory', categoryKey);

    if (currentQuestionIndex === -1) {
        const total = currentCategoryQuestions.length;

        questionCategoryIcon.textContent = categories[currentCategory].icon;
        questionCategoryName.textContent = categories[currentCategory].name;
        questionCard.style.backgroundColor = categories[currentCategory].color;

        questionText.textContent =
            'Has respondido todas las preguntas de esta categoría.';

        questionCounter.textContent = `${total} / ${total}`;

        return;
    }

    showQuestion();
}


openRandom.addEventListener('click', () => {
    openRandomQuestion();
});
openConocernos.addEventListener('click', () => {
    openCategory('conocernos');
});
openNosotros.addEventListener('click', () => {
    openCategory('nosotros');
});

openProfundas.addEventListener('click', () => {
    openCategory('profundas');
});

openIntimidad.addEventListener('click', () => {
    openCategory('intimidad');
});

openFuturo.addEventListener('click', () => {
    openCategory('futuro');
});

openGilipolleces.addEventListener('click', () => {
    openCategory('gilipolleces');
});

openFumadisimos.addEventListener('click', () => {
    openCategory('fumadisimos');
});

backCategories.addEventListener('click', () => {
    questionScreen.classList.remove('active-screen');
    categoriesScreen.classList.add('active-screen');
    updateCategoryProgress();
});
const questionText = document.getElementById('questionText');
const questionCard = document.getElementById('questionCard');
const nextButton = document.getElementById('nextButton');
const questionCounter = document.getElementById('questionCounter');
const questionCategoryIcon = document.getElementById('questionCategoryIcon');
const questionCategoryName = document.getElementById('questionCategoryName');
const progressConocernos = document.getElementById('progressConocernos');
const progressNosotros = document.getElementById('progressNosotros');
const progressProfundas = document.getElementById('progressProfundas');
const progressIntimidad = document.getElementById('progressIntimidad');
const progressFuturo = document.getElementById('progressFuturo');
const progressGilipolleces = document.getElementById('progressGilipolleces');
const progressFumadisimos = document.getElementById('progressFumadisimos');
const continueCategory = document.getElementById('continueCategory');
const continueProgress = document.getElementById('continueProgress');

function updateHomeContinue() {
    const lastCategory = localStorage.getItem('lastCategory');

    if (!lastCategory) {
        continueCategory.textContent = '🎲 Empieza a jugar';
        continueProgress.textContent = `0 / ${questions.length}`;
        return;
    }

    if (lastCategory === 'aleatorio') {
        continueCategory.textContent = '🎲 Aleatorio';
        continueProgress.textContent =
            `${answeredQuestions.length} / ${questions.length}`;
        return;
    }

    const categoryData = categories[lastCategory];

    if (!categoryData) {
        return;
    }

    const categoryQuestions = questions.filter(
        question => question.category === lastCategory
    );

    const answeredInCategory = categoryQuestions.filter(
        question => answeredQuestions.includes(question.id)
    ).length;

    continueCategory.textContent =
        `${categoryData.icon} ${categoryData.name}`;

    continueProgress.textContent =
        `${answeredInCategory} / ${categoryQuestions.length}`;
}
function renderProgress() {
    totalProgressNumber.textContent =
        `${answeredQuestions.length} / ${questions.length}`;

    progressDetails.innerHTML = '';

    Object.keys(categories).forEach(categoryKey => {
        const categoryData = categories[categoryKey];

        const categoryQuestions = questions.filter(
            question => question.category === categoryKey
        );

        const answeredCount = categoryQuestions.filter(
            question => answeredQuestions.includes(question.id)
        ).length;

        const row = document.createElement('div');
        row.className = 'progress-row';
        row.style.backgroundColor = categoryData.color;

        row.innerHTML = `
            <span class="progress-row-name">
                ${categoryData.icon} ${categoryData.name}
            </span>

            <span class="progress-row-number">
                ${answeredCount} / ${categoryQuestions.length}
            </span>
        `;

        progressDetails.appendChild(row);
    });
}
function updateCategoryProgress() {
    const progressElements = {
        conocernos: progressConocernos,
        nosotros: progressNosotros,
        profundas: progressProfundas,
        intimidad: progressIntimidad,
        futuro: progressFuturo,
        gilipolleces: progressGilipolleces,
        fumadisimos: progressFumadisimos
    };

    Object.keys(categories).forEach(categoryKey => {
        const categoryQuestions = questions.filter(
            question => question.category === categoryKey
        );

        const answeredCount = categoryQuestions.filter(
            question => answeredQuestions.includes(question.id)
        ).length;

        progressElements[categoryKey].textContent =
            `${answeredCount} / ${categoryQuestions.length}`;
    });
}
function showQuestion() {
    const categoryData = categories[currentCategory];

questionCategoryIcon.textContent = categoryData.icon;
questionCategoryName.textContent = categoryData.name;
questionCard.style.backgroundColor = categoryData.color;
    questionText.textContent = currentCategoryQuestions[currentQuestionIndex].text;


    if (randomMode) {
    questionCounter.textContent =
        `${answeredQuestions.length} / ${questions.length}`;
} else {
    const allQuestionsInCategory = questions.filter(
        question => question.category === currentCategory
    );

    const answeredInCategory = allQuestionsInCategory.filter(
        question => answeredQuestions.includes(question.id)
    ).length;

    questionCounter.textContent =
        `${answeredInCategory} / ${allQuestionsInCategory.length}`;
}
localStorage.setItem(
    'lastQuestionId',
    currentCategoryQuestions[currentQuestionIndex].id
);
    updateFavoriteButton();
}

function renderFavorites() {
    favoritesList.innerHTML = '';

    const favorites = questions.filter(question =>
        favoriteQuestions.includes(question.id)
    );

    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <p class="empty-favorites">
                Aún no tienes preguntas favoritas.
            </p>
        `;
        return;
    }

    favorites.forEach(question => {
        const categoryData = categories[question.category];
        const card = document.createElement('article');

        card.className = 'favorite-card';

        const isAnswered = answeredQuestions.includes(question.id);

        card.innerHTML = `
            <span class="favorite-card-category">
    ${categoryData.icon} ${categoryData.name}
</span>

            <p class="favorite-card-text">
                ${question.text}
            </p>

            <span class="favorite-card-status">
                ${isAnswered ? '✓ Respondida' : '○ Pendiente'}
            </span>
            <button class="remove-favorite-button" data-id="${question.id}">
    ♡ Quitar de favoritas
</button>
        `;

        favoritesList.appendChild(card);
        const removeButton = card.querySelector('.remove-favorite-button');

removeButton.addEventListener('click', () => {
    favoriteQuestions = favoriteQuestions.filter(
        id => id !== question.id
    );

    localStorage.setItem(
        'favoriteQuestions',
        JSON.stringify(favoriteQuestions)
    );

    renderFavorites();
});
    });
}
function updateFavoriteButton() {
    const currentQuestion =
    currentCategoryQuestions[currentQuestionIndex];

    if (favoriteQuestions.includes(currentQuestion.id)) {
        favoriteButton.textContent = '♥ Favorita';
        favoriteButton.classList.add('is-favorite');
    } else {
        favoriteButton.textContent = '♡ Favorita';
        favoriteButton.classList.remove('is-favorite');
    }
}


nextButton.addEventListener('click', () => {
    goToNextAvailableQuestion();
});
function goToNextAvailableQuestion() {
    if (randomMode) {
    openRandomQuestion();
    return;
}
    let attempts = 0;

    do {
        currentQuestionIndex++;

        if (currentQuestionIndex >= currentCategoryQuestions.length) {
            currentQuestionIndex = 0;
        }

        attempts++;

        if (attempts > currentCategoryQuestions.length) {
            questionText.textContent =
                'Has respondido todas las preguntas de esta categoría.';

            questionCounter.textContent =
                `${currentCategoryQuestions.length} / ${currentCategoryQuestions.length}`;

            return;
        }

    } while (
        answeredQuestions.includes(
            currentCategoryQuestions[currentQuestionIndex].id
        )
    );

    showQuestion();
}

const answeredButton = document.getElementById('answeredButton');

answeredButton.addEventListener('click', () => {
    const currentQuestion =
    currentCategoryQuestions[currentQuestionIndex];

    if (!answeredQuestions.includes(currentQuestion.id)) {
        answeredQuestions.push(currentQuestion.id);
        localStorage.setItem(
    'answeredQuestions',
    JSON.stringify(answeredQuestions)
);
updateCategoryProgress();
    }

goToNextAvailableQuestion();

    console.log('Respondidas:', answeredQuestions);
});
continueButton.addEventListener('click', () => {
    const lastCategory = localStorage.getItem('lastCategory');

    if (lastCategory === 'aleatorio') {
        homeScreen.classList.remove('active-screen');
        openRandomQuestion();
        return;
    }

    if (lastCategory && categories[lastCategory]) {
        randomMode = false;
        currentCategory = lastCategory;

        currentCategoryQuestions = questions.filter(
            question => question.category === currentCategory
        );

        const lastQuestionId = Number(
    localStorage.getItem('lastQuestionId')
);

const savedQuestionIndex = currentCategoryQuestions.findIndex(
    question =>
        question.id === lastQuestionId &&
        !answeredQuestions.includes(question.id)
);

if (savedQuestionIndex !== -1) {
    currentQuestionIndex = savedQuestionIndex;
} else {
    currentQuestionIndex = currentCategoryQuestions.findIndex(
        question => !answeredQuestions.includes(question.id)
    );
}

        homeScreen.classList.remove('active-screen');
        questionScreen.classList.add('active-screen');
if (currentQuestionIndex === -1) {
    const total = currentCategoryQuestions.length;

    questionCategoryIcon.textContent = categories[currentCategory].icon;
    questionCategoryName.textContent = categories[currentCategory].name;
    questionCard.style.backgroundColor = categories[currentCategory].color;

    questionText.textContent =
        'Has respondido todas las preguntas de esta categoría.';

    questionCounter.textContent = `${total} / ${total}`;

    return;
}
        showQuestion();
    } else {
        homeScreen.classList.remove('active-screen');
        categoriesScreen.classList.add('active-screen');
    }
});

favoriteButton.addEventListener('click', () => {
    const currentQuestion =
    currentCategoryQuestions[currentQuestionIndex];
    const position = favoriteQuestions.indexOf(currentQuestion.id);

    if (position === -1) {
        favoriteQuestions.push(currentQuestion.id);
    } else {
        favoriteQuestions.splice(position, 1);
    }

    localStorage.setItem(
        'favoriteQuestions',
        JSON.stringify(favoriteQuestions)
    );

    updateFavoriteButton();
});

openFavorites.addEventListener('click', () => {
    homeScreen.classList.remove('active-screen');
    favoritesScreen.classList.add('active-screen');

    renderFavorites();
});

backFromFavorites.addEventListener('click', () => {
    favoritesScreen.classList.remove('active-screen');
    homeScreen.classList.add('active-screen');
});

openProgress.addEventListener('click', () => {
    homeScreen.classList.remove('active-screen');
    progressScreen.classList.add('active-screen');
});

openProgress.addEventListener('click', () => {
    homeScreen.classList.remove('active-screen');
    progressScreen.classList.add('active-screen');

    renderProgress();
});

backFromProgress.addEventListener('click', () => {
    progressScreen.classList.remove('active-screen');
    homeScreen.classList.add('active-screen');

    updateHomeContinue();
});

openSettings.addEventListener('click', () => {
    homeScreen.classList.remove('active-screen');
    settingsScreen.classList.add('active-screen');
});

backFromSettings.addEventListener('click', () => {
    settingsScreen.classList.remove('active-screen');
    homeScreen.classList.add('active-screen');

    updateHomeContinue();
});

resetGame.addEventListener('click', () => {
    const confirmed = confirm(
        '¿Seguro que quieres reiniciar la partida? Se borrarán el progreso y las favoritas.'
    );

    if (!confirmed) {
        return;
    }

    answeredQuestions = [];
    favoriteQuestions = [];

    localStorage.removeItem('answeredQuestions');
    localStorage.removeItem('favoriteQuestions');
    localStorage.removeItem('lastCategory');
    localStorage.removeItem('lastQuestionId');

    updateCategoryProgress();
    updateHomeContinue();

    alert('Partida reiniciada.');
});

    updateHomeContinue();
updateHomeContinue();
updateCategoryProgress();