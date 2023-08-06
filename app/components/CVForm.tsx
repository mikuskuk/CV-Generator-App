import React, { ChangeEvent } from 'react';
import { CVData, Education, WorkExperience } from '../types/types';
import { Input, Button, Space } from 'antd';
import { BookOutlined, PaperClipOutlined, SettingOutlined, ToolOutlined, IdcardOutlined, LaptopOutlined } from '@ant-design/icons';

interface CVFormProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

const { TextArea } = Input;

export const CVForm: React.FC<CVFormProps> = ({ cvData, setCVData }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCVData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddEducation = () => {
    setCVData((prevData) => ({
      ...prevData,
      education: [...prevData.education, { school: '', degree: '', dates: '', addinfo: '' }],
    }));
  };

  const handleDeleteEducation = (index: number) => {
    setCVData((prevData) => {
      const updatedEducation = [...prevData.education];
      updatedEducation.splice(index, 1);
      return { ...prevData, education: updatedEducation };
    });
  };

  const handleAddWorkExperience = () => {
    setCVData((prevData) => ({
      ...prevData,
      workExperience: [...prevData.workExperience, { company: '', role: '', dates: '', description: '' }],
    }));
  };

  const handleDeleteWorkExperience = (index: number) => {
    setCVData((prevData) => {
      const updatedWorkExperience = [...prevData.workExperience];
      updatedWorkExperience.splice(index, 1);
      return { ...prevData, workExperience: updatedWorkExperience };
    });
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    setCVData((prevData) => {
      const updatedEducation = [...prevData.education];
      updatedEducation[index][field] = value;
      return { ...prevData, education: updatedEducation };
    });
  };

  const handleWorkExperienceChange = (index: number, field: keyof WorkExperience, value: string) => {
    setCVData((prevData) => {
      const updatedWorkExperience = [...prevData.workExperience];
      updatedWorkExperience[index][field] = value;
      return { ...prevData, workExperience: updatedWorkExperience };
    });
  };

  const handleAddSkill = () => {
    setCVData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, { skill: '' }],
    }));
  };

  const handleDeleteSkill = (index: number) => {
    setCVData((prevData) => {
      const updatedSkills = [...prevData.skills];
      updatedSkills.splice(index, 1);
      return { ...prevData, skills: updatedSkills };
    });
  };

  const handleSkillChange = (index: number, value: string) => {
    setCVData((prevData) => {
      const updatedSkills = [...prevData.skills];
      updatedSkills[index].skill = value;
      return { ...prevData, skills: updatedSkills };
    });
  };

  const handleInterestChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCVData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center"><IdcardOutlined className="mr-2"/>Information</h2>
        <Input
            type="text"
            name="name"
            value={cvData.name || ''}
            onChange={handleInputChange}
            placeholder="Name"
            className="input mr-4 w-1/3"
        />
        <Input
            type="text"
            name="surname"
            value={cvData.surname || ''}
            onChange={handleInputChange}
            placeholder="Surname"
            className="input mr-4 w-1/3"
        />
        <div>
            <Input
                type="text"
                name="phone"
                value={cvData.phone || ''}
                onChange={handleInputChange}
                placeholder="Phone"
                className="input mr-4 w-1/3"
            />
            <Input
                type="text"
                name="email"
                value={cvData.email || ''}
                onChange={handleInputChange}
                placeholder="Email"
                className="input mr-4 w-1/3"
            />
        </div>

        
      <h2 className="text-xl font-semibold flex items-center"><BookOutlined className="mr-2"/>Education</h2>
        {cvData.education.map((edu, index) => (
            <div key={index} className="space-y-2">
            <Input
                type="text"
                name={`education[${index}].school`}
                value={edu.school}
                onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                placeholder="School"
                className="input mr-4 w-1/3"
            />
            <Input
                type="text"
                name={`education[${index}].degree`}
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                placeholder="Degree"
                className="input mr-4 w-1/3"
            />
            <Input
                type="text"
                name={`education[${index}].dates`}
                value={edu.dates}
                onChange={(e) => handleEducationChange(index, 'dates', e.target.value)}
                placeholder="Dates"
                className="input mr-4 w-1/3"
            />
            <Input
                type="text"
                name={`education[${index}].addinfo`}
                value={edu.addinfo}
                onChange={(e) => handleEducationChange(index, 'addinfo', e.target.value)}
                placeholder="Additional Information"
                className="input mr-4 w-1/3"
            />
            <Button
                className="mt-1 inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-small text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => handleDeleteEducation(index)}
                >
                Delete Education
            </Button>
            </div>
        ))}
        <Button
            className="mt-1 inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-small text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleAddEducation}
            >
            Add Education
        </Button>
    
      <h2 className="text-xl font-semibold flex items-center"><ToolOutlined className="mr-2"/>Work Experience</h2>
        {cvData.workExperience.map((work, index) => (
            <div key={index} className="space-y-2">
            <Input
                type="text"
                name={`workExperience[${index}].company`}
                value={work.company}
                onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                placeholder="Company"
                className="input mr-4 w-1/3"
            />
            <Input
                type="text"
                name={`workExperience[${index}].role`}
                value={work.role}
                onChange={(e) => handleWorkExperienceChange(index, 'role', e.target.value)}
                placeholder="Role"
                className="input mr-4 w-1/3"
            />
            <Input
                type="text"
                name={`workExperience[${index}].dates`}
                value={work.dates}
                onChange={(e) => handleWorkExperienceChange(index, 'dates', e.target.value)}
                placeholder="Dates"
                className="input mr-4 w-1/3"
            />
            <Input
                type="text"
                name={`workExperience[${index}].description`}
                value={work.description}
                onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                placeholder="Job Description"
                className="input mr-4 w-1/3"
            />
            <Button
                className="mt-1 inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-small text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => handleDeleteWorkExperience(index)}
                >
                Delete Work Experience
            </Button>
            </div>
        ))}
        <Button
            className="mt-1 inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-small text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleAddWorkExperience}
        >
            Add Work Experience
        </Button>

      <h2 className="text-xl font-semibold flex items-center"><SettingOutlined className="mr-2"/>Skills</h2>
        {cvData.skills.map((skill, index) => (
            <div key={index} className="space-y-2">
            <Input
                type="text"
                name={`skills[${index}].skill`}
                value={skill.skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder="Skill"
                className="input mr-4 w-1/3"
            />
            <Button
                className="mt-1 inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-small text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => handleDeleteSkill(index)}
            >
                Delete Skill
            </Button>
            </div>
        ))}
        <Button
            className="mt-1 inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-small text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleAddSkill}
        >
            Add Skill
        </Button>

      <h2 className="text-xl font-semibold flex items-center"><LaptopOutlined className="mr-2"/>Social Media</h2>
        <Input
            type="text"
            name="github"
            value={cvData.github || ''}
            onChange={handleInputChange}
            placeholder="GitHub Profile"
            className="input mr-4 w-1/3"
        />
        <Input
            type="text"
            name="linkedin"
            value={cvData.linkedin || ''}
            onChange={handleInputChange}
            placeholder="LinkedIn Profile"
            className="input w-1/3"
        />
      
      <h2 className="text-xl font-semibold flex items-center"><PaperClipOutlined className="mr-2"/>Interests</h2>
        <TextArea
            name="interests"
            value={cvData.interests || ''}
            onChange={handleInterestChange}
            placeholder="Interests"
            className="input w-9/12"
            rows={3}
        />
    </div>
    
  );
};
