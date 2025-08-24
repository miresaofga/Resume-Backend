import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 p-6">
      <div className="bg-white/90 rounded-3xl shadow-xl max-w-2xl w-full p-8">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4">Terms of Service</h1>
        <p className="mb-4 text-blue-800">By using our Resume & Cover Letter Builder, you agree to the following terms:</p>
        <ul className="list-disc pl-6 text-blue-700 mb-4">
          <li>All content generated is for personal use only and may not be resold or redistributed.</li>
          <li>One-time payment grants you 3 downloads per purchase.</li>
          <li>Users must not misuse the service or attempt unauthorized access.</li>
          <li>Refunds are not provided except as required by law.</li>
          <li>Service is provided "as is" without warranties of any kind.</li>
          <li>We reserve the right to update these terms or discontinue the service at any time.</li>
          <li>Our liability is limited to the maximum extent permitted by law.</li>
          <li>These terms are governed by the laws of your jurisdiction.</li>
        </ul>
  <p className="text-blue-700">For questions, contact us at <a href="mailto:feskenai@gmail.com" className="underline text-blue-500">feskenai@gmail.com</a>.</p>
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-700 font-bold underline">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
