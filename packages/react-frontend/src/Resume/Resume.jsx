// Resume.jsx
import { useState, useEffect } from 'react';
import { API_BASE, API_KEY } from '../config';
import './resume.css';

function Resume() {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchResume = async () => {
      try {
        const res = await fetch(`${API_BASE}/resume/`, {
          headers: {
            'access_token': API_KEY
          },
          signal: controller.signal
        });
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);

        const url = await res.json();   // FastAPI endpoint returns the PDF URL as plain JSON-encoded string
        setResumeUrl(url);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load resume');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResume();

    return () => controller.abort();
  }, []);

  if (error) {
    return (
      <div id="resumebody" className="alert alert-danger">
        Failed to load resume: {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div id="resumebody" className="text-center">
        <h1>Resume</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (!resumeUrl) {
    return (
      <div id="resumebody" className="text-center">
        <h1>Resume</h1>
        <p>No resume available</p>
      </div>
    );
  }

  return (
    <div id="resumebody">
      <h1>Resume</h1>

      {/* Use <embed> or <iframe>; both work.  100% width keeps it responsive. */}
      <embed
        src={resumeUrl}
        type="application/pdf"
        width="100%"
        height="1200px"
        style={{ border: 'none' }}
      />

      {/* Optional download link in case the browser blocks inline PDFs */}
      <p className="mt-3">
        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
          Download PDF
        </a>
      </p>
    </div>
  );
}

export default Resume;
