'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { mockConversations, mockMessages, getMasterById } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Conversation, Message } from '@/types';

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const toMasterId = searchParams.get('to');
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    // If redirected with a specific master ID, create or find conversation
    if (toMasterId) {
      const master = getMasterById(toMasterId);
      if (master) {
        const existingConv = conversations.find(c => c.participants.includes(toMasterId));
        if (existingConv) {
          setSelectedConversation(existingConv);
          setMessages(mockMessages.filter(m => m.conversationId === existingConv.id));
        } else {
          // Create new conversation
          const newConv: Conversation = {
            id: `c_new_${Date.now()}`,
            participants: ['u1', toMasterId],
            participantNames: { 'u1': 'Siz', [toMasterId]: master.name },
            participantAvatars: { [toMasterId]: master.avatar },
            unreadCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          setConversations(prev => [newConv, ...prev]);
          setSelectedConversation(newConv);
          setMessages([]);
        }
        setShowMobileChat(true);
      }
    } else if (conversations.length > 0) {
      setSelectedConversation(conversations[0]);
      setMessages(mockMessages.filter(m => m.conversationId === conversations[0].id));
    }
  }, [toMasterId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    setMessages(mockMessages.filter(m => m.conversationId === conv.id));
    setShowMobileChat(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `m_${Date.now()}`,
      conversationId: selectedConversation.id,
      senderId: 'u1',
      senderName: 'Siz',
      content: newMessage,
      type: 'text',
      read: true,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const otherParticipant = selectedConversation.participants.find(p => p !== 'u1');
      if (otherParticipant) {
        const replies = [
          "Ha, tushundim! Qachon boshlaymiz?",
          "Yaxshi, men tayyor.",
          "Rahmat! Tez orada bog'lanaman.",
          "Manzilni yuboring, iltimos.",
          "Narxi haqida gaplashamiz."
        ];
        const replyMessage: Message = {
          id: `m_${Date.now() + 1}`,
          conversationId: selectedConversation.id,
          senderId: otherParticipant,
          senderName: selectedConversation.participantNames[otherParticipant],
          content: replies[Math.floor(Math.random() * replies.length)],
          type: 'text',
          read: false,
          createdAt: new Date().toISOString()
        };
        setMessages(prev => [...prev, replyMessage]);
      }
    }, 2000);
  };

  const getOtherParticipant = (conv: Conversation) => {
    const otherId = conv.participants.find(p => p !== 'u1');
    return {
      id: otherId || '',
      name: otherId ? conv.participantNames[otherId] : '',
      avatar: otherId ? conv.participantAvatars[otherId] : ''
    };
  };

  return (
    <>
      <Header />
      
      <main className="max-w-[1400px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          {language === 'uz' ? "Xabarlar" : language === 'ru' ? "Сообщения" : "Messages"}
        </h1>

        <div className="card-static overflow-hidden" style={{ height: 'calc(100vh - 280px)', minHeight: '500px' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder={language === 'uz' ? "Qidirish..." : language === 'ru' ? "Поиск..." : "Search..."}
                    className="input pl-10"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="text-4xl mb-3">💬</div>
                    <p className="text-gray-500">
                      {language === 'uz' ? "Xabarlar yo'q" : language === 'ru' ? "Нет сообщений" : "No messages"}
                    </p>
                  </div>
                ) : (
                  conversations.map(conv => {
                    const other = getOtherParticipant(conv);
                    return (
                      <button
                        key={conv.id}
                        onClick={() => handleSelectConversation(conv)}
                        className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                          selectedConversation?.id === conv.id ? 'bg-primary-50' : ''
                        }`}
                      >
                        {other.avatar ? (
                          <Image 
                            src={other.avatar}
                            alt={other.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-600 font-semibold">{other.name.charAt(0)}</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 truncate">{other.name}</span>
                            {conv.lastMessage && (
                              <span className="text-xs text-gray-500">
                                {new Date(conv.lastMessage.createdAt).toLocaleDateString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            )}
                          </div>
                          {conv.lastMessage && (
                            <p className="text-sm text-gray-500 truncate mt-0.5">
                              {conv.lastMessage.senderId === 'u1' && <span className="text-gray-400">Siz: </span>}
                              {conv.lastMessage.content}
                            </p>
                          )}
                        </div>
                        {conv.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-white">{conv.unreadCount}</span>
                          </div>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                    <button 
                      onClick={() => setShowMobileChat(false)}
                      className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {(() => {
                      const other = getOtherParticipant(selectedConversation);
                      return (
                        <>
                          {other.avatar ? (
                            <Image 
                              src={other.avatar}
                              alt={other.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-primary-600 font-semibold">{other.name.charAt(0)}</span>
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900">{other.name}</h3>
                            <p className="text-xs text-green-500 flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full" />
                              Online
                            </p>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(msg => (
                      <div 
                        key={msg.id}
                        className={`flex ${msg.senderId === 'u1' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[70%] p-3 rounded-2xl ${
                            msg.senderId === 'u1' 
                              ? 'bg-primary-500 text-white rounded-br-md' 
                              : 'bg-gray-100 text-gray-900 rounded-bl-md'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className={`text-xs mt-1 ${msg.senderId === 'u1' ? 'text-white/70' : 'text-gray-500'}`}>
                            {new Date(msg.createdAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <input 
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={language === 'uz' ? "Xabar yozing..." : language === 'ru' ? "Напишите сообщение..." : "Type a message..."}
                        className="input flex-1"
                      />
                      <button 
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="btn btn-primary !px-4"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {language === 'uz' ? "Suhbatni tanlang" : language === 'ru' ? "Выберите чат" : "Select a conversation"}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
