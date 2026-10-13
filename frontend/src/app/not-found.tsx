import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-8xl font-bold text-primary opacity-20">404</div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-ink">Page Not Found</h1>
          <p className="text-muted">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <Link href="/">
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}