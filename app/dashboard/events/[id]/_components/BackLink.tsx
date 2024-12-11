import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BackLink() {
  return (
    <div className="mb-6">
      <Link 
        href="/dashboard/events" 
        className="flex items-center gap-2 text-blue-500 hover:underline"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Powrót do listy</span>
      </Link>
    </div>
  );
} 