import React from 'react';
import file from "./Resume.pdf"

function Resume() {
    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h1>Resume</h1>

            <embed src={file} width="900px" height="1200px" />
        </div>
    );
}

export default Resume;
