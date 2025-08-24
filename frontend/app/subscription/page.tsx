"use client";
import { useState, useEffect } from "react";
import axios from "axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("success") === "1") {
        window.location.href = "/resume";
      }
      if (params.get("canceled") === "1") {
        setError("Payment canceled or failed. Please try again.");
      }
    }
  }, []);

  async function handlePayment() {
    setLoading(true);
    setError("");
    setMessage("");
    try {
  const res = await axios.post(`${BACKEND_URL}/api/payment/create-checkout-session`, {
        success_url: window.location.origin + "/subscription?success=1",
        cancel_url: window.location.origin + "/subscription?canceled=1",
      });
      window.location.href = res.data.url;
    } catch (err: any) {
      setError(err.response?.data?.error || "Payment failed");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">One-Time Payment</h2>
        <p className="text-center">Pay once to unlock up to 3 downloads of your resume or cover letter. No subscription required.</p>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Pay $5 for 3 Downloads"}
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {message && <div className="text-green-600 text-sm">{message}</div>}
      </div>
    </div>
  );
}
