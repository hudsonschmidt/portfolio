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

        // Hide loading message
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }

        // Render experiences
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

    experiences.forEach(experience => {
        const card = document.createElement('div');
        card.className = 'experience-card';

        card.innerHTML = `
            <div class="experience-image" style="background-image: url('${experience.image}');" role="img" aria-label="${experience.company} workplace"></div>
            <div class="experience-content">
                <h3>${experience.company}</h3>
                <p class="experience-meta">${experience.title}<br>${experience.date_range}</p>
                <p>${experience.description}</p>
            </div>
        `;

        experienceContainer.appendChild(card);
    });
}
