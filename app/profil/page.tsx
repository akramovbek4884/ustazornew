'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import MasterProfileSetup from '@/components/auth/MasterProfileSetup';

interface RequestItem {
  id: string;
  status: string;
  message: string;
  createdAt: string;
  master?: {
    id: string;
    user: { name: string; phone: string };
  };
  client?: {
    user: { name: string; phone: string };
  };
}

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState<'requests' | 'profile'>('requests');
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);

  // Profile Form State
  const [currentStep, setCurrentStep] = useState(1);
  const [profileImg, setProfileImg] = useState('/img/logo-new.png');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { t, language } = useLanguage();
  const { user, updateProfile } = useAuth();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';

  if (user?.role === 'master' && (!user.profileCompleted || isEditMode)) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-24">
        <MasterProfileSetup />
      </div>
    );
  }

  // Form steps with translations
  const steps = [
    { id: 1, title: t.profile.steps.personal, description: t.profile.steps.personalDesc },
    { id: 2, title: t.profile.steps.location, description: t.profile.steps.locationDesc },
    { id: 3, title: t.profile.steps.profession, description: t.profile.steps.professionDesc },
  ];

  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState(language === 'ru' ? 'Узбекистан' : language === 'en' ? 'Uzbekistan' : "O'zbekiston");
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [mfy, setMfy] = useState('');
  const [job, setJob] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate completion percentage
  const calculateCompletion = () => {
    const fields = [firstName, lastName, phone, gender, birthday, region, city, job];
    const filled = fields.filter(f => f.trim() !== '').length;
    return Math.round((filled / fields.length) * 100);
  };

  useEffect(() => {
    // Load saved profile data
    const savedImg = localStorage.getItem('profileImg');
    if (savedImg && savedImg !== 'https://via.placeholder.com/120') {
      setProfileImg(savedImg);
    }

    setFirstName(localStorage.getItem('firstName') || '');
    setLastName(localStorage.getItem('lastName') || '');
    setPhone(localStorage.getItem('phone') || '');
    setEmail(localStorage.getItem('email') || '');
    setGender(localStorage.getItem('gender') || '');
    setBirthday(localStorage.getItem('birthday') || '');
    setCountry(localStorage.getItem('country') || (language === 'ru' ? 'Узбекистан' : language === 'en' ? 'Uzbekistan' : "O'zbekiston"));
    setRegion(localStorage.getItem('region') || '');
    setCity(localStorage.getItem('city') || '');
    setMfy(localStorage.getItem('mfy') || '');
    setJob(localStorage.getItem('job') || '');
    setExperience(localStorage.getItem('experience') || '');
    setBio(localStorage.getItem('bio') || '');
  }, [language]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImg(result);
        localStorage.setItem('profileImg', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    const requiredText = language === 'ru' ? 'Обязательное поле' : language === 'en' ? 'Required field' : 'Kiritish shart';

    if (step === 1) {
      if (!firstName.trim()) newErrors.firstName = requiredText;
      if (!lastName.trim()) newErrors.lastName = requiredText;
      if (!phone.trim()) newErrors.phone = requiredText;
    } else if (step === 2) {
      if (!region.trim()) newErrors.region = requiredText;
      if (!city.trim()) newErrors.city = requiredText;
    } else if (step === 3) {
      if (!job.trim()) newErrors.job = requiredText;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const saveProfile = () => {
    if (!validateStep(currentStep)) return;

    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('phone', phone);
      localStorage.setItem('email', email);
      localStorage.setItem('gender', gender);
      localStorage.setItem('birthday', birthday);
      localStorage.setItem('country', country);
      localStorage.setItem('region', region);
      localStorage.setItem('city', city);
      localStorage.setItem('mfy', mfy);
      localStorage.setItem('job', job);
      localStorage.setItem('experience', experience);
      localStorage.setItem('bio', bio);

      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const completionPercentage = calculateCompletion();

  // Regions list with translations
  const regions = language === 'ru' ? [
    'Ташкент', 'Самарканд', 'Фергана', 'Андижан', 'Наманган',
    'Бухара', 'Хорезм', 'Кашкадарья', 'Сурхандарья', 'Джизак',
    'Сырдарья', 'Навои', 'Каракалпакстан'
  ] : language === 'en' ? [
    'Tashkent', 'Samarkand', 'Fergana', 'Andijan', 'Namangan',
    'Bukhara', 'Khorezm', 'Kashkadarya', 'Surkhandarya', 'Jizzakh',
    'Syrdarya', 'Navoi', 'Karakalpakstan'
  ] : [
    'Toshkent', 'Samarqand', "Farg'ona", 'Andijon', 'Namangan',
    'Buxoro', 'Xorazm', 'Qashqadaryo', 'Surxondaryo', 'Jizzax',
    'Sirdaryo', 'Navoiy', "Qoraqalpog'iston"
  ];

  // Professions list with translations
  const professions = language === 'ru' ? [
    { value: 'Сварщик', label: 'Сварщик' },
    { value: 'Сантехник', label: 'Сантехник' },
    { value: 'Электрик', label: 'Электрик' },
    { value: 'Гипсокартонщик', label: 'Гипсокартонщик' },
    { value: 'Каменщик', label: 'Каменщик' },
    { value: 'Штукатур', label: 'Штукатур' },
    { value: 'Кровельщик', label: 'Кровельщик' },
    { value: 'Слесарь', label: 'Слесарь' },
    { value: 'Плотник', label: 'Плотник' },
    { value: 'Маляр', label: 'Маляр' },
    { value: 'Другое', label: 'Другое' },
  ] : language === 'en' ? [
    { value: 'Welder', label: 'Welder' },
    { value: 'Plumber', label: 'Plumber' },
    { value: 'Electrician', label: 'Electrician' },
    { value: 'Drywall Installer', label: 'Drywall Installer' },
    { value: 'Mason', label: 'Mason' },
    { value: 'Plasterer', label: 'Plasterer' },
    { value: 'Roofer', label: 'Roofer' },
    { value: 'Locksmith', label: 'Locksmith' },
    { value: 'Carpenter', label: 'Carpenter' },
    { value: 'Painter', label: 'Painter' },
    { value: 'Other', label: 'Other' },
  ] : [
    { value: 'Payvandchi', label: 'Payvandchi (Svarkachi)' },
    { value: 'Santexnik', label: 'Santexnik' },
    { value: 'Elektrik', label: 'Elektrik' },
    { value: 'Gipsokartonchi', label: 'Gipsokartonchi' },
    { value: "G'isht teruvchi", label: "G'isht teruvchi" },
    { value: 'Suvoqchi', label: 'Suvoqchi' },
    { value: 'Tom quruvchi', label: 'Tom quruvchi' },
    { value: 'Chilangar', label: 'Chilangar' },
    { value: 'Duradgor', label: 'Duradgor' },
    { value: "Bo'yoqchi", label: "Bo'yoqchi" },
    { value: 'Boshqa', label: 'Boshqa' },
  ];

  return (
    <>
      <Header />

      <main id="main-content" className="max-w-[900px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.profile.title}</h1>
          <p className="text-gray-500 mt-1">{t.profile.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="card-static p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{t.profile.completion}</span>
            <span className="text-sm font-semibold text-primary-600">{completionPercentage}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-8 relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary-500 -z-10 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          />

          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${currentStep >= step.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-400'
                  }`}
              >
                {currentStep > step.id ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                ) : step.id}
              </div>
              <span className={`mt-2 text-sm font-medium hidden sm:block ${currentStep >= step.id ? 'text-primary-600' : 'text-gray-400'
                }`}>
                {step.title}
              </span>
              <span className={`text-xs hidden sm:block ${currentStep >= step.id ? 'text-gray-500' : 'text-gray-400'
                }`}>
                {step.description}
              </span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="card-static p-6 sm:p-8">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.profile.personalInfo}</h2>

              {/* Profile Image */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                <label htmlFor="imgInput" className="cursor-pointer group">
                  <div className="relative w-24 h-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={profileImg}
                      alt={t.profile.profilePhoto}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-primary-50 group-hover:ring-primary-100 transition-all"
                    />
                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                        <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                        <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3H4.5a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM12 17.25a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </label>
                <input
                  type="file"
                  id="imgInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <div>
                  <h3 className="font-medium text-gray-900">{t.profile.profilePhoto}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t.profile.photoHint}</p>
                  <label
                    htmlFor="imgInput"
                    className="inline-block mt-2 text-sm text-primary-600 font-medium cursor-pointer hover:text-primary-700"
                  >
                    {t.profile.changePhoto}
                  </label>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t.profile.firstName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t.profile.firstName}
                    className={`input ${errors.firstName ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t.profile.lastName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={t.profile.lastName}
                    className={`input ${errors.lastName ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t.profile.phone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className={`input ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t.profile.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t.profile.gender}
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input select"
                  >
                    <option value="">{t.profile.genderSelect}</option>
                    <option value={language === 'ru' ? 'Мужской' : 'Erkak'}>{t.profile.male}</option>
                    <option value={language === 'ru' ? 'Женский' : 'Ayol'}>{t.profile.female}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t.profile.birthday}
                  </label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.profile.steps.location}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t.profile.country}
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder={t.profile.country}
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t.profile.region} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className={`input select ${errors.region ? 'border-red-500 focus:border-red-500' : ''}`}
                  >
                    <option value="">{t.profile.regionSelect}</option>
                    {regions.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.region && (
                    <p className="text-red-500 text-sm mt-1">{errors.region}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t.profile.district} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t.profile.districtPlaceholder}
                    className={`input ${errors.city ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t.profile.mfy}
                  </label>
                  <input
                    type="text"
                    value={mfy}
                    onChange={(e) => setMfy(e.target.value)}
                    placeholder={t.profile.mfyPlaceholder}
                    className="input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Profession */}
          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.profile.steps.profession}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t.profile.profession} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    className={`input select ${errors.job ? 'border-red-500 focus:border-red-500' : ''}`}
                  >
                    <option value="">{t.profile.professionSelect}</option>
                    {professions.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                  {errors.job && (
                    <p className="text-red-500 text-sm mt-1">{errors.job}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t.profile.experience}
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="input select"
                  >
                    <option value="">{t.profile.experienceSelect}</option>
                    <option value="1">{t.profile.expLess1}</option>
                    <option value="1-3">{t.profile.exp1to3}</option>
                    <option value="3-5">{t.profile.exp3to5}</option>
                    <option value="5-10">{t.profile.exp5to10}</option>
                    <option value="10+">{t.profile.exp10plus}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t.profile.about}
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder={t.profile.aboutPlaceholder}
                    rows={4}
                    className="input resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">{bio.length}/500 {t.profile.characters}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`btn btn-ghost ${currentStep === 1 ? 'invisible' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
              {t.profile.back}
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="btn btn-primary"
              >
                {t.profile.next}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <button
                onClick={saveProfile}
                disabled={isSaving}
                className="btn btn-primary"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t.profile.saving}
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    {t.profile.save}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link
            href="/home"
            className="text-gray-500 hover:text-primary-600 text-sm transition-colors"
          >
            ← {t.profile.backToHome}
          </Link>
        </div>
      </main>

      <Footer />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slideUp z-50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          {t.profile.saved}
        </div>
      )}
    </>
  );
}
