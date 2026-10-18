"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="text-muted-foreground">An error occurred in the admin panel.</p>
        <button
          onClick={reset}
          className="rounded-md bg-sbv-gold px-4 py-2 text-black font-medium hover:bg-sbv-gold/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
