'use client';

export default function QurilishPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] p-6">
      <div className="max-w-[980px] mx-auto">
        <header className="flex items-center gap-4 mb-5">
          <h1 className="text-xl font-bold m-0">Qurilish ishlari</h1>
        </header>

        <div className="rounded-xl overflow-hidden shadow-lg mb-4">
          <iframe 
            className="w-full h-[480px] border-0"
            src="https://www.youtube.com/embed/videoseries?si=R6FglFFWzvDPKKHU&list=PLtEwmaTzf_Lvhgexr9Sxxol9aPVXXE27Z"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <footer className="mt-5 text-gray-500 text-sm">
          Qurilish ishlari bo&apos;yicha video darsliklar pleylistini yuqorida ko&apos;ring.
        </footer>
      </div>
    </div>
  );
}
