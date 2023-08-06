import React, { useEffect, useRef, useState } from 'react';
import { CVData } from '../types/types';
import { LinkedinOutlined, GithubOutlined, UserOutlined, MailOutlined, PhoneOutlined, BookOutlined, PaperClipOutlined, SettingOutlined, ToolOutlined, IdcardOutlined, LaptopOutlined } from '@ant-design/icons';

const [darkMode, setDarkMode] = useState<boolean>(false);

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

  const handleGeneratePDF = () => {
    if (typeof window !== 'undefined') {
      import('html2pdf.js').then((html2pdf) => {
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
      }).catch((error) => {
        console.error('Failed to load html2pdf.js:', error);
      });
    } else {
      console.error('html2pdf.js is not available in the server context.');
    }
  };

  const colors = ['blue', 'green', 'gray', 'purple', 'pink'];
  const fonts = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'];

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm p-4">
        <div ref={cvPreviewRef} id="cv-preview" className={`rounded-md shadow-md bg-white p-8 w-210mm h-297mm ${
          darkMode ? 'text-black' : `text-${selectedColor}-600`
          }`} style={{ fontFamily: selectedFont }}>
          
          <h1 className="text-3xl font-bold mb-2" style={{ color: selectedColor }}>
            {cvData.name} {cvData.surname}
          </h1>

          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4`} style={{ borderColor: selectedColor }}>Information</h2>
          <p className="mb-1 flex items-center"><PhoneOutlined className="mr-1"/>Phone: {cvData.phone}</p>
          <p className="mb-1 flex items-center"><MailOutlined className="mr-1"/>Email: {cvData.email}</p>

          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4`} style={{ borderColor: selectedColor }}>Education</h2>
          {cvData.education.map((edu, index) => (
            <div key={index}>
              <p className="mb-1 flex items-center font-bold"><BookOutlined className="mr-1"/>School: {edu.school}</p>
              <ul className="list-disc ml-8">
                <li className="mb-1 ml-8">Degree: {edu.degree}</li>
                <li className="mb-1 ml-8">Dates: {edu.dates}</li>
                <li className="mb-1 ml-8">Additional Information: {edu.addinfo}</li>
              </ul>
            </div>
          ))}

          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4`} style={{ borderColor: selectedColor }}>Work Experience</h2>
          {cvData.workExperience.map((work, index) => (
            <div key={index}>
              <p className="mb-1 flex items-center font-bold"><ToolOutlined className="mr-1"/>Company: {work.company}</p>
              <ul className="list-disc ml-8">
                <li className="mb-1 ml-8"> Role: {work.role}</li>
                <li className="mb-1 ml-8"> Dates: {work.role}</li>
                <li className="mb-1 ml-8"> Job Description: {work.role}</li>
              </ul>
            </div>
          ))}

          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4`} style={{ borderColor: selectedColor }}>Skills</h2>
          <div>
            <p className="mb-1 flex items-center">
            <SettingOutlined className="mr-1"/>
              {cvData.skills.map((skill, index) => (
                <React.Fragment key={index}>
                  {index > 0 && ", "}
                  {skill.skill}
                </React.Fragment>
              ))}
            </p>
          </div>

          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4`} style={{ borderColor: selectedColor }}>Social Media</h2>
          <p className="mb-1 flex items-center"><GithubOutlined className="mr-1"/>GitHub: {cvData.github}</p>
          <p className="mb-1 flex items-center"><LinkedinOutlined className="mr-1"/>LinkedIn: {cvData.linkedin}</p>

          <h2 className={`text-xl font-semibold border-b-2 pb-2 mb-4 mt-4`} style={{ borderColor: selectedColor }}>Interests</h2>
          <p className="flex items-top"><PaperClipOutlined className="mr-1"/>{cvData.interests}</p>
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
