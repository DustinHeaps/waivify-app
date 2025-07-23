import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToBlog() {
  return (
    <div className="mb-4">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Blog
      </Link>
    </div>
  );
}
