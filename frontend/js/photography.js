// Photography page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadPhotos();
});

async function loadPhotos() {
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const gallery = document.getElementById('photo-gallery');

    try {
        const response = await fetch(`${API_BASE}/photography/`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const photos = await response.json();

        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }

        renderGallery(photos);

    } catch (err) {
        console.error('Failed to load photos:', err);
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }
        if (errorMessage) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = `Failed to load photos: ${err.message}`;
        }
    }
}

function renderGallery(photos) {
    const gallery = document.getElementById('photo-gallery');
    gallery.innerHTML = '';

    photos.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.title;
        img.loading = 'lazy';

        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.textContent = photo.title;

        item.appendChild(img);
        item.appendChild(overlay);

        item.addEventListener('click', function() {
            openLightbox(photo.url, photo.title);
        });

        gallery.appendChild(item);
    });
}

function openLightbox(url, title) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');

    lightboxImg.src = url;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});
