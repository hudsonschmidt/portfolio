// Photography page functionality
const PHOTO_CREDIT = 'Hudson Schmidt';
const LICENSE_URL = 'https://www.hudsonschmidt.com/photography/#license';

document.addEventListener('DOMContentLoaded', function() {
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
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

        // Shuffle photos randomly
        for (let i = photos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [photos[i], photos[j]] = [photos[j], photos[i]];
        }

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

function getThumbnailUrl(url) {
    // Use _thumb version: photo.jpg -> photo_thumb.jpg
    const lastDot = url.lastIndexOf('.');
    if (lastDot === -1) return url;
    return url.substring(0, lastDot) + '_thumb' + url.substring(lastDot);
}

function renderGallery(photos) {
    const gallery = document.getElementById('photo-gallery');
    gallery.innerHTML = '';

    photos.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = getThumbnailUrl(photo.url);
        img.alt = photo.title;
        img.loading = 'lazy';
        // Stops drag-to-desktop saving; not a real barrier, just removes the easiest path
        img.draggable = false;

        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.textContent = photo.title;

        item.appendChild(img);
        item.appendChild(overlay);

        // Full resolution on click
        item.addEventListener('click', function() {
            openLightbox(photo.url, photo.title);
        });

        gallery.appendChild(item);
    });

    addLicenseMetadata(photos);
}

// Machine-readable rights info for search engines and image crawlers.
// This is the web equivalent of EXIF/IPTC — it travels with the page, not the file.
function addLicenseMetadata(photos) {
    const existing = document.getElementById('photo-license-data');
    if (existing) {
        existing.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'photo-license-data';
    script.textContent = JSON.stringify(photos.map(photo => ({
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        contentUrl: photo.url,
        name: photo.title,
        creator: {
            '@type': 'Person',
            name: PHOTO_CREDIT,
            url: 'https://www.hudsonschmidt.com'
        },
        copyrightHolder: {
            '@type': 'Person',
            name: PHOTO_CREDIT
        },
        copyrightNotice: `© ${PHOTO_CREDIT}`,
        creditText: PHOTO_CREDIT,
        license: LICENSE_URL,
        acquireLicensePage: LICENSE_URL
    })));

    document.head.appendChild(script);
}

function openLightbox(url, title) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');

    lightboxImg.src = url;
    lightboxImg.alt = title;
    lightboxImg.draggable = false;
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
