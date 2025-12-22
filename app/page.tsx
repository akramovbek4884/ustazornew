'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LoginPage() {
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t, language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Set login status in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    setTimeout(() => {
      router.push('/home');
    }, 1500); // Slightly longer for the "Modern" feel
  };

  return (
    <div className="auth-body min-h-screen flex items-center justify-center bg-gray-100 font-['Poppins'] p-4 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-secondary-600 opacity-20 pointer-events-none" />

      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 right-4 z-[1001]">
        <LanguageSwitcher variant="default" />
      </div>

      <div className={`auth-wrapper ${isPanelActive ? 'panel-active' : ''}`} id="authWrapper">
        {/* Register Form */}
        <div className="auth-form-box register-form-box">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold mb-2 break-words text-center leading-tight">
              {t.auth.register || 'Create Account'}
            </h1>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="hover:scale-110 transition-transform"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Google" className="hover:scale-110 transition-transform"><i className="fab fa-google"></i></a>
              <a href="#" aria-label="LinkedIn" className="hover:scale-110 transition-transform"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span className="text-gray-500 text-sm mb-4">or use your email for registration</span>
            <input type="text" placeholder={t.auth.namePlaceholder || "Full Name"} required className="auth-input" />
            <input type="email" placeholder={t.auth.phoneOrEmail || "Email Address"} required className="auth-input" />
            <input type="password" placeholder={t.auth.passwordPlaceholder || "Password"} required className="auth-input" />
            <button type="submit" disabled={isLoading} className="active:scale-95 transition-all mt-4">
              {isLoading ? '...' : (t.auth.registerButton || 'Sign Up')}
            </button>
            <div className="mobile-switch lg:hidden">
              <p>{t.auth.hasAccount}</p>
              <button type="button" className="mobile-btn" onClick={() => setIsPanelActive(false)}>{t.auth.loginButton}</button>
            </div>
          </form>
        </div>

        {/* Login Form */}
        <div className="auth-form-box login-form-box">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold mb-2 break-words text-center leading-tight">
              {t.auth.welcome || 'Sign In'}
            </h1>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="hover:scale-110 transition-transform"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Google" className="hover:scale-110 transition-transform"><i className="fab fa-google"></i></a>
              <a href="#" aria-label="LinkedIn" className="hover:scale-110 transition-transform"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span className="text-gray-500 text-sm mb-4">or use your account</span>
            <input type="email" placeholder={t.auth.phoneOrEmail || "Email Address"} required className="auth-input" />
            <input type="password" placeholder={t.auth.enterPassword || "Password"} required className="auth-input" />
            <a href="#" className="text-sm text-gray-400 my-4 hover:text-primary-600 transition-colors">
              {t.auth.forgotPassword || 'Forgot your password?'}
            </a>
            <button type="submit" disabled={isLoading} className="active:scale-95 transition-all">
              {isLoading ? '...' : (t.auth.loginButton || 'Sign In')}
            </button>
            <div className="mobile-switch lg:hidden">
              <p>{t.auth.noAccount}</p>
              <button type="button" className="mobile-btn" onClick={() => setIsPanelActive(true)}>{t.auth.registerButton}</button>
            </div>
          </form>
        </div>

        {/* Slide Panels */}
        <div className="slide-panel-wrapper hidden lg:block">
          <div className="slide-panel">
            <div className="panel-content panel-content-left">
              <h1 className="text-3xl font-bold text-white mb-4">{t.auth.welcomeBack}</h1>
              <p className="text-white/90 mb-8 font-light leading-relaxed">
                {t.auth.welcomeBackDesc}
              </p>
              <button className="transparent-btn active:scale-95" onClick={() => setIsPanelActive(false)}>{t.auth.loginButton}</button>
            </div>
            <div className="panel-content panel-content-right">
              <h1 className="text-3xl font-bold text-white mb-4">{t.auth.heyThere}</h1>
              <p className="text-white/90 mb-8 font-light leading-relaxed">
                {t.auth.heyThereDesc}
              </p>
              <button className="transparent-btn active:scale-95" onClick={() => setIsPanelActive(true)}>{t.auth.registerButton}</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

        .auth-wrapper {
            background-color: #fff;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            position: relative;
            overflow: hidden;
            width: 850px;
            max-width: 100%;
            min-height: 550px;
        }

        .auth-form-box {
            position: absolute;
            top: 0;
            height: 100%;
            transition: all 0.6s ease-in-out;
        }

        .login-form-box {
            left: 0;
            width: 50%;
            z-index: 2;
        }

        .auth-wrapper.panel-active .login-form-box {
            transform: translateX(100%);
        }

        .register-form-box {
            left: 0;
            width: 50%;
            opacity: 0;
            z-index: 1;
        }

        .auth-wrapper.panel-active .register-form-box {
            transform: translateX(100%);
            opacity: 1;
            z-index: 5;
            animation: show-form 0.6s;
        }

        @keyframes show-form {
            0%, 49.99% { opacity: 0; z-index: 1; }
            50%, 100% { opacity: 1; z-index: 5; }
        }

        form {
            background-color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 20px;
            height: 100%;
            text-align: center;
        }

        @media (min-width: 640px) {
            form {
                padding: 0 50px;
            }
        }

        .auth-input {
            background-color: #f3f4f6;
            border: 2px solid transparent;
            border-radius: 12px;
            padding: 14px 18px;
            margin: 8px 0;
            width: 100%;
            font-size: 14px;
            transition: all 0.3s ease;
        }

        .auth-input:focus {
            outline: none;
            border-color: #667eea;
            background-color: #fff;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        button:not(.mobile-btn):not(.transparent-btn) {
            border-radius: 25px;
            border: none;
            background: linear-gradient(135deg, #0b76ef 0%, #6366f1 100%);
            color: #FFFFFF;
            font-size: 13px;
            font-weight: 600;
            padding: 14px 50px;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(11, 118, 239, 0.4);
        }

        .transparent-btn {
            background: transparent;
            border: 2px solid #FFFFFF;
            border-radius: 25px;
            color: #FFFFFF;
            font-size: 13px;
            font-weight: 600;
            padding: 14px 50px;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;
        }

        .slide-panel-wrapper {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: transform 0.6s ease-in-out;
            z-index: 100;
        }

        .auth-wrapper.panel-active .slide-panel-wrapper {
            transform: translateX(-100%);
        }

        .slide-panel {
            background: linear-gradient(135deg, #0b76ef 0%, #6366f1 100%);
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateX(0);
            transition: transform 0.6s ease-in-out;
        }

        .auth-wrapper.panel-active .slide-panel {
            transform: translateX(50%);
        }

        .panel-content {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 40px;
            text-align: center;
            top: 0;
            height: 100%;
            width: 50%;
            transition: transform 0.6s ease-in-out;
        }

        .panel-content-left { transform: translateX(-20%); }
        .auth-wrapper.panel-active .panel-content-left { transform: translateX(0); }
        .panel-content-right { right: 0; transform: translateX(0); }
        .auth-wrapper.panel-active .panel-content-right { transform: translateX(20%); }

        .social-links { margin: 20px 0; }
        .social-links a {
            border: 2px solid #e0e0e0;
            border-radius: 50%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin: 0 8px;
            height: 45px;
            width: 45px;
            transition: all 0.3s ease;
            color: #0b76ef;
        }
        .social-links a:hover {
            border-color: #0b76ef;
            background: #0b76ef;
            color: #fff;
        }

        @media (max-width: 1024px) {
            .auth-wrapper {
                min-height: auto;
                width: 100%;
                box-shadow: none;
                background: transparent;
            }
            .auth-form-box {
                position: relative !important;
                width: 100% !important;
                transform: none !important;
                opacity: 1 !important;
                background: white;
                border-radius: 20px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            }
            .login-form-box, .register-form-box {
                display: block;
            }
            .register-form-box { display: none; }
            .auth-wrapper.panel-active .login-form-box { display: none; }
            .auth-wrapper.panel-active .register-form-box { display: block; }
            
            .mobile-switch { margin-top: 25px; }
            .mobile-btn {
                background: transparent;
                border: 2px solid #0b76ef;
                color: #0b76ef;
                padding: 10px 30px;
                border-radius: 20px;
                font-weight: 600;
                margin-top: 10px;
            }
        }
      `}</style>
    </div>
  );
}
