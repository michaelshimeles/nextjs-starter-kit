import { LockIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function NotAuthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-zinc-900">
      <div className="w-full max-w-md p-8 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl shadow-2xl border border-zinc-700 transform transition-all hover:scale-105 duration-300">
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <LockIcon className="w-10 h-10 text-white" aria-hidden="true" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-2 text-center">Unauthorized Access</h1>
          <p className="text-xl text-gray-300 mb-8 text-center">You don&apos;t have access to this page</p>
          <p className="text-gray-400 mb-8 text-center">
            It looks like you haven&apos;t subscribed yet. To access this content, please upgrade to our premium service.
          </p>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent mb-8"></div>
          <Button asChild className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            <Link href="/">Upgrade Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}