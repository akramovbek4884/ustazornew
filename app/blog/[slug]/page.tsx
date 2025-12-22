'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { mockBlogPosts } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { language } = useLanguage();

  const post = mockBlogPosts.find(p => p.slug === slug);
  const relatedPosts = mockBlogPosts.filter(p => p.slug !== slug && p.category === post?.category).slice(0, 3);

  if (!post) {
    return (
      <>
        <Header />
        <main className="max-w-[800px] mx-auto py-6 px-4 sm:px-6">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-xl font-semibold">Maqola topilmadi</h2>
            <Link href="/blog" className="btn btn-primary mt-4">
              Blogga qaytish
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main className="max-w-[900px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        {/* Article Header */}
        <article>
          <header className="mb-8">
            <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mt-4">{post.excerpt}</p>
            
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                {post.authorAvatar ? (
                  <Image 
                    src={post.authorAvatar}
                    alt={post.authorName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">{post.authorName.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{post.authorName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-4 text-sm text-gray-500">
                <span>{post.readTime} {language === 'uz' ? "daqiqa o'qish" : language === 'ru' ? "мин чтения" : "min read"}</span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z" clipRule="evenodd" />
                  </svg>
                  {post.views.toLocaleString()}
                </span>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
            <Image 
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, idx) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={idx} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{paragraph.substring(2)}</h1>;
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{paragraph.substring(3)}</h2>;
              }
              if (paragraph.startsWith('- ')) {
                return <li key={idx} className="text-gray-700 ml-4">{paragraph.substring(2)}</li>;
              }
              if (paragraph.trim()) {
                return <p key={idx} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>;
              }
              return null;
            })}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mt-8 pt-8 border-t border-gray-200">
            <span className="text-sm text-gray-500">{language === 'uz' ? "Teglar:" : language === 'ru' ? "Теги:" : "Tags:"}</span>
            {post.tags.map(tag => (
              <span key={tag} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-8 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                </svg>
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clipRule="evenodd" />
                </svg>
                <span>{post.commentsCount}</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'uz' ? "O'xshash maqolalar" : language === 'ru' ? "Похожие статьи" : "Related Articles"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map(p => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="card overflow-hidden group">
                  <div className="relative aspect-video">
                    <Image 
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {p.readTime} {language === 'uz' ? "daqiqa" : language === 'ru' ? "мин" : "min"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
