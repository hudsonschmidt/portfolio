// Resume.jsx
import React, { useState, useEffect } from 'react';
import './resume.css';

export const API_BASE = import.meta.env.VITE_API_BASE;
export const API_KEY  = import.meta.env.VITE_API_KEY;

function Resume() {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch(`${API_BASE}/resume/?api_key=${API_KEY}`);
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);

        const url = await res.json();   // FastAPI endpoint returns the PDF URL as plain JSON-encoded string
        setResumeUrl(url);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchResume();
  }, []);

  if (error) {
    return (
      <div id="resumebody" className="alert alert-danger">
        Failed to load resume: {error}
      </div>
    );
  }

  if (!resumeUrl) {
    return (
      <div id="resumebody" className="text-center">
        <h1>Resume</h1>
        <p>Loading…</p>
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
