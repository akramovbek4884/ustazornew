export default function Loading() {
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-primary-100 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full animate-spin" />
        </div>
        
        {/* Text */}
        <p className="text-gray-500 text-sm">Yuklanmoqda...</p>
      </div>
    </div>
  );
}
