// Projects page functionality
let expandedProjectId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadProjects();

    // Close expanded card when clicking overlay
    const overlay = document.getElementById('cardOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeExpandedCard);
    }

    // Close expanded card with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && expandedProjectId !== null) {
            closeExpandedCard();
        }
    });
});

async function loadProjects() {
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const projectCards = document.getElementById('project-cards');

    try {
        const response = await fetch(`${API_BASE}/projects/`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const projects = [...data].sort((a, b) => Number(b.id) - Number(a.id));

        // Hide loading message
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }

        // Render projects
        renderProjects(projects);

    } catch (err) {
        console.error('Failed to load projects:', err);
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }
        if (errorMessage) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = `Failed to load projects: ${err.message}`;
        }
    }
}

function getThumbnailUrl(url) {
    // Use _thumb version: photo.jpg -> photo_thumb.jpg
    const lastDot = url.lastIndexOf('.');
    if (lastDot === -1) return url;
    return url.substring(0, lastDot) + '_thumb' + url.substring(lastDot);
}

function renderProjects(projects) {
    const projectCards = document.getElementById('project-cards');
    projectCards.innerHTML = '';

    projects.forEach(project => {
        const cardCol = document.createElement('div');
        cardCol.className = 'col-md-4 mb-4';

        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-expanded', 'false');
        card.dataset.projectId = project.id;

        card.innerHTML = `
            <img src="${getThumbnailUrl(project.img)}" alt="Screenshot of ${project.name} project" class="card-img-top" loading="lazy" onerror="handleImageError(this)">
            <div class="card-body">
                <h5 class="card-title">${project.name}</h5>
                <p class="card-date">${project.date}</p>
                <div class="additional-info" style="display: none;">
                    <p>${project.desc}</p>
                    <button class="close-button" aria-label="Close project details">Close</button>
                </div>
            </div>
        `;

        // Click handler for card
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('close-button')) {
                e.stopPropagation();
                closeExpandedCard();
            } else {
                toggleExpand(project.id);
            }
        });

        // Keyboard handler
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleExpand(project.id);
            }
        });

        cardCol.appendChild(card);
        projectCards.appendChild(cardCol);
    });
}

function toggleExpand(projectId) {
    const overlay = document.getElementById('cardOverlay');

    if (expandedProjectId === projectId) {
        closeExpandedCard();
    } else {
        // Close any previously expanded card
        if (expandedProjectId !== null) {
            const prevCard = document.querySelector(`[data-project-id="${expandedProjectId}"]`);
            if (prevCard) {
                prevCard.classList.remove('expanded');
                prevCard.setAttribute('aria-expanded', 'false');
                prevCard.querySelector('.additional-info').style.display = 'none';
            }
        }

        // Expand the new card
        const card = document.querySelector(`[data-project-id="${projectId}"]`);
        if (card) {
            card.classList.add('expanded');
            card.setAttribute('aria-expanded', 'true');
            card.querySelector('.additional-info').style.display = 'block';
            expandedProjectId = projectId;

            if (overlay) {
                overlay.classList.add('active');
            }
        }
    }
}

function closeExpandedCard() {
    const overlay = document.getElementById('cardOverlay');

    if (expandedProjectId !== null) {
        const card = document.querySelector(`[data-project-id="${expandedProjectId}"]`);
        if (card) {
            card.classList.remove('expanded');
            card.setAttribute('aria-expanded', 'false');
            card.querySelector('.additional-info').style.display = 'none';
        }
        expandedProjectId = null;

        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

function handleImageError(img) {
    img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23ddd" width="100" height="100"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999">No Image</text></svg>';
    img.alt = 'Image not available';
}
