

"use client";
import { useState } from "react";
import Link from "next/link";

export default function ResumeDemoPage() {
  const [resume, setResume] = useState("Your generated resume will appear here...");


  function handleGenerate() {
    setResume(
      `<div style=\"display: flex; flex-direction: column; gap: 1.5rem;\">
        <div style=\"display: flex; justify-content: space-between; align-items: flex-end;\">
          <div>
            <h2 style=\"font-size:2.2rem; font-weight:900; color:#1e40af; margin:0;\">John Doe</h2>
            <div style=\"color:#2563eb; font-weight:600; font-size:1.1rem;\">Senior Software Engineer</div>
          </div>
          <div style=\"text-align:right; color:#64748b; font-size:1rem;\">
            <div>john.doe@email.com</div>
            <div>San Francisco, CA</div>
            <div>linkedin.com/in/johndoe</div>
          </div>
        </div>
        <div style=\"margin-top:1.2rem;\">
          <div style=\"color:#6366f1; font-weight:700; font-size:1.15rem; letter-spacing:0.02em; margin-bottom:0.5rem;\">Professional Summary</div>
          <div style=\"color:#334155;\">Results-driven software engineer with 6+ years of experience designing, developing, and deploying scalable web applications. Expert in React, Node.js, and cloud technologies. Proven leader with a passion for innovation, code quality, and mentoring teams to deliver impactful solutions.</div>
        </div>
        <div style=\"display: flex; gap:2rem; flex-wrap:wrap; margin-top:1.2rem;\">
          <div style=\"flex:2; min-width:220px;\">
            <div style=\"margin-bottom:0.5rem; color:#6366f1; font-weight:700; font-size:1.1rem; letter-spacing:0.02em;\">Key Skills</div>
            <ul style=\"margin:0; padding-left:1.2em; color:#334155;\">
              <li>JavaScript, TypeScript, Python</li>
              <li>React, Next.js, Redux</li>
              <li>Node.js, Express, REST APIs</li>
              <li>PostgreSQL, MongoDB, Prisma</li>
              <li>AWS, Docker, CI/CD</li>
              <li>Agile & Scrum, Team Leadership</li>
            </ul>
          </div>
          <div style=\"flex:1; min-width:180px;\">
            <div style=\"margin-bottom:0.5rem; color:#6366f1; font-weight:700; font-size:1.1rem; letter-spacing:0.02em;\">Certifications</div>
            <ul style=\"margin:0; padding-left:1.2em; color:#334155;\">
              <li>AWS Certified Developer</li>
              <li>Scrum Master (CSM)</li>
            </ul>
          </div>
        </div>
        <div style=\"margin-top:1.2rem;\">
          <div style=\"color:#6366f1; font-weight:700; font-size:1.1rem; letter-spacing:0.02em; margin-bottom:0.5rem;\">Professional Experience</div>
          <div style=\"color:#334155;\">
            <div style=\"margin-bottom:0.5em;\"><span style=\"font-weight:600;\">Senior Frontend Engineer</span> at TechCorp <span style=\"color:#64748b;\">(2022-2025)</span><br/>- Led a team of 5 engineers to deliver a SaaS platform used by 100k+ users.<br/>- Architected and implemented a micro-frontend system with React and Next.js.<br/>- Improved performance and accessibility, resulting in a 30% increase in user engagement.</div>
            <div style=\"margin-bottom:0.5em;\"><span style=\"font-weight:600;\">Software Engineer</span> at WebStart <span style=\"color:#64748b;\">(2020-2022)</span><br/>- Developed RESTful APIs and integrated third-party services.<br/>- Automated CI/CD pipelines and cloud deployments on AWS.</div>
          </div>
        </div>
        <div style=\"margin-top:1.2rem;\">
          <div style=\"color:#6366f1; font-weight:700; font-size:1.1rem; letter-spacing:0.02em; margin-bottom:0.5rem;\">Education</div>
          <div style=\"color:#334155;\">B.Sc. in Computer Science, University of Example (2016-2020)</div>
        </div>
        <div style=\"margin-top:1.2rem;\">
          <div style=\"color:#6366f1; font-weight:700; font-size:1.1rem; letter-spacing:0.02em; margin-bottom:0.5rem;\">Projects & Awards</div>
          <div style=\"color:#334155;\">- Winner, 2024 National Hackathon<br/>- Open-source contributor to React ecosystem<br/>- Speaker at JSConf 2025</div>
        </div>
      </div>`
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-4 sm:py-8 relative">
      {/* Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none opacity-10 z-0">
        <span className="text-7xl font-extrabold text-blue-900">DEMO</span>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-4 sm:p-8 z-10 relative">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-900 mb-2 text-center">AI Resume Builder</h1>
        <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Generate a professional resume or cover letter in seconds using AI. Fill in your details, add any special instructions, and let AI do the rest!</p>
        <div className="mb-4 p-2 sm:p-3 rounded bg-yellow-100 border border-yellow-400 text-yellow-900 text-center font-semibold text-xs sm:text-base">
          Demo Mode: Try generating a resume or cover letter! Download and copy are disabled. <br />
          <Link href="/register" className="text-blue-700 underline hover:text-blue-900">Register</Link> or <Link href="/login" className="text-blue-700 underline hover:text-blue-900">Login</Link> to unlock all features.
        </div>
        {/* Demo form (disabled actions) */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <button className="px-4 sm:px-6 py-2 rounded-full font-semibold border bg-blue-700 text-white border-blue-700 text-xs sm:text-base">Resume</button>
          <button className="px-4 sm:px-6 py-2 rounded-full font-semibold border bg-white text-blue-700 border-blue-700 hover:bg-blue-50 text-xs sm:text-base">Cover Letter</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-2 sm:mb-4">
          <input className="border p-2 rounded text-xs sm:text-base bg-gray-100 text-gray-700 placeholder-gray-500" name="name" placeholder="Full Name" />
          <input className="border p-2 rounded text-xs sm:text-base bg-gray-100 text-gray-700 placeholder-gray-500" name="email" placeholder="Email" />
          <input className="border p-2 rounded text-xs sm:text-base bg-gray-100 text-gray-700 placeholder-gray-500" name="jobTitle" placeholder="Job Title" />
          <input className="border p-2 rounded text-xs sm:text-base bg-gray-100 text-gray-700 placeholder-gray-500" name="skills" placeholder="Skills (comma separated)" />
        </div>
        <div className="grid gap-2 sm:gap-4 mb-2 sm:mb-4">
          <textarea className="border p-2 rounded text-xs sm:text-base bg-gray-100 text-gray-700 placeholder-gray-500" name="summary" placeholder="Professional Summary" rows={2} />
          <textarea className="border p-2 rounded text-xs sm:text-base bg-gray-100 text-gray-700 placeholder-gray-500" name="education" placeholder="Education" rows={2} />
          <textarea className="border p-2 rounded text-xs sm:text-base bg-gray-100 text-gray-700 placeholder-gray-500" name="experience" placeholder="Experience" rows={2} />
          <textarea className="border p-2 rounded text-xs sm:text-base bg-gray-100 text-gray-700 placeholder-gray-500" name="custom" placeholder="Custom instructions or job description (optional)" rows={2} />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-2 sm:mb-4 justify-center">
          <button
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-bold text-xs sm:text-base"
            onClick={handleGenerate}
          >
            Generate Resume
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 rounded-lg font-bold opacity-60 cursor-not-allowed text-xs sm:text-base" disabled>Copy</button>
        </div>
        <div className="mb-2 sm:mb-4">
          <div
            className="w-full min-h-[120px] sm:min-h-[200px] rounded-2xl shadow-lg bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-200 p-6 sm:p-8 flex flex-col gap-2 select-text"
            style={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '1.05rem', lineHeight: '1.7', letterSpacing: '0.01em', color: '#1e293b' }}
            tabIndex={0}
            dangerouslySetInnerHTML={{ __html: resume }}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-2 justify-center">
          <button className="bg-purple-700 text-white px-4 py-2 rounded opacity-60 cursor-not-allowed text-xs sm:text-base">Download PDF</button>
          <button className="bg-indigo-700 text-white px-4 py-2 rounded opacity-60 cursor-not-allowed text-xs sm:text-base">Download DOCX</button>
        </div>
      </div>
    </div>
  );
}






