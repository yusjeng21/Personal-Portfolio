import React, { useEffect, useState } from "react";
import sanityClient from "../lib/sanityClient";
import { heroQuery } from "../lib/sanityQueries";
import { urlFor } from "../lib/imageUrl";
import "../styles/hero.css";

import { CgMoreO } from "react-icons/cg";
import {
  SiInstagram,
  SiGithub,
  // SiLinkedin,
  SiGmail,
  SiFigma,
} from "react-icons/si";

import { FaLinkedinIn } from "react-icons/fa6";

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await sanityClient.fetch(heroQuery);
        setHeroData(data);
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <section className="hero skeleton-hero" id="home">
        <div className="hero-image">
          <div className="skeleton-image"></div>
        </div>

        <div className="hero-info">
          <div className="hero-content">
            <div className="skel-hero-intro">
              <h1 className="hi skeleton-text skel-hi"></h1>
              <h1 className="name skeleton-text skel-name"></h1>
            </div>
            <h2 className="skeleton-text skel-role"></h2>
            <p className="skeleton-text skel-desc"></p>
            <div className="hero-buttons">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        </div>

        <div className="hero-socials">
          <div className="prof-socials skeleton-socials">
            <div className="skeleton-icon"></div>
            <div className="skeleton-icon"></div>
            <div className="skeleton-icon"></div>
            <div className="skeleton-icon"></div>
          </div>
          <div className="other-socials skeleton-socials">
            <div className="skeleton-icon"></div>
            <div className="skeleton-icon"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!heroData)
    return (
      <div className="empty-hero">
        <p>Failed to load Hero data.</p>
        <p className="empty-subtext">Try refreshing the page.</p>
      </div>
    );

  const {
    avatar,
    greeting,
    name,
    role,
    description,
    resumeUrl,
    github,
    linkedin,
    gmail,
    figma,
    instagram,
    socials,
  } = heroData;

  return (
    <section className="hero" id="home">
      {/* Background particles */}
      {/* <div className="particles">
        <Particles count={200} />
      </div> */}

      <div className="hero-image">
        <img src={urlFor(avatar).url()} alt="Profile picture" />
      </div>

      <div className="hero-info">
        <div className="hero-content">
          <div className="hero-intro">
            <h1 className="hi">{greeting}</h1>
            <h1 className="name">
              <strong>{name}</strong>
            </h1>
          </div>
          <h2>{role}</h2>
          <p>{description}</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn primary-btn">
              View Projects
            </a>
            <a
              href={resumeUrl}
              className="btn secondary-btn"
              target="_blank"
              rel="noopener noreferrer"
              view="Resume">
              View Resume{" "}
            </a>
          </div>
        </div>
      </div>

      <div className="hero-socials">
        <div className="prof-socials">
          <a href={github} target="_blank" rel="noopener noreferrer">
            <SiGithub size={35} />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn size={35} />
          </a>
          <a href={figma} target="_blank" rel="noopener noreferrer">
            <SiFigma size={35} />
          </a>
          <a href={`mailto:${gmail}`} target="_blank" rel="noopener noreferrer">
            <SiGmail size={35} />
          </a>
        </div>
        <div className="other-socials">
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <SiInstagram size={35} />
          </a>
          <a href={socials} target="_blank" rel="noopener noreferrer">
            <CgMoreO size={35} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
