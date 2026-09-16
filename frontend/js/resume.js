// Resume page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadDocuments();
});

let docLinks = [];

async function loadDocuments() {
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const docContainer = document.getElementById('doc-container');
    const noResumeMessage = document.getElementById('no-resume-message');

    try {
        const response = await fetch(`${API_BASE}/resume/`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        docLinks = await response.json();

        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }

        if (docLinks && docLinks.length > 0) {
            showDocument(0);
            docContainer.style.display = 'block';
            initTabs();
        } else {
            noResumeMessage.style.display = 'block';
        }

    } catch (err) {
        console.error('Failed to load documents:', err);
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }
        if (errorMessage) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = `Failed to load documents: ${err.message}`;
        }
    }
}

function showDocument(index) {
    const docEmbed = document.getElementById('doc-embed');
    const docDownload = document.getElementById('doc-download');
    const docUpdated = document.getElementById('doc-updated');
    const entry = Array.isArray(docLinks) ? docLinks[index] : docLinks;

    // Entries are objects ({link, last_updated}) but may be plain URL
    // strings if an older backend version is still deployed.
    const url = typeof entry === 'string' ? entry : entry && entry.link;
    const lastUpdated = (entry && entry.last_updated) || '';

    if (url && docEmbed) {
        docEmbed.src = url;
    }
    if (url && docDownload) {
        docDownload.href = url;
    }
    if (docUpdated) {
        docUpdated.textContent = lastUpdated ? `Last updated: ${lastUpdated}` : '';
        docUpdated.style.display = lastUpdated ? 'block' : 'none';
    }
}

function initTabs() {
    const tabs = document.querySelectorAll('.doc-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);

            tabs.forEach(t => t.classList.remove('doc-tab--active'));
            this.classList.add('doc-tab--active');

            showDocument(index);
        });
    });
}
