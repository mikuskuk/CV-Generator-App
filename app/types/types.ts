export interface Education {
    school: string;
    degree: string;
    dates: string;
    addinfo: string;
  }
  
  export interface WorkExperience {
    company: string;
    role: string;
    dates: string;
    description: string;
  }

  export interface Project {
    name: string;
    description: string;
  }

  export interface Skills {
    skill: string;
  }

  export interface Languages {
    language: string;
    level: string;
  }
  
  export interface CVData {
    name: string;
    surname: string;
    education: Education[];
    workExperience: WorkExperience[];
    projects: Project[];
    phone: string;
    email: string;
    skills: Skills[];
    languages: Languages[];
    interests: string;
    github: string;
    linkedin: string;
  }
  