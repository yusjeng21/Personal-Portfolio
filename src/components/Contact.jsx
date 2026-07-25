import React, { useEffect, useState, useRef } from "react";
import sanityClient from "../lib/sanityClient";
import { contactQuery } from "../lib/sanityQueries";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone } from "lucide-react";
import "../styles/contact.css";

export default function Contact() {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await sanityClient.fetch(contactQuery);
        setContactData(data);
      } catch (error) {
        console.error("Failed to fetch contact data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  const clearStatusOnTyping = () => {
    if (statusMessage.text) {
      setStatusMessage({ text: "", type: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage({ type: "", text: "" });

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatusMessage({
            type: "success",
            text: "Message sent successfully! I'll get back to you soon.",
          });
          // Clear the form fields
          formRef.current.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setStatusMessage({
            type: "error",
            text: "Oops! Something went wrong. Please try again later.",
          });
        },
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  // Loading skeleton
  if (loading) {
    return (
      <section className="contact skeleton-contact" id="contact">
        <div className="container contact__wrap">
          <header className="contact__header">
            <h1
              className="skeleton-text"
              style={{
                width: "200px",
                height: "2.8rem",
                margin: "0 auto",
              }}></h1>
            <p
              className="skeleton-text"
              style={{
                width: "60%",
                height: "1.5rem",
                margin: "8px auto 0",
              }}></p>
          </header>

          <div className="contact__grid">
            <div className="contact__info">
              <h3
                className="skeleton-text"
                style={{ width: "200px", height: "2rem" }}></h3>
              <p
                className="skeleton-text"
                style={{ width: "100%", height: "4rem" }}></p>
              <ul className="contact__list">
                {[1, 2, 3].map((i) => (
                  <li key={i}>
                    <span className="icon skeleton-icon"></span>
                    <div>
                      <div
                        className="label skeleton-text"
                        style={{ width: "60px", height: "1rem" }}></div>
                      <div
                        className="skeleton-text"
                        style={{ width: "150px", height: "1rem" }}></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact__form skeleton-form">
              <div className="row">
                <div className="field">
                  <div
                    className="skeleton-text"
                    style={{ width: "80px", height: "1rem" }}></div>
                  <div className="skeleton-input"></div>
                </div>
                <div className="field">
                  <div
                    className="skeleton-text"
                    style={{ width: "80px", height: "1rem" }}></div>
                  <div className="skeleton-input"></div>
                </div>
              </div>
              <div className="field">
                <div
                  className="skeleton-text"
                  style={{ width: "80px", height: "1rem" }}></div>
                <div className="skeleton-input"></div>
              </div>
              <div className="field">
                <div
                  className="skeleton-text"
                  style={{ width: "80px", height: "1rem" }}></div>
                <div className="skeleton-textarea"></div>
              </div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!contactData)
    return (
      <div className="empty-contact">
        <p>Failed to load Contact data.</p>
        <p className="empty-subtext">Try refreshing the page.</p>
      </div>
    );

  const {
    sectionTitle,
    sectionSubtitle,
    infoTitle,
    infoDescription,
    email,
    phone,
    location,
    locationLink,
  } = contactData;

  return (
    <section id="contact" className="contact">
      <div className="container contact__wrap">
        <header className="contact__header">
          <h1>{sectionTitle}</h1>
          <p className="contact__sub">{sectionSubtitle}</p>
        </header>

        <div className="contact__grid">
          {/* Details */}
          <div className="contact__info">
            <h3>{infoTitle}</h3>
            <p className="muted">{infoDescription}</p>

            <ul className="contact__list">
              <li>
                <span className="icon" aria-hidden>
                  {/* mail */}
                  <Mail size={25} />
                </span>
                <div>
                  <div className="label">Email</div>
                  <a
                    href={`mailto:${email}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    {email}
                  </a>
                </div>
              </li>

              <li>
                <span className="icon" aria-hidden>
                  {/* phone */}
                  <Phone size={25} />
                </span>
                <div>
                  <div className="label">Phone</div>
                  <a
                    href={`tel:${phone}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    {phone}
                  </a>
                </div>
              </li>

              <li>
                <span className="icon" aria-hidden>
                  {/* location pin */}
                  <MapPin size={25} />
                </span>
                <div>
                  <div className="label">Location</div>
                  <a
                    href={locationLink}
                    target="_blank"
                    rel="noopener noreferrer">
                    {location}
                  </a>{" "}
                </div>
              </li>
            </ul>
          </div>
          {/* Form */}
          <div>
            <form
              ref={formRef}
              className="contact__form"
              onSubmit={handleSubmit}
              onInput={clearStatusOnTyping}>
              {/* Status Alert */}
              {statusMessage.text && (
                <div className={`alert alert--${statusMessage.type}`}>
                  {statusMessage.text}
                </div>
              )}
              <div className="row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  placeholder="Project, idea, or question"
                />
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Write your message here…"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSending}>
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>{" "}
          </div>
        </div>
      </div>
    </section>
  );
}
