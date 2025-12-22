'use client';

export default function TomPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] p-6">
      <div className="max-w-[980px] mx-auto">
        <header className="flex items-center gap-4 mb-5">
          <h1 className="text-xl font-bold m-0">Tom qurilishi</h1>
        </header>

        <div className="rounded-xl overflow-hidden shadow-lg mb-4">
          <iframe 
            className="w-full h-[480px] border-0"
            src="https://www.youtube.com/embed/omn74JUf3pM?si=N_HncyebXa3UwXzz"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <footer className="mt-5 text-gray-500 text-sm">
          Tom qurilishi bo&apos;yicha video darslikni yuqorida ko&apos;ring.
        </footer>
      </div>
    </div>
  );
}
