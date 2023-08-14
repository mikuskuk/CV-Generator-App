import React, { useEffect, useRef, useState } from 'react';
import { CVData } from '../types/types';
import { LinkedinOutlined, GithubOutlined, UserOutlined, MailOutlined, PhoneOutlined, BookOutlined, PaperClipOutlined, SettingOutlined, ToolOutlined, IdcardOutlined, LaptopOutlined, CommentOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const cvPreviewRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>('blue');
  const [selectedFont, setSelectedFont] = useState<string>('sans-serif');

  useEffect(() => {
    setSelectedColor('blue');
  }, []);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
  };

  const handleGeneratePDF = async () => {
    if (typeof window !== 'undefined') {
      try {
        const html2pdfModule = await import('html2pdf.js');
        const html2pdf = html2pdfModule.default;
  
        const element = cvPreviewRef.current;
        const opt = {
          margin: 10,
          filename: 'cv.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, removeContainer: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
  
        if (element) {
          html2pdf().from(element).set(opt).save();
        }
      } catch (error) {
        console.error('Failed to load html2pdf.js:', error);
      }
    } else {
      console.error('html2pdf.js is not available in the server context.');
    }
  };
  

  const colors = ['blue', 'green', 'gray', 'purple', 'pink'];
  const fonts = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'];

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm p-4">
        <div ref={cvPreviewRef} id="cv-preview" className={`rounded-md shadow-md bg-white p-8 w-210mm h-297mm`} style={{ fontFamily: selectedFont }}>
          
          <h1 className="text-3xl font-bold mb-2" style={{ color: selectedColor }}>
            {cvData.name} {cvData.surname}
          </h1>

          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4 text-black`} style={{ borderColor: selectedColor }}>Information</h2>
          <p className="mb-1 flex items-center text-black"><PhoneOutlined className="mr-1"/>Phone: {cvData.phone}</p>
          <p className="mb-1 flex items-center text-black"><MailOutlined className="mr-1"/>Email: {cvData.email}</p>

          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4 text-black`} style={{ borderColor: selectedColor }}>Education</h2>
          {cvData.education.map((edu, index) => (
            <div key={index}>
              <p className="mb-1 flex items-center font-bold text-black"><BookOutlined className="mr-1"/>School: {edu.school}</p>
              <ul className="list-disc ml-8">
                <li className="mb-1 ml-8 text-black">Degree: {edu.degree}</li>
                <li className="mb-1 ml-8 text-black">Dates: {edu.dates}</li>
                <li className="mb-1 ml-8 text-black">Additional Information: {edu.addinfo}</li>
              </ul>
            </div>
          ))}

          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4 text-black`} style={{ borderColor: selectedColor }}>Work Experience</h2>
          {cvData.workExperience.map((work, index) => (
            <div key={index}>
              <p className="mb-1 flex items-center font-bold text-black"><ToolOutlined className="mr-1"/>Company: {work.company}</p>
              <ul className="list-disc ml-8">
                <li className="mb-1 ml-8 text-black"> Role: {work.role}</li>
                <li className="mb-1 ml-8 text-black"> Dates: {work.role}</li>
                <li className="mb-1 ml-8 text-black"> Job Description: {work.role}</li>
              </ul>
            </div>
          ))}

          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4 text-black`} style={{ borderColor: selectedColor }}>Projects</h2>
          <div>
            {cvData.projects.map((project, index) => (
              <div key={index}>
                <p className="mb-1 flex items-center font-bold text-black"><FundProjectionScreenOutlined className="mr-1"/>Project: {project.name}</p>
                <p className="mb-1 ml-8 text-black">Description: {project.description}</p>
              </div>
            ))}
          </div>


          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4 text-black`} style={{ borderColor: selectedColor }}>Skills</h2>
          <div>
            <p className="mb-1 flex items-center text-black">
            <SettingOutlined className="mr-1"/>
              {cvData.skills.map((skill, index) => (
                <React.Fragment key={index}>
                  {index > 0 && ", "}
                  {skill.skill}
                </React.Fragment>
              ))}
            </p>
          </div>

          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4 text-black`} style={{ borderColor: selectedColor }}>Languages</h2>
          <div>
            <ul className="list-disc">
              {cvData.languages.map((language, index) => (
                <li key={index} className="mb-1 flex items-center text-black">
                  <CommentOutlined className="mr-1"/>
                  {language.language} | {language.level}
                </li>
              ))}
            </ul>
          </div>

          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4 text-black`} style={{ borderColor: selectedColor }}>Social Media</h2>
          <p className="mb-1 flex items-center text-black"><GithubOutlined className="mr-1"/>GitHub: {cvData.github}</p>
          <p className="mb-1 flex items-center text-black"><LinkedinOutlined className="mr-1"/>LinkedIn: {cvData.linkedin}</p>

          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4 text-black`} style={{ borderColor: selectedColor }}>Interests</h2>
          <p className="flex items-top text-black"><PaperClipOutlined className="mr-1"/>{cvData.interests}</p>
        </div>

        <div className="flex items-center mb-4">
            <span className="mr-2 mt-2">Choose CV Color:</span>
                {colors.map((color) => (
                <label key={color} className={`mr-2 cursor-pointer text-${color}-500`}>
                    <input
                    type="radio"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => handleColorChange(color)}
                    className="mr-1 mt-3"
                    />
                    {color}
                </label>
                ))}
        </div>

        <div className="flex items-center mb-4">
            <span className="mr-2">Choose Font Style:</span>
                {fonts.map((font) => (
                    <label key={font} className="mr-2 cursor-pointer">
                    <input
                        type="radio"
                        value={font}
                        checked={selectedFont === font}
                        onChange={() => handleFontChange(font)}
                        className="mr-1"
                    />
                    {font}
                    </label>
                ))}
        </div>

        <button
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleGeneratePDF}
        >
          Generate PDF
        </button>

      </div>
    </div>
  );
};
