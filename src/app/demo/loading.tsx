export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/30 via-cool-50 to-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-lg text-cool-600 animate-pulse">Loading Demo...</p>
      </div>
    </div>
  );
}
