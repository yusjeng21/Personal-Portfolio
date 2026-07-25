import React, { useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import "../styles/projectModal.css";
import { urlFor } from "../lib/imageUrl";

const ProjectModal = ({ project, onClose }) => {
  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Close ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Close outside click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const {
    title,
    fullDescription,
    fullImage,
    technologies,
    liveLink,
    github,
    year,
  } = project;

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-body">
          <div className="modal-image">
            <img src={urlFor(fullImage).url()} alt={title} />{" "}
          </div>

          <div className="modal-info">
            <div className="modal-title-year">
              <h3 className="modal-title">{title}</h3>
              <span className="modal-year">{year}</span>
            </div>
            <p className="modal-description">{fullDescription}</p>

            {technologies && technologies.length > 0 && (
              <div className="modal-tech">
                <strong>Technologies</strong>
                <div className="modal-tech-tags">
                  {technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-links">
              {liveLink && (
                <a href={liveLink} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
