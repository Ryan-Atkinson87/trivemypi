import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="Footer">
      <p>
        Check out my{" "}
        <a
          href="https://www.linkedin.com/in/ryan-atkinson-804a5b1a8"
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
        ,{' '} 
        <a
          href="https://github.com/Ryan-Atkinson87"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>{" "}
        and{" "}
        <a
          href="https://ryan-atkinson87.github.io "
          rel="noopener noreferrer"
          target="_blank"
        >
          Portfolio Website
        </a>
      </p>
    </footer>
  );
}
