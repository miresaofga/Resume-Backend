
"use client";

// ResumePreview component moved to the end of the file
type ResumePreviewProps = {
  content: string;
};

function ResumePreview({ content }: ResumePreviewProps) {
  return (
    <div className="border rounded p-4 bg-white shadow">
      <pre className="whitespace-pre-wrap font-mono text-gray-800">{content}</pre>
    </div>
  );
}

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";


function ResumePageContent() {
    const searchParams = useSearchParams();
    const isDemo = searchParams?.get("demo") === "1";
    const [tab, setTab] = useState<"resume" | "cover_letter">("resume");
    const [fields, setFields] = useState({
      name: "",
      email: "",
      jobTitle: "",
      summary: "",
      education: "",
      experience: "",
      skills: "",
      custom: "",
      content: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [downloadError, setDownloadError] = useState("");
    const [showScreenshotWarning, setShowScreenshotWarning] = useState(false);

    // Prevent text selection and right-click in demo mode
    useEffect(() => {
      if (!isDemo) return;
      const preventDefault = (e: Event) => e.preventDefault();
      document.addEventListener("contextmenu", preventDefault);
      document.addEventListener("selectstart", preventDefault);
      // Attempt to detect PrintScreen (not reliable on all browsers)
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "PrintScreen") {
          setShowScreenshotWarning(true);
          setTimeout(() => setShowScreenshotWarning(false), 2000);
        }
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("contextmenu", preventDefault);
        document.removeEventListener("selectstart", preventDefault);
        window.removeEventListener("keydown", onKeyDown);
      };
    }, [isDemo]);

    const handleField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields({ ...fields, [e.target.name]: e.target.value });
    };

    const handleTab = (t: "resume" | "cover_letter") => {
      setTab(t);
      setFields(f => ({ ...f, content: "" }));
      setError("");
      setSuccess("");
    };

    const handleGenerate = async () => {
      setLoading(true);
      setError("");
      setSuccess("");
      setFields(f => ({ ...f, content: "" }));
      try {
        const prompt = tab === "resume"
          ? `Generate a professional resume for the following details. Name: ${fields.name}. Email: ${fields.email}. Job Title: ${fields.jobTitle}. Summary: ${fields.summary}. Education: ${fields.education}. Experience: ${fields.experience}. Skills: ${fields.skills}. Additional Instructions: ${fields.custom}`
          : `Write a professional cover letter for the following details. Name: ${fields.name}. Email: ${fields.email}. Job Title: ${fields.jobTitle}. Summary: ${fields.summary}. Education: ${fields.education}. Experience: ${fields.experience}. Skills: ${fields.skills}. Additional Instructions: ${fields.custom}`;
        const res = await axios.post(`${BACKEND_URL}/api/ai/generate`, { prompt });
        setFields(f => ({ ...f, content: res.data.result }));
        setSuccess("AI generation complete!");
      } catch (err: any) {
        setError(err?.response?.data?.error || "AI generation failed");
      } finally {
        setLoading(false);
      }
    };

    const handleDownload = async (format: "pdf" | "docx") => {
      if (isDemo) return;
      setDownloadError("");
      try {
        const blob = new Blob([fields.content], { type: format === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `document.${format}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      } catch (err: any) {
        setDownloadError("Download failed");
      }
    };

    const handleCopy = () => {
      if (isDemo) return;
      if (fields.content) {
        navigator.clipboard.writeText(fields.content);
        setSuccess("Copied to clipboard!");
        setTimeout(() => setSuccess(""), 1500);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-8">
        {showScreenshotWarning && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white text-red-600 font-bold text-lg rounded-xl px-8 py-6 shadow-xl border-2 border-red-400">
              Screenshots are not allowed in demo mode.
            </div>
          </div>
        )}
        <div className={`w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 ${isDemo ? "select-none" : ""}`} style={isDemo ? { userSelect: "none", pointerEvents: "auto" } : {}}>
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2 text-center">AI Resume Builder</h1>
          <p className="text-center text-gray-600 mb-6">Generate a professional resume or cover letter in seconds using AI. Fill in your details, add any special instructions, and let AI do the rest!</p>
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-6 py-2 rounded-full font-semibold border transition-all duration-150 ${tab === "resume" ? "bg-blue-700 text-white border-blue-700" : "bg-white text-blue-700 border-blue-700 hover:bg-blue-50"}`}
              onClick={() => handleTab("resume")}
            >Resume</button>
            <button
              className={`px-6 py-2 rounded-full font-semibold border transition-all duration-150 ${tab === "cover_letter" ? "bg-blue-700 text-white border-blue-700" : "bg-white text-blue-700 border-blue-700 hover:bg-blue-50"}`}
              onClick={() => handleTab("cover_letter")}
            >Cover Letter</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input className="border p-2 rounded" name="name" placeholder="Full Name" value={fields.name} onChange={handleField} disabled={isDemo} />
            <input className="border p-2 rounded" name="email" placeholder="Email" value={fields.email} onChange={handleField} disabled={isDemo} />
            <input className="border p-2 rounded" name="jobTitle" placeholder="Job Title" value={fields.jobTitle} onChange={handleField} disabled={isDemo} />
            <input className="border p-2 rounded" name="skills" placeholder="Skills (comma separated)" value={fields.skills} onChange={handleField} disabled={isDemo} />
          </div>
          <div className="grid gap-4 mb-4">
            <textarea className="border p-2 rounded" name="summary" placeholder="Professional Summary" value={fields.summary} onChange={handleField} rows={2} disabled={isDemo} />
            <textarea className="border p-2 rounded" name="education" placeholder="Education" value={fields.education} onChange={handleField} rows={2} disabled={isDemo} />
            <textarea className="border p-2 rounded" name="experience" placeholder="Experience" value={fields.experience} onChange={handleField} rows={2} disabled={isDemo} />
            <textarea className="border p-2 rounded" name="custom" placeholder="Custom instructions or job description (optional)" value={fields.custom} onChange={handleField} rows={2} disabled={isDemo} />
          </div>
          <div className="flex gap-4 mb-4 justify-center">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition-all"
              onClick={handleGenerate}
              disabled={loading || isDemo}
            >{loading ? "Generating..." : `Generate ${tab === "resume" ? "Resume" : "Cover Letter"}`}</button>
            <button
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-300"
              onClick={handleCopy}
              disabled={!fields.content || isDemo}
            >Copy</button>
          </div>
          {isDemo && <div className="text-red-500 text-center mb-2 font-semibold">Demo mode: Download, copy, and screenshots are disabled.</div>}
          {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
          {success && <div className="text-green-700 mb-2 text-center">{success}</div>}
          <div className="mb-4">
            <textarea
              className="border p-3 rounded w-full min-h-[200px] font-mono text-sm bg-gray-50"
              name="content"
              placeholder={tab === "resume" ? "Your generated resume will appear here..." : "Your generated cover letter will appear here..."}
              value={fields.content}
              onChange={handleField}
              readOnly
              style={isDemo ? { userSelect: "none" } : {}}
            />
          </div>
          {/* Styled Resume Preview */}
          {fields.content && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Preview</h2>
              <ResumePreview content={fields.content} />
            </div>
          )}
          <div className="flex gap-4 mb-2 justify-center">
            <button
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 disabled:opacity-50"
              onClick={() => handleDownload("pdf")}
              disabled={!fields.content || isDemo}
            >Download PDF</button>
            <button
              className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800 disabled:opacity-50"
              onClick={() => handleDownload("docx")}
              disabled={!fields.content || isDemo}
            >Download DOCX</button>
          </div>
          {downloadError && <div className="text-red-600 mb-2 text-center">{downloadError}</div>}
        </div>
      </div>
  );
}

export default function ResumePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumePageContent />
    </Suspense>
  );
}
