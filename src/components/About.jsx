import React, { useEffect, useState } from "react";
import sanityClient from "../lib/sanityClient";
import { aboutQuery } from "../lib/sanityQueries";
import { urlFor } from "../lib/imageUrl";
import { PortableText } from "@portabletext/react";
import "../styles/about.css";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await sanityClient.fetch(aboutQuery);
        setAboutData(data);
      } catch (error) {
        console.error("Failed to fetch about data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  // Handle download
  const handleDownload = async (url, fileName = "Resume.pdf") => {
    setIsDownloading(true);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download resume:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <section className="about skeleton-about" id="about">
        <div className="about-container">
          <div className="about-text skeleton-text-box">
            <h2
              className="skeleton-text"
              style={{ width: "150px", height: "2.5rem" }}></h2>
            <div
              className="skeleton-text"
              style={{ width: "100%", height: "6rem" }}></div>
            <div
              className="skeleton-text"
              style={{ width: "100%", height: "4rem" }}></div>
            <div
              className="skeleton-text"
              style={{ width: "70%", height: "3rem" }}></div>
            <div className="skeleton-button"></div>
          </div>
          <div className="about-photo skeleton-image"></div>
        </div>
      </section>
    );
  }

  if (!aboutData)
    return (
      <div className="empty-about">
        <p>Failed to load About data.</p>
        <p className="empty-subtext">Try refreshing the page.</p>
      </div>
    );

  const {
    image,
    name,
    bio,
    education,
    services = [],
    hobbies = [],
    resumeUrl,
  } = aboutData;

  return (
    <section className="about" id="about">
      <div className="about-container">
        {/* Text */}
        <div className="about-text">
          <h2>About Me</h2>

          {/* Bio */}
          <div className="about-bio">
            <PortableText
              value={bio}
              components={{
                // Handle the accidental block styles
                block: {
                  strong: ({ children }) => (
                    <p className="about-strong font-bold">{children}</p>
                  ),
                },
                // Keep existing mark rule for inline bold text
                marks: {
                  strong: ({ children }) => (
                    <strong className="about-strong">{children}</strong>
                  ),
                },
              }}
            />
          </div>

          {education && (
            <p>
              Currently pursuing <strong>{education.degree}</strong> at{" "}
              <strong>{education.institution}</strong>.
            </p>
          )}

          <p>
            <strong>Services</strong>: {services.join(", ")}
            <br />
            <strong>Hobbies</strong>: {hobbies.join(", ")}
          </p>

          {resumeUrl && (
            <button
              onClick={() => handleDownload(resumeUrl, `${name}_Resume.pdf`)}
              className="btn"
              disabled={isDownloading}>
              {isDownloading ? "Downloading..." : "Download Resume"}
            </button>
          )}
        </div>

        {/* Full Image */}
        <div className="about-photo">
          {image && <img src={urlFor(image).url()} alt={name} />}
        </div>
      </div>
    </section>
  );
};

export default About;
