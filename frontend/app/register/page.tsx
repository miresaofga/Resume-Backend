"use client";

import { useState } from "react";
import axios from "axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
  await axios.post(`${BACKEND_URL}/api/register`, { email, password, name });
      setSuccess(true);
      // Optionally redirect after a short delay
      setTimeout(() => {
        router.push("/subscription");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
    setLoading(false);
  }

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {success ? (
  <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center border border-gray-300">
          <h2 className="text-2xl font-bold mb-4 text-green-700">Successfully registered!</h2>
          <p className="mb-2">Please check your email for a confirmation message.</p>
          <p className="text-sm text-gray-500">Redirecting to payment...</p>
        </div>
      ) : (
  <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4 border border-gray-300">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          <input
            id="register-name"
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            autoComplete="name"
          />
          <input
            id="register-email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            autoComplete="email"
          />
          <input
            id="register-password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            autoComplete="new-password"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-sm text-center mt-2">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
        </form>
      )}
    </div>
  );
}
