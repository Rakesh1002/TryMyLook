import Link from "next/link";
import { Button } from "./components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50/30 via-cool-50 to-white px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary-600">Page Not Found</h1>
        <p className="text-cool-600 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist. Here are some
          helpful links:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/demo">Try Demo</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
