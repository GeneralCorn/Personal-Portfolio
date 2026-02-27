'use client';

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-gray-400 mb-4">{error.message}</p>
        <button onClick={reset} className="px-6 py-2 bg-blue-500 rounded-lg">Try again</button>
      </div>
    </div>
  );
}
