import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-red-900 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Commercial Not Found</h2>
        <p>
          Sorry, the beer commercial you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block bg-yellow-600 text-white px-6 py-2 rounded-lg font-bold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
