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

  export interface Skills {
    skill: string;
  }
  
  export interface CVData {
    name: string;
    surname: string;
    education: Education[];
    workExperience: WorkExperience[];
    phone: string;
    email: string;
    skills: Skills[];
    interests: string;
    github: string;
    linkedin: string;
  }
  