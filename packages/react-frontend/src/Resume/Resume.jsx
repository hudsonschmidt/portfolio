import React from 'react';
import file from "./Resume.pdf";
import './resume.css';

function Resume() {
    return (
        <div id="resumebody">
            <h1>Resume</h1>

            <embed src={file} width="900px" height="1200px" />
        </div>
    );
}

export default Resume;
