import "../styles/projects.css";
import { useEffect, useState } from "react";
import sanityClient from "../lib/sanityClient";
import { projectsQuery } from "../lib/sanityQueries";
import ProjectModal from "./ProjectModal";
import { urlFor } from "../lib/imageUrl";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await sanityClient.fetch(projectsQuery);
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <div className="project-card skeleton" key={index}>
        <div className="project-image skeleton-image"></div>
        <div className="project-info">
          <div className="skeleton-title"></div>
          <div className="skeleton-description"></div>
        </div>
      </div>
    ));
  };

  const renderEmpty = () => (
    <div className="empty-projects">
      <p>No projects found at the moment.</p>
      <p className="empty-subtext">Check back later for new work!</p>
    </div>
  );

  return (
    <section className="projects" id="projects">
      <h2>Projects</h2>

      <div className="projects-container">
        {loading
          ? renderSkeletons()
          : projects.length === 0
            ? renderEmpty()
            : projects.map((project) => (
                <div
                  className="project-card"
                  key={project._id}
                  onClick={() => handleProjectClick(project)}>
                  <div className="project-image">
                    <img
                      src={urlFor(project.smallImage).url()}
                      alt={project.title}
                    />
                    <div className="project-overlay">
                      <span>View Project</span>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.shortDescription}</p>
                  </div>
                </div>
              ))}
      </div>

      {!loading && projects.length > 0 && (
        <div className="swipe-container">
          <ArrowLeft className="arrow-left" />
          <span className="swipe-indicator"> Swipe Sideways</span>
          <ArrowRight className="arrow-right" />
        </div>
      )}

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default Projects;
