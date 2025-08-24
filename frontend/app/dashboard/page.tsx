"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    axios.get("http://localhost:4000/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setUser(res.data))
      .catch(() => {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, [router]);

  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  if (!user) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome, {user.name || user.email}!</h2>
        <p className="text-center">This is your dashboard. More features coming soon!</p>
        <button
          className="w-full bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300 transition mt-4"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
