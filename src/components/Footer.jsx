import React, { useEffect, useState } from "react";
import sanityClient from "../lib/sanityClient";
import { contactQuery } from "../lib/sanityQueries";
import { ArrowDown } from "lucide-react";
import "../styles/footer.css";
// import { SiGithub, SiLinkedin, SiGmail } from "react-icons/si";

export default function Footer() {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const data = await sanityClient.fetch(contactQuery);
        setFooterData(data);
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  if (loading) {
    return (
      <footer className="site-footer skeleton-footer">
        <div className="container footer__grid">
          <div>
            <h4
              className="skeleton-text"
              style={{ width: "120px", height: "1.5rem" }}></h4>
            <p
              className="skeleton-text"
              style={{ width: "150px", height: "1rem" }}></p>
            <div className="skeleton-arrow"></div>
            <div
              className="skeleton-button"
              style={{ width: "80px", height: "2rem" }}></div>
          </div>
          <div>
            <h4
              className="skeleton-text"
              style={{ width: "120px", height: "1.5rem" }}></h4>
            <ul className="links">
              {[1, 2, 3, 4, 5].map((i) => (
                <li
                  key={i}
                  className="skeleton-text"
                  style={{ width: "80px", height: "1rem" }}></li>
              ))}
            </ul>
          </div>
          <div>
            <h4
              className="skeleton-text"
              style={{ width: "120px", height: "1.5rem" }}></h4>
            <ul className="contact-mini">
              {[1, 2, 3].map((i) => (
                <li
                  key={i}
                  className="skeleton-text"
                  style={{ width: "150px", height: "1rem" }}></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container">
          <hr className="divider" />
          <div className="copy">
            <p
              className="skeleton-text"
              style={{ width: "200px", height: "1rem", margin: "0 auto" }}></p>
            <p
              className="skeleton-text"
              style={{ width: "180px", height: "1rem", margin: "0 auto" }}></p>
          </div>
        </div>
      </footer>
    );
  }

  if (!footerData)
    return (
      <div className="empty-footer">
        <p>Failed to load Footer data.</p>
        <p className="empty-subtext">Try refreshing the page.</p>
      </div>
    );

  const {
    email,
    phone,
    location,
    locationLink,
    tagline,
    copyright,
    socialsText,
    socialsLink,
  } = footerData;

  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div className="lets-connect">
          <h4>Let&apos;s Connect</h4>
          <p className="muted">{socialsText}</p>
          <ArrowDown className="arrow-down" />
          <div className="socials">
            <a
              href={socialsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="socials-btn">
              Socials
            </a>
          </div>
        </div>

        <div className="quick-links">
          <h4>Quick Links</h4>
          <ul className="links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="get-in-touch">
          <h4>Get In Touch</h4>
          <ul className="contact-mini">
            <li>
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer">
                {email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${phone}`}
                target="_blank"
                rel="noopener noreferrer">
                {phone}
              </a>
            </li>
            <li>
              <a href={locationLink} target="_blank" rel="noopener noreferrer">
                {location}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <hr className="divider" />
        <div className="copy">
          <p>
            By{" "}
            <strong>
              <a href="#">Yusupha Jeng</a>
            </strong>
            .
          </p>
          <p>{tagline}</p>
          <small>
            © {new Date().getFullYear()} {copyright}
          </small>
        </div>
      </div>
    </footer>
  );
}
