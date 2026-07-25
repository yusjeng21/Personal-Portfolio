import React, { useEffect, useState, useRef } from "react";
import sanityClient from "../lib/sanityClient";
import { heroQuery } from "../lib/sanityQueries";
import { FaMoon, FaSun } from "react-icons/fa";
import "../styles/navbar.css";

const Navbar = () => {
  const [navData, setNavData] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchNav = async () => {
      try {
        const data = await sanityClient.fetch(heroQuery);
        setNavData(data);
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      }
    };
    fetchNav();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        handleCloseMenu();
      }
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        handleCloseMenu();
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "-80px 0px -80px 0px",
      },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Cleanup
    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      handleCloseMenu();
    } else {
      setIsOpen(true);
    }
  };

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 1000);
  };

  // Dark mode toggle
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const { name } = navData;

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      {name ? (
        <a href="#home" className="nav-logo">
          {name}
          <span className="nav-underline"></span>
        </a>
      ) : (
        <a href="#home" className="nav-logo">
          Home
          <span className="nav-underline"></span>
        </a>
      )}

      <div
        ref={menuRef}
        className={`nav-links ${isOpen ? "open" : ""} ${
          isClosing ? "closing" : ""
        }`}>
        <a
          href="#home"
          onClick={handleCloseMenu}
          className={`nav-link ${activeSection === "home" ? "active" : ""}`}>
          Home
          <span className="nav-underline"></span>
        </a>
        <a
          href="#skills"
          onClick={handleCloseMenu}
          className={`nav-link ${activeSection === "skills" ? "active" : ""}`}>
          Skills
          <span className="nav-underline"></span>
        </a>
        <a
          href="#projects"
          onClick={handleCloseMenu}
          className={`nav-link ${activeSection === "projects" ? "active" : ""}`}>
          Projects
          <span className="nav-underline"></span>
        </a>
        <a
          href="#about"
          onClick={handleCloseMenu}
          className={`nav-link ${activeSection === "about" ? "active" : ""}`}>
          About
          <span className="nav-underline"></span>
        </a>
        <a
          href="#contact"
          onClick={handleCloseMenu}
          className={`nav-link ${activeSection === "contact" ? "active" : ""}`}>
          Contact
          <span className="nav-underline"></span>
        </a>
      </div>

      <div className="hamburger-and-theme">
        <div className="nav-toggle">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}>
            <span className={`icon ${darkMode ? "rotate" : ""}`}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </span>
          </button>
        </div>

        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
