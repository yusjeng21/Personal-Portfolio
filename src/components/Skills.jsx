import React from "react";
import "../styles/skills.css";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaLinux,
  FaPython,
} from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { SiFigma, SiTypescript } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { FaJava } from "react-icons/fa";

const skillsData = [
  { name: "HTML", icon: <FaHtml5 className="fa-html5" color="#E34F26" /> },
  { name: "CSS", icon: <FaCss3Alt className="fa-css3-alt" color="#1572B6" /> },
  { name: "JavaScript", icon: <FaJs className="fa-js" color="#F7DF1E" /> },
  { name: "React", icon: <FaReact className="fa-react" color="#61DAFB" /> },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="si-tailwindcss" color="#38bdf8" />,
  },
  { name: "Figma", icon: <SiFigma className="si-figma" color="#F24E1E" /> },
  { name: "Git", icon: <FaGitAlt className="fa-git-alt" color="#F05032" /> },
  {
    name: "GitHub",
    icon: <FaGithub className="fa-github" />,
  },
  { name: "Java", icon: <FaJava className="fa-java" color="#ED8B00" /> },
  { name: "TypeScript", icon: <SiTypescript className="fa-js" color="blue" /> },
  { name: "MySQL", icon: <SiMysql className="si-mysql" color="#4479A1" /> },
  { name: "Linux", icon: <FaLinux className="fa-linux" color="#deab11ff" /> },
  { name: "Python", icon: <FaPython className="fa-python" /> },
];

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <h2 className="skills-title">Skills & Tools</h2>
      <div className="skills-grid">
        {skillsData.map((skill, index) => (
          <div className="skill-card" key={index}>
            <div className="skill-icon">{skill.icon}</div>
            <p className="skill-name">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
