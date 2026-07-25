// Projects query
export const projectsQuery = `
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    fullDescription,
    smallImage,
    fullImage,
    liveLink,
    github,
    technologies,
    category,
    status,
    featured,
    year,
    order
  }
`;

// Hero section query
export const heroQuery = `*[_type == "hero"][0] {
  avatar,
  greeting,
  name,
  role,
  description,
  "resumeUrl": resume.asset->url,
  github,
  linkedin,
  gmail,
  figma,
  instagram,
  socials,
}`;

// About section query
export const aboutQuery = `*[_type == "about"][0] {
  image,
  name,
  bio,
  education {
    degree,
    institution
  },
  services,
  hobbies,
  "resumeUrl": resume.asset->url,
}`;

// Contact & Footer section query
export const contactQuery = `*[_type == "contact"][0] {
  sectionTitle,
  sectionSubtitle,
  infoTitle,
  infoDescription,
  email,
  phone,
  location,
  locationLink,
  socialLinks[] {
    platform,
    url
  },
  tagline,
  copyright,
  socialsText,
  socialsLink,
}`;
