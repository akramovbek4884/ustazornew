'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { testQuestions } from '@/lib/data';

export default function SertifikatPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startTest = () => {
    if (name.trim() === '' || surname.trim() === '') {
      return;
    }
    setStarted(true);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    setTimeout(() => {
      if (answerIndex === testQuestions[currentQuestion].correctAnswer) {
        setScore(prev => prev + 1);
      }

      if (currentQuestion < testQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setFinished(true);
      }
    }, 500);
  };

  useEffect(() => {
    if (finished && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw certificate background
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = '/Sertificat/sertifikat.png';
      
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const fullName = `${name} ${surname}`;
        ctx.fillStyle = '#4B2E2E';
        ctx.font = "bold 36px 'Inter', sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText(fullName, canvas.width / 2, 350);

        const resultText = `Natija: ${score} / ${testQuestions.length}`;
        ctx.fillStyle = '#333';
        ctx.font = '24px Arial, sans-serif';
        ctx.fillText(resultText, canvas.width / 2, 420);
      };

      img.onerror = () => {
        // Draw a custom certificate if image fails to load
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#f8fafc');
        gradient.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Border
        ctx.strokeStyle = '#0b76ef';
        ctx.lineWidth = 8;
        ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
        
        // Inner border
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

        // Header decoration
        ctx.fillStyle = '#0b76ef';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 80, 40, 0, Math.PI * 2);
        ctx.fill();
        
        // Checkmark in circle
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 15, 80);
        ctx.lineTo(canvas.width / 2 - 5, 90);
        ctx.lineTo(canvas.width / 2 + 15, 65);
        ctx.stroke();

        ctx.fillStyle = '#0b76ef';
        ctx.font = "bold 48px 'Inter', sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText('SERTIFIKAT', canvas.width / 2, 170);

        ctx.fillStyle = '#64748b';
        ctx.font = "20px 'Inter', sans-serif";
        ctx.fillText("Bu sertifikat beriladi:", canvas.width / 2, 230);

        const fullName = `${name} ${surname}`;
        ctx.fillStyle = '#1e293b';
        ctx.font = "bold 40px 'Inter', sans-serif";
        ctx.fillText(fullName, canvas.width / 2, 290);

        ctx.fillStyle = '#64748b';
        ctx.font = "18px 'Inter', sans-serif";
        ctx.fillText("Chilangarlik bo'yicha testni muvaffaqiyatli topshirgani uchun", canvas.width / 2, 340);

        const resultText = `Natija: ${score} / ${testQuestions.length}`;
        ctx.fillStyle = '#0b76ef';
        ctx.font = "bold 28px 'Inter', sans-serif";
        ctx.fillText(resultText, canvas.width / 2, 400);

        // Footer
        ctx.fillStyle = '#94a3b8';
        ctx.font = "16px 'Inter', sans-serif";
        ctx.fillText(`Sana: ${new Date().toLocaleDateString('uz-UZ')}`, canvas.width / 2, 500);
        
        ctx.fillStyle = '#0b76ef';
        ctx.font = "bold 18px 'Inter', sans-serif";
        ctx.fillText("USTA ZO'R", canvas.width / 2, 530);
      };
    }
  }, [finished, name, surname, score]);

  const downloadCert = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.href = canvasRef.current.toDataURL('image/png');
      link.download = `${name}_${surname}_sertifikat.png`;
      link.click();
    }
  };

  const progress = ((currentQuestion + 1) / testQuestions.length) * 100;

  // Start Screen
  if (!started) {
    return (
      <>
        <Header />
        <main id="main-content" className="max-w-[800px] mx-auto py-6 px-4 sm:px-6">
          <Breadcrumbs />
          
          <div className="card-static p-6 sm:p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Sertifikat olish testi
            </h1>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Chilangarlik bo&apos;yicha bilimlaringizni sinab ko&apos;ring va rasmiy sertifikat oling.
            </p>

            {/* Test Info */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-primary-600">{testQuestions.length}</div>
                <div className="text-xs text-gray-500">Savollar</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-primary-600">10</div>
                <div className="text-xs text-gray-500">Daqiqa</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-primary-600">70%</div>
                <div className="text-xs text-gray-500">O&apos;tish bali</div>
              </div>
            </div>

            {/* Name Input */}
            <div className="max-w-sm mx-auto space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">Ism</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ismingiz"
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">Familiya</label>
                <input 
                  type="text" 
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Familiyangiz"
                  className="input"
                  required
                />
              </div>
            </div>
            
            <button 
              onClick={startTest}
              disabled={!name.trim() || !surname.trim()}
              className="btn btn-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Testni boshlash
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Finished Screen
  if (finished) {
    const passed = score >= testQuestions.length * 0.7;
    
    return (
      <>
        <Header />
        <main id="main-content" className="max-w-[900px] mx-auto py-6 px-4 sm:px-6">
          <Breadcrumbs />
          
          <div className="text-center mb-8">
            <div className={`w-20 h-20 ${passed ? 'bg-green-500' : 'bg-amber-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              {passed ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {passed ? 'Tabriklaymiz!' : 'Qayta urinib ko\'ring'}
            </h1>
            <p className="text-gray-500">
              {passed 
                ? `${name}, siz testni muvaffaqiyatli topshirdingiz!` 
                : 'O\'tish uchun kamida 70% to\'plash kerak.'
              }
            </p>
            <p className="text-2xl font-bold text-primary-600 mt-2">
              Natija: {score}/{testQuestions.length}
            </p>
          </div>

          {passed && (
            <>
              <canvas 
                ref={canvasRef}
                width={900}
                height={600}
                className="w-full max-w-[900px] mx-auto rounded-xl shadow-lg border border-gray-200"
              />

              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <button 
                  onClick={downloadCert}
                  className="btn btn-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                  </svg>
                  Sertifikatni yuklab olish
                </button>
                <Link href="/home" className="btn btn-outline">
                  Bosh sahifaga
                </Link>
              </div>
            </>
          )}

          {!passed && (
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => {
                  setStarted(false);
                  setFinished(false);
                  setCurrentQuestion(0);
                  setScore(0);
                  setSelectedAnswer(null);
                }}
                className="btn btn-primary"
              >
                Qayta topshirish
              </button>
              <Link href="/kurslar" className="btn btn-outline">
                Kurslarga qaytish
              </Link>
            </div>
          )}
        </main>
        <Footer />
      </>
    );
  }

  // Question Screen
  const question = testQuestions[currentQuestion];

  return (
    <>
      <Header />
      <main id="main-content" className="max-w-[700px] mx-auto py-6 px-4 sm:px-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              Savol {currentQuestion + 1} / {testQuestions.length}
            </span>
            <span className="text-sm font-medium text-primary-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="card-static p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion + 1}. {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  selectedAnswer === null
                    ? 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                    : selectedAnswer === index
                      ? index === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : index === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium text-sm ${
                    selectedAnswer === null
                      ? 'bg-gray-100 text-gray-600'
                      : selectedAnswer === index
                        ? index === question.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : index === question.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium text-gray-700">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Current Score */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              To&apos;g&apos;ri javoblar: <span className="font-medium text-green-600">{score}</span>
            </span>
            <span className="text-sm text-gray-500">
              Qolgan: {testQuestions.length - currentQuestion - 1}
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
