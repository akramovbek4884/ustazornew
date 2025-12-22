'use client';

export default function ChevarPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] p-6">
      <div className="max-w-[980px] mx-auto">
        <header className="flex items-center gap-4 mb-5">
          <h1 className="text-xl font-bold m-0">Chevarchilik kursi</h1>
        </header>

        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe 
            className="w-full h-[480px] border-0"
            src="https://www.youtube.com/embed?listType=playlist&list=PLQQCpg0f2eoUyWV7Vhnd1Rtrf7CyeIOEl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <footer className="mt-5 text-gray-500 text-sm">
          Chevarchilik bo&apos;yicha video darsliklar pleylistini yuqorida ko&apos;ring.
        </footer>
      </div>
    </div>
  );
}
