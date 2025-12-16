'use client';

import { useEffect } from 'react';
import { useBugMail } from '@bugmail-js/next/client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const bugmail = useBugMail();

    useEffect(() => {
        // Only report if BugMail is configured (provider will handle the check)
        if (bugmail) {
            bugmail.captureException(error);
        } else {
            // Fallback: Log to console if BugMail is not configured
            console.error(error);
        }
    }, [error, bugmail]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
                Try again
            </button>
        </div>
    );
}
