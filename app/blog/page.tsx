'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { mockBlogPosts } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { language } = useLanguage();

  const categories = Array.from(new Set(mockBlogPosts.map(p => p.category)));

  const filteredPosts = selectedCategory 
    ? mockBlogPosts.filter(p => p.category === selectedCategory)
    : mockBlogPosts;

  const featuredPost = mockBlogPosts[0];
  const otherPosts = filteredPosts.filter(p => p.id !== featuredPost.id);

  return (
    <>
      <Header />
      
      <main className="max-w-[1400px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        {/* Header */}
        <section className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3">
            {language === 'uz' ? "Blog" : language === 'ru' ? "Блог" : "Blog"}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            {language === 'uz' ? "Foydali maqolalar, maslahatlar va yangiliklar" 
             : language === 'ru' ? "Полезные статьи, советы и новости" 
             : "Useful articles, tips and news"}
          </p>
        </section>

        {/* Categories */}
        <section className="flex gap-2 overflow-x-auto pb-4 mb-6">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              !selectedCategory ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {language === 'uz' ? "Barchasi" : language === 'ru' ? "Все" : "All"}
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Featured Post */}
        {!selectedCategory && (
          <section className="mb-10">
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 card-static overflow-hidden">
                <div className="relative aspect-video lg:aspect-auto lg:h-full">
                  <Image 
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full w-fit">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3 group-hover:text-primary-600 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mt-3 line-clamp-3">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-semibold text-sm">{featuredPost.authorName.charAt(0)}</span>
                      </div>
                      <span className="text-sm text-gray-700">{featuredPost.authorName}</span>
                    </div>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {featuredPost.readTime} {language === 'uz' ? "daqiqa" : language === 'ru' ? "мин" : "min"}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {new Date(featuredPost.publishedAt).toLocaleDateString('uz-UZ')}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedCategory ? filteredPosts : otherPosts).map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="card overflow-hidden group">
              <div className="relative aspect-video">
                <Image 
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                  {post.category}
                </span>
                <h3 className="font-semibold text-gray-900 mt-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {post.readTime} {language === 'uz' ? "daqiqa" : language === 'ru' ? "мин" : "min"}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z" clipRule="evenodd" />
                      </svg>
                      {post.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
                      </svg>
                      {post.likes}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {language === 'uz' ? "Maqolalar topilmadi" : language === 'ru' ? "Статьи не найдены" : "No articles found"}
            </h3>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
