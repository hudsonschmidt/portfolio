// Experience page functionality

document.addEventListener('DOMContentLoaded', function() {
    loadExperience();
});

async function loadExperience() {
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const experienceContainer = document.getElementById('experience-cards');

    try {
        const response = await fetch(`${API_BASE}/experience/`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const experiences = [...data].sort((a, b) => Number(a.id) - Number(b.id));

        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }

        renderExperiences(experiences);

    } catch (err) {
        console.error('Failed to load experiences:', err);
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }
        if (errorMessage) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = `Failed to load experience: ${err.message}`;
        }
    }
}

function renderExperiences(experiences) {
    const experienceContainer = document.getElementById('experience-cards');
    experienceContainer.innerHTML = '';

    experiences.forEach((experience, index) => {
        const card = document.createElement('div');
        card.className = 'exp-card';

        card.innerHTML = `
            <div class="exp-card-body">
                <span class="exp-card-date">${experience.date_range}</span>
                <h2 class="exp-card-company">${experience.company}</h2>
                <p class="exp-card-title">${experience.title}</p>
                <p class="exp-card-desc">${experience.description}</p>
            </div>
        `;

        experienceContainer.appendChild(card);
    });
}
