"use client";
import React, { useState, useEffect } from "react";
import { CVData, Education, WorkExperience, Project, Skills, Languages } from "./types/types";
import { CVForm } from "./components/CVForm"
import { CVPreview } from "./components/CVPreview";

export default function Home() {
  const [cvData, setCVData] = useState<CVData>({
    name: '',
    surname: '',
    education: [] as Education[],
    workExperience: [] as WorkExperience[],
    projects: [] as Project[],
    phone: '',
    email: '',
    skills: [] as Skills[],
    languages: [] as Languages[],
    interests: '',
    github: '',
    linkedin: '',
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(prefersDarkScheme.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setDarkMode(event.matches);
    };

    prefersDarkScheme.addEventListener("change", handleChange);

    return () => {
      prefersDarkScheme.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} flex flex-col justify-center items-center py-6 sm:px-6 lg:px-8`}>
      <div className="max-w-full w-full space-y-8 lg:flex lg:space-y-0 lg:space-x-8">
        <div className="w-full">
          <div className="flex items-center justify-center px-5 sm:px-0">
            <h2 className="mt-6 mb-12 text-center text-3xl font-extrabold ${darkMode ? 'text-gray-100' : 'text-gray-900'}">
              CV Information
            </h2>
          </div>
          <CVForm cvData={cvData} setCVData={setCVData} />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-center px-5 sm:px-0">
            <h2 className="mt-6 text-center text-3xl font-extrabold ${darkMode ? 'text-gray-100' : 'text-gray-900'}">
              CV Generation
            </h2>
          </div>
          <CVPreview cvData={cvData} />
        </div>
      </div>
    </div>
  );
}