
"use client";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);
    // TODO: Connect to backend API for password reset
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    // Simulate success
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password?</h1>
        <p className="mb-4 text-gray-600 text-center">Enter your email and we'll send you a link to reset your password.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
          >Send Reset Link</button>
        </form>
        {submitted && (
          <div className="mt-4 text-green-700 text-center">
            If an account exists for <b>{email}</b>, a reset link has been sent.
          </div>
        )}
      </div>
    </div>
  );
}
