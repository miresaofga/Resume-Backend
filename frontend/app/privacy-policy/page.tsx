import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 p-6">
      <div className="bg-white/90 rounded-3xl shadow-xl max-w-2xl w-full p-8">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4">Privacy Policy</h1>
        <p className="mb-4 text-blue-800">We value your privacy. Your data is never sold or shared with third parties. All information is securely stored and only used to provide our resume and cover letter services. You may request deletion of your data at any time.</p>
        <ul className="list-disc pl-6 text-blue-700 mb-4">
          <li>We do not store your resume/cover letter content after download.</li>
          <li>Payment information is processed securely via Stripe; we do not store card details.</li>
          <li>We use cookies only for authentication and session management.</li>
          <li>All data is encrypted in transit (HTTPS/SSL) and at rest.</li>
          <li>Only authorized personnel can access user data.</li>
          <li>We comply with GDPR and CCPA. You may request access, correction, or deletion of your data at any time.</li>
          <li>Data is retained only as long as necessary for service delivery.</li>
          <li>We will notify users promptly in the event of a data breach.</li>
        </ul>
        <p className="text-blue-700">For questions, contact us at <a href="mailto:support@example.com" className="underline text-blue-500">support@example.com</a>.</p>
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-700 font-bold underline">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
