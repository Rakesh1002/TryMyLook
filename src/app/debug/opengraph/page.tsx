import Image from "next/image";

export default function DebugOpenGraph() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">OpenGraph Image Debug</h1>

      <div className="border rounded-lg p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Current OpenGraph Image:</h2>
        <Image
          src="/opengraph-image"
          alt="OpenGraph preview"
          width={1200}
          height={630}
          className="w-full max-w-3xl border rounded-lg shadow-md"
          priority
        />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Direct URLs:</h2>
        <ul className="space-y-2 text-blue-600">
          <li>
            <a
              href="/opengraph-image"
              target="_blank"
              rel="noopener noreferrer"
            >
              View OpenGraph Image directly
            </a>
          </li>
          <li>
            <a href="/twitter-image" target="_blank" rel="noopener noreferrer">
              View Twitter Image directly
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
