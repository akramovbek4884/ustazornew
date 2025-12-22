'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function BoglanishPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{text: string; isUser: boolean}[]>([]);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { t, language } = useLanguage();

  const responses = language === 'ru' ? [
    "Привет! Чем могу помочь?",
    "Извините, я вас не понял",
    "Пожалуйста, уточните ваш вопрос.",
    "Я готов помочь.",
    "Рассматриваю ваш запрос.",
    "Могу дать подробную информацию об этом."
  ] : language === 'en' ? [
    "Hello! How can I help you?",
    "Sorry, I didn't understand",
    "Please clarify your question.",
    "I'm ready to help.",
    "I'm reviewing your request.",
    "I can provide more details about this."
  ] : [
    "Salom! Qanday yordam bera olaman?",
    "Uzur, men sizni tushunmadim",
    "Iltimos, savolingizni aniqlashtiring.",
    "Men yordam berishga tayyorman.",
    "Sizning so'rovingizni ko'rib chiqyapman.",
    "Bu haqda batafsilroq ma'lumot bera olaman."
  ];

  const sendChat = () => {
    if (!chatMessage.trim()) return;

    setChatMessages(prev => [...prev, { text: chatMessage, isUser: true }]);
    setChatMessage('');

    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <>
      <Header />
      
      <main id="main-content" className="max-w-[1000px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />
        
        {/* Page Header */}
        <section className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {t.contact.title}
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            {t.contact.description}
          </p>
        </section>

        {/* Contact Methods */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <a 
            href="https://t.me/Madraximov1993" 
            target="_blank" 
            rel="noopener noreferrer"
            className="card p-5 text-center group"
          >
            <div className="w-14 h-14 bg-[#0088cc]/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" fill="#0088cc" className="w-7 h-7">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{t.contact.telegram}</h3>
            <p className="text-sm text-gray-500">{t.contact.telegramDesc}</p>
          </a>
          
          <a 
            href="tel:+998944136262"
            className="card p-5 text-center group"
          >
            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-green-600">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{t.contact.phone}</h3>
            <p className="text-sm text-gray-500">+998 94 413 62 62</p>
          </a>
          
          <a 
            href="mailto:akramov.bek4884@gmail.com"
            className="card p-5 text-center group"
          >
            <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-red-500">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{t.contact.email}</h3>
            <p className="text-sm text-gray-500">info@ustazor.uz</p>
          </a>
        </section>

        {/* Contact Form */}
        <section className="card-static p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.contact.sendMessage}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.contact.name} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder={t.contact.namePlaceholder}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.contact.phone}
                </label>
                <input 
                  type="tel" 
                  placeholder={t.contact.phonePlaceholder}
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t.contact.email} <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                placeholder={t.contact.emailPlaceholder}
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                required
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t.contact.message} <span className="text-red-500">*</span>
              </label>
              <textarea 
                placeholder={t.contact.messagePlaceholder}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                required
                rows={5}
                className="input resize-none"
              />
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.contact.sending}
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                  </svg>
                  {t.contact.send}
                </>
              )}
            </button>
          </form>
        </section>

        {/* FAQ Section */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.contact.faq}</h2>
          <div className="space-y-3">
            <details className="card-static group">
              <summary className="p-4 font-medium text-gray-900 cursor-pointer list-none flex items-center justify-between">
                {t.contact.faq1}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </summary>
              <p className="px-4 pb-4 text-gray-600 text-sm">
                {t.contact.faq1Answer}
              </p>
            </details>
            
            <details className="card-static group">
              <summary className="p-4 font-medium text-gray-900 cursor-pointer list-none flex items-center justify-between">
                {t.contact.faq2}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </summary>
              <p className="px-4 pb-4 text-gray-600 text-sm">
                {t.contact.faq2Answer}
              </p>
            </details>
            
            <details className="card-static group">
              <summary className="p-4 font-medium text-gray-900 cursor-pointer list-none flex items-center justify-between">
                {t.contact.faq3}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </summary>
              <p className="px-4 pb-4 text-gray-600 text-sm">
                {t.contact.faq3Answer}
              </p>
            </details>
          </div>
        </section>
      </main>

      <Footer />

      {/* Chat Button */}
      <button 
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center shadow-lg z-50 transition-all hover:scale-105"
        onClick={() => setChatOpen(!chatOpen)}
        aria-label="Chat"
      >
        {chatOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 text-white">
            <h3 className="font-semibold">{language === 'ru' ? 'Онлайн чат' : language === 'en' ? 'Online Chat' : 'Onlayn Chat'}</h3>
            <p className="text-white/80 text-sm">{language === 'ru' ? 'Ответим на ваши вопросы' : language === 'en' ? 'We will answer your questions' : 'Savollaringizga javob beramiz'}</p>
          </div>
          
          {/* Messages */}
          <div className="h-[300px] overflow-y-auto p-4 space-y-3 bg-gray-50">
            {chatMessages.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-8">
                {language === 'ru' ? 'Напишите сообщение...' : language === 'en' ? 'Write a message...' : 'Xabar yozing...'}
              </p>
            )}
            {chatMessages.map((msg, index) => (
              <div 
                key={index}
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.isUser 
                    ? 'bg-primary-500 text-white ml-auto rounded-br-sm' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          
          {/* Input */}
          <div className="p-3 border-t border-gray-100">
            <div className="flex gap-2">
              <input 
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                placeholder={language === 'ru' ? 'Напишите сообщение...' : language === 'en' ? 'Write a message...' : 'Xabar yozing...'}
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary-300"
              />
              <button 
                onClick={sendChat}
                className="w-10 h-10 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 left-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slideUp z-50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          {t.contact.sent}
        </div>
      )}
    </>
  );
}
