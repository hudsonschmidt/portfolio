// Resume page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadResume();
});

async function loadResume() {
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const resumeContainer = document.getElementById('resume-container');
    const noResumeMessage = document.getElementById('no-resume-message');
    const resumeEmbed = document.getElementById('resume-embed');
    const resumeDownload = document.getElementById('resume-download');

    try {
        const response = await fetch(`${API_BASE}/resume/`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const resumeUrl = await response.json();

        // Hide loading message
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }

        if (resumeUrl) {
            // Show resume
            resumeEmbed.src = resumeUrl;
            resumeDownload.href = resumeUrl;
            resumeContainer.style.display = 'block';
        } else {
            // No resume available
            noResumeMessage.style.display = 'block';
        }

    } catch (err) {
        console.error('Failed to load resume:', err);
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }
        if (errorMessage) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = `Failed to load resume: ${err.message}`;
        }
    }
}
