'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { forumCategories, mockForumTopics } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ForumPage() {
  const [view, setView] = useState<'categories' | 'recent'>('categories');
  const { language } = useLanguage();

  const getCategoryName = (cat: typeof forumCategories[0]) => {
    if (language === 'ru' && cat.nameRu) return cat.nameRu;
    if (language === 'en' && cat.nameEn) return cat.nameEn;
    return cat.name;
  };

  return (
    <>
      <Header />
      
      <main className="max-w-[1400px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        {/* Hero */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
                {language === 'uz' ? "Jamiyat Forumi" : language === 'ru' ? "Форум сообщества" : "Community Forum"}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl">
                {language === 'uz' ? "Savollar bering, tajriba almashing va boshqa ustalar bilan bog'laning" 
                 : language === 'ru' ? "Задавайте вопросы, делитесь опытом и общайтесь с другими мастерами" 
                 : "Ask questions, share experiences and connect with other masters"}
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="card-static p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">{forumCategories.length}</div>
            <div className="text-sm text-gray-500">{language === 'uz' ? "Kategoriyalar" : language === 'ru' ? "Категорий" : "Categories"}</div>
          </div>
          <div className="card-static p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">
              {forumCategories.reduce((acc, c) => acc + c.topicCount, 0)}
            </div>
            <div className="text-sm text-gray-500">{language === 'uz' ? "Mavzular" : language === 'ru' ? "Тем" : "Topics"}</div>
          </div>
          <div className="card-static p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">
              {forumCategories.reduce((acc, c) => acc + c.postCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">{language === 'uz' ? "Postlar" : language === 'ru' ? "Постов" : "Posts"}</div>
          </div>
          <div className="card-static p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">2,345</div>
            <div className="text-sm text-gray-500">{language === 'uz' ? "A'zolar" : language === 'ru' ? "Участников" : "Members"}</div>
          </div>
        </section>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('categories')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'categories' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {language === 'uz' ? "Kategoriyalar" : language === 'ru' ? "Категории" : "Categories"}
          </button>
          <button
            onClick={() => setView('recent')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'recent' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {language === 'uz' ? "So'nggi mavzular" : language === 'ru' ? "Последние темы" : "Recent Topics"}
          </button>
        </div>

        {view === 'categories' ? (
          /* Categories Grid */
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {forumCategories.map(category => (
              <Link 
                key={category.id}
                href={`/forum/${category.id}`}
                className="card p-5 group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{category.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {getCategoryName(category)}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span>{category.topicCount} {language === 'uz' ? "mavzu" : language === 'ru' ? "тем" : "topics"}</span>
                      <span>{category.postCount} {language === 'uz' ? "post" : language === 'ru' ? "постов" : "posts"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          /* Recent Topics */
          <section className="space-y-3">
            {mockForumTopics.map(topic => (
              <Link 
                key={topic.id}
                href={`/forum/topic/${topic.id}`}
                className="card p-5 block group"
              >
                <div className="flex items-start gap-4">
                  {topic.authorAvatar ? (
                    <img 
                      src={topic.authorAvatar}
                      alt={topic.authorName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">{topic.authorName.charAt(0)}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {topic.isPinned && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          📌 {language === 'uz' ? "Mahkamlangan" : language === 'ru' ? "Закреплено" : "Pinned"}
                        </span>
                      )}
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                        {topic.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {topic.authorName} • {new Date(topic.createdAt).toLocaleDateString('uz-UZ')}
                    </p>
                    {topic.tags && topic.tags.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        {topic.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z" clipRule="evenodd" />
                      </svg>
                      {topic.views}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      {topic.replyCount}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}

        {/* New Topic Button */}
        <div className="fixed bottom-6 right-6">
          <button className="btn btn-primary shadow-lg !px-6 !py-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            {language === 'uz' ? "Yangi mavzu" : language === 'ru' ? "Новая тема" : "New Topic"}
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
