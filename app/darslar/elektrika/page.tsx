'use client';

export default function ElektrikaPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] p-6">
      <div className="max-w-[980px] mx-auto">
        <header className="flex items-center gap-4 mb-5">
          <h1 className="text-xl font-bold m-0">Elektriklik kursi</h1>
        </header>

        <div className="rounded-xl overflow-hidden shadow-lg mb-4">
          <iframe 
            className="w-full h-[480px] border-0"
            src="https://www.youtube.com/embed/videoseries?si=K-OFQfZcr0UaJLuN&list=PLO48647yLzdjLPZWRNRwB2--xhoysyt0B"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <footer className="mt-5 text-gray-500 text-sm">
          Elektriklik bo&apos;yicha video darsliklar pleylistini yuqorida ko&apos;ring.
        </footer>
      </div>
    </div>
  );
}
