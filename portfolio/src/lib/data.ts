import dbData from "../../data/db.json";

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  live: string;
  technologies: string[];
}

export const personalInfo = dbData.personalInfo;
export const aboutMe = dbData.aboutMe;
export const experiences = dbData.experiences as Experience[];
export const projects = dbData.projects as Project[];
export const skills = dbData.skills;
