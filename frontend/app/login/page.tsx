"use client";
import { useState } from "react";
import axios from "axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/login`, { email, password });
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        router.push("/subscription");
      } else {
        setError("Login failed: No token received. Please try again or contact support.");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed. Please check your credentials and try again.");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4 border border-gray-300 login-box-fix">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            id="login-email"
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
            id="login-password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            autoComplete="current-password"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <button
          className="w-full bg-gray-300 text-gray-800 py-2 rounded font-semibold hover:bg-gray-400 transition mt-2"
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/resume-demo');
          }}
        >
          Try Demo
        </button>
        <div className="text-sm text-center mt-2">
          <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</a>
        </div>
        <p className="text-sm text-center mt-2">Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a></p>
      </div>
    </div>
  );
}
