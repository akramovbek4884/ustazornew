export type Language = 'uz' | 'ru' | 'en';

// Define the translation structure type
type TranslationStructure = {
  nav: {
    home: string;
    courses: string;
    calculator: string;
    contact: string;
    profile: string;
    logout: string;
    login: string;
  };
  auth: {
    welcome: string;
    register: string;
    loginDesc: string;
    registerDesc: string;
    phoneOrEmail: string;
    password: string;
    enterPassword: string;
    forgotPassword: string;
    showPassword: string;
    hidePassword: string;
    loginButton: string;
    registerButton: string;
    noAccount: string;
    hasAccount: string;
    name: string;
    namePlaceholder: string;
    passwordPlaceholder: string;
    termsText: string;
    termsLink: string;
    termsAgree: string;
    loggingIn: string;
    registering: string;
    heroTitle: string;
    heroDesc: string;
    feature1: string;
    feature2: string;
    feature3: string;
    partnership: string;
    welcomeBack: string;
    heyThere: string;
    welcomeBackDesc: string;
    heyThereDesc: string;
  };
  home: {
    heroTitle: string;
    heroDesc: string;
    searchMasters: string;
    viewCourses: string;
    stats: {
      masters: string;
      courses: string;
      users: string;
      reviews: string;
    };
    popularDirections: string;
    categories: {
      welding: string;
      plumbing: string;
      electrical: string;
      construction: string;
      drywall: string;
      roofing: string;
    };
    searchSection: {
      title: string;
      subtitle: string;
      foundCount: string;
      allRegions: string;
      allDistricts: string;
      allProfessions: string;
      activeFilters: string;
      clearFilters: string;
      foundMasters: string;
      noMasters: string;
      noMastersDesc: string;
      clearFiltersBtn: string;
    };
    videoSection: {
      title: string;
      subtitle: string;
      viewAll: string;
    };
    ctaSection: {
      title: string;
      desc: string;
      viewCourses: string;
      register: string;
    };
  };
  courses: {
    title: string;
    description: string;
    getCertificate: string;
    category: string;
    level: string;
    all: string;
    beginner: string;
    intermediate: string;
    professional: string;
    foundCourses: string;
    lessons: string;
    startCourse: string;
    buyCourse: string;
    free: string;
    certificateSection: {
      title: string;
      desc: string;
      takeTest: string;
    };
  };
  calculator: {
    title: string;
    description: string;
    howItWorks: string;
    step1: string;
    step1Desc: string;
    step2: string;
    step2Desc: string;
    step3: string;
    step3Desc: string;
    materials: string;
    calculate: string;
    tip: string;
    tipText: string;
  };
  contact: {
    title: string;
    description: string;
    telegram: string;
    telegramDesc: string;
    phone: string;
    email: string;
    sendMessage: string;
    name: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    sent: string;
    faq: string;
    faq1: string;
    faq1Answer: string;
    faq2: string;
    faq2Answer: string;
    faq3: string;
    faq3Answer: string;
  };
  profile: {
    title: string;
    description: string;
    completion: string;
    steps: {
      personal: string;
      personalDesc: string;
      location: string;
      locationDesc: string;
      profession: string;
      professionDesc: string;
    };
    personalInfo: string;
    profilePhoto: string;
    photoHint: string;
    changePhoto: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    gender: string;
    genderSelect: string;
    male: string;
    female: string;
    birthday: string;
    country: string;
    region: string;
    regionSelect: string;
    district: string;
    districtPlaceholder: string;
    mfy: string;
    mfyPlaceholder: string;
    profession: string;
    professionSelect: string;
    experience: string;
    experienceSelect: string;
    expLess1: string;
    exp1to3: string;
    exp3to5: string;
    exp5to10: string;
    exp10plus: string;
    about: string;
    aboutPlaceholder: string;
    characters: string;
    back: string;
    next: string;
    save: string;
    saving: string;
    saved: string;
    backToHome: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    courses: string;
    contact: string;
    allRights: string;
    partnership: string;
  };
  masterCard: {
    verified: string;
    fastResponse: string;
    message: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    cancel: string;
    confirm: string;
    close: string;
    search: string;
    filter: string;
    sort: string;
    required: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
    viewCourses: string;
    helpfulLinks: string;
  };
  errorPage: {
    title: string;
    description: string;
    retry: string;
    backHome: string;
  };
  portfolio: {
    portfolio: string;
    noItems: string;
    completedAt: string;
    client: string;
    close: string;
  };
  payment: {
    title: string;
    selectMethod: string;
    amount: string;
    pay: string;
    cancel: string;
    processing: string;
    secure: string;
  };
  review: {
    title: string;
    ratingLabel: string;
    commentLabel: string;
    commentPlaceholder: string;
    addPhotos: string;
    maxPhotos: string;
    submit: string;
    cancel: string;
    ratingRequired: string;
    stars: string[];
  };
  recommendations: {
    recommendedMasters: string;
    recommendedCourses: string;
    viewAll: string;
    rating: string;
    free: string;
    reviews: string;
    lessons: string;
  };
};

export const translations: Record<Language, TranslationStructure> = {
  uz: {
    // Navigation
    nav: {
      home: 'Bosh sahifa',
      courses: 'Kurslar',
      calculator: 'Xom-ashyo kalkulyatori',
      contact: "Bog'lanish",
      profile: 'Profil',
      logout: 'Chiqish',
      login: 'Kirish',
    },

    // Auth Page
    auth: {
      welcome: 'Xush kelibsiz!',
      register: "Ro'yxatdan o'tish",
      loginDesc: 'Hisobingizga kiring va davom eting',
      registerDesc: "Yangi hisob yaratib boshlang",
      phoneOrEmail: 'Telefon yoki Email',
      password: 'Parol',
      enterPassword: 'Parol kiriting',
      forgotPassword: 'Parolni unutdingizmi?',
      showPassword: "Ko'rish",
      hidePassword: 'Yopish',
      loginButton: 'Kirish',
      registerButton: "Ro'yxatdan o'tish",
      noAccount: "Hisobingiz yo'qmi?",
      hasAccount: 'Hisobingiz bormi?',
      name: 'Ismingiz',
      namePlaceholder: 'Ism va familiyangiz',
      passwordPlaceholder: 'Kamida 8 ta belgi',
      termsText: "Ro'yxatdan o'tish orqali siz",
      termsLink: 'Foydalanish shartlariga',
      termsAgree: 'rozilik bildirasiz',
      loggingIn: 'Kirilyapti...',
      registering: "Ro'yxatdan o'tilmoqda...",
      // Left panel
      heroTitle: "Kasb o'rganing,\nusta toping",
      heroDesc: "Video darsliklar, amaliy kurslar va mahalliy ustalar — hammasi bitta joyda. Ro'yxatdan o'ting va sayohatingizni boshlang.",
      feature1: '50+ professional kurs',
      feature2: '500+ malakali usta',
      feature3: 'Rasmiy sertifikatlar',
      partnership: 'Yoshlar ishlari agentligi bilan hamkorlikda',
      welcomeBack: 'Xush kelibsiz!',
      heyThere: 'Salom!',
      welcomeBackDesc: "Ma'lumotlaringiz orqali tizimga kiring va tajribangizni davom ettiring",
      heyThereDesc: 'Bugun biz bilan hisob yaratib, ajoyib sayohatingizni boshlang',
    },

    // Home Page
    home: {
      heroTitle: 'Eng yaxshi ustalarni toping',
      heroDesc: "Video darsliklar, amaliy kurslar va mahalliy ustalar — hammasi bitta joyda. O'zingizga mos ustani tanlang va kasbni o'rganing.",
      searchMasters: 'Usta qidirish',
      viewCourses: "Kurslarni ko'rish",
      stats: {
        masters: 'Usta',
        courses: 'Kurs',
        users: 'Foydalanuvchi',
        reviews: 'Sharh',
      },
      popularDirections: "Mashhur yo'nalishlar",
      categories: {
        welding: 'Payvandchilik',
        plumbing: 'Santexnika',
        electrical: 'Elektrika',
        construction: 'Qurilish',
        drywall: 'Gipsokarton',
        roofing: 'Tom yopish',
      },
      searchSection: {
        title: 'Usta qidirish',
        subtitle: 'Viloyat, tuman va kasbni tanlang',
        foundCount: 'ta usta topildi',
        allRegions: 'Barcha viloyatlar',
        allDistricts: 'Barcha tumanlar',
        allProfessions: 'Barcha kasblar',
        activeFilters: 'Faol filterlar:',
        clearFilters: 'Tozalash',
        foundMasters: 'Topilgan ustalar',
        noMasters: 'Ustalar topilmadi',
        noMastersDesc: "Tanlangan filterlar bo'yicha ustalar mavjud emas. Boshqa filterlarni sinab ko'ring.",
        clearFiltersBtn: 'Filterlarni tozalash',
      },
      videoSection: {
        title: 'Ommabop video darslar',
        subtitle: "Eng ko'p tomosha qilingan darslar",
        viewAll: "Barchasini ko'rish",
      },
      ctaSection: {
        title: "Siz ham usta bo'lishni xohlaysizmi?",
        desc: "Kurslarimizni o'rganing, sertifikat oling va professional usta sifatida ro'yxatdan o'ting.",
        viewCourses: "Kurslarni ko'rish",
        register: "Ro'yxatdan o'tish",
      },
    },

    // Courses Page
    courses: {
      title: 'Kurslar',
      description: "Video darslar orqali kasb o'rganing. Har bir kursni tugatganingizdan so'ng sertifikat testi topshirishingiz mumkin.",
      getCertificate: 'Sertifikat olish',
      category: 'Kategoriya',
      level: 'Daraja',
      all: 'Barchasi',
      beginner: "Boshlang'ich",
      intermediate: "O'rta",
      professional: 'Professional',
      foundCourses: 'ta kurs topildi',
      lessons: 'dars',
      startCourse: 'Kursni boshlash',
      buyCourse: 'Sotib olish',
      free: 'Bepul',
      certificateSection: {
        title: 'Sertifikat oling',
        desc: "Kurslarni tugatganingizdan so'ng testni topshiring va rasmiy sertifikat oling.",
        takeTest: 'Test topshirish',
      },
    },

    // Calculator Page
    calculator: {
      title: 'Xom-ashyo kalkulyatori',
      description: "Qurilish materiallarini hisoblash uchun qulay kalkulyator. O'lchamlarni kiriting va kerakli materiallar miqdorini aniqlang.",
      howItWorks: 'Qanday ishlaydi?',
      step1: 'Material tanlang',
      step1Desc: "Quyidagi ro'yxatdan kerakli materialni tanlang",
      step2: "O'lchamlarni kiriting",
      step2Desc: "Uzunlik, kenglik va boshqa parametrlarni kiriting",
      step3: 'Natijani oling',
      step3Desc: 'Kerakli material miqdori avtomatik hisoblanadi',
      materials: 'Materiallar',
      calculate: 'Hisoblash',
      tip: 'Foydali maslahat',
      tipText: "Material miqdorini hisoblashda 5-10% zaxira materialini nazarda tutishni unutmang. Bu kesish va nosozliklar uchun zaxira bo'ladi.",
    },

    // Contact Page
    contact: {
      title: "Biz bilan bog'laning",
      description: "Savollaringiz bormi? Quyidagi usullardan birini tanlang yoki formani to'ldiring.",
      telegram: 'Telegram',
      telegramDesc: 'Tezkor javob olish uchun',
      phone: 'Telefon',
      email: 'Email',
      sendMessage: 'Xabar yuborish',
      name: 'Ismingiz',
      namePlaceholder: "To'liq ismingiz",
      phonePlaceholder: '+998 90 123 45 67',
      emailPlaceholder: 'example@mail.com',
      message: 'Xabar',
      messagePlaceholder: 'Xabaringizni shu yerga yozing...',
      send: 'Yuborish',
      sending: 'Yuborilmoqda...',
      sent: 'Xabaringiz yuborildi!',
      faq: 'Tez-tez beriladigan savollar',
      faq1: 'Ustalarni qanday topish mumkin?',
      faq1Answer: "Bosh sahifada viloyat, tuman va kasbni tanlang. Natijada sizga mos ustalar ro'yxati ko'rsatiladi.",
      faq2: 'Kurslar pullikmi?',
      faq2Answer: "Ba'zi kurslar bepul, ba'zilari esa pullik. Har bir kurs sahifasida narx ko'rsatilgan.",
      faq3: 'Sertifikat qanday olaman?',
      faq3Answer: "Kursni tugatgandan so'ng testni topshiring. Muvaffaqiyatli o'tganingizda sertifikat yuklab olish imkoniyati paydo bo'ladi.",
    },

    // Profile Page
    profile: {
      title: 'Profilni tahrirlash',
      description: "Ma'lumotlaringizni to'ldirib profilingizni yarating",
      completion: "Profil to'ldirilishi",
      steps: {
        personal: 'Shaxsiy',
        personalDesc: "Asosiy ma'lumotlar",
        location: 'Manzil',
        locationDesc: 'Joylashuv',
        profession: 'Kasb',
        professionDesc: "Tajriba va ko'nikmalar",
      },
      personalInfo: "Shaxsiy ma'lumotlar",
      profilePhoto: 'Profil rasmi',
      photoHint: 'JPG, PNG. Max 2MB hajm.',
      changePhoto: "Rasmni o'zgartirish",
      firstName: 'Ism',
      lastName: 'Familiya',
      phone: 'Telefon',
      email: 'Email',
      gender: 'Jinsi',
      genderSelect: 'Tanlang',
      male: 'Erkak',
      female: 'Ayol',
      birthday: "Tug'ilgan sana",
      country: 'Mamlakat',
      region: 'Viloyat',
      regionSelect: 'Viloyatni tanlang',
      district: 'Tuman / Shahar',
      districtPlaceholder: 'Tuman yoki shahar nomi',
      mfy: 'MFY',
      mfyPlaceholder: "Mahalla fuqarolar yig'ini",
      profession: 'Kasb',
      professionSelect: 'Kasbni tanlang',
      experience: 'Tajriba (yil)',
      experienceSelect: 'Tajribani tanlang',
      expLess1: '1 yildan kam',
      exp1to3: '1-3 yil',
      exp3to5: '3-5 yil',
      exp5to10: '5-10 yil',
      exp10plus: "10 yildan ko'p",
      about: "O'zingiz haqingizda",
      aboutPlaceholder: "Qisqacha o'zingiz haqingizda yozing...",
      characters: 'belgi',
      back: 'Orqaga',
      next: 'Keyingisi',
      save: 'Saqlash',
      saving: 'Saqlanmoqda...',
      saved: 'Profil muvaffaqiyatli saqlandi!',
      backToHome: 'Bosh sahifaga qaytish',
    },

    // Footer
    footer: {
      description: "Video darsliklar, amaliy kurslar va mahalliy ustalar — hammasi bitta joyda.",
      quickLinks: 'Tez havolalar',
      courses: 'Kurslar',
      contact: 'Aloqa',
      allRights: 'Barcha huquqlar himoyalangan',
      partnership: 'Hamkorlikda:',
    },

    // Master Card
    masterCard: {
      verified: 'Tasdiqlangan usta',
      fastResponse: 'Tez javob',
      message: 'Xabar',
    },

    // Common
    common: {
      loading: 'Yuklanmoqda...',
      error: 'Xatolik yuz berdi',
      retry: 'Qayta urinish',
      cancel: 'Bekor qilish',
      confirm: 'Tasdiqlash',
      close: 'Yopish',
      search: 'Qidirish',
      filter: 'Filter',
      sort: 'Saralash',
      required: 'majburiy',
    },

    // 404 Page
    notFound: {
      title: 'Sahifa topilmadi',
      description: "Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.",
      backHome: 'Bosh sahifaga',
      viewCourses: "Kurslarni ko'rish",
      helpfulLinks: 'Foydali havolalar:',
    },

    // Error Page
    errorPage: {
      title: 'Nimadir xato ketdi',
      description: "Kechirasiz, kutilmagan xatolik yuz berdi. Iltimos, qayta urinib ko'ring yoki bosh sahifaga qayting.",
      retry: 'Qayta urinish',
      backHome: 'Bosh sahifaga',
    },
    portfolio: {
      portfolio: "Portfolio",
      noItems: "Portfolio bo'sh",
      completedAt: "Bajarilgan",
      client: "Mijoz",
      close: "Yopish"
    },
    payment: {
      title: "To'lov",
      selectMethod: "To'lov usulini tanlang",
      amount: "Summa",
      pay: "To'lash",
      cancel: "Bekor qilish",
      processing: "Jarayonda...",
      secure: "Xavfsiz to'lov"
    },
    review: {
      title: "Sharh yozish",
      ratingLabel: "Baholash",
      commentLabel: "Sharh matni",
      commentPlaceholder: "Usta haqida fikringizni yozing...",
      addPhotos: "Rasm qo'shish",
      maxPhotos: "(maksimum 3 ta)",
      submit: "Yuborish",
      cancel: "Bekor qilish",
      ratingRequired: "Iltimos, baho qo'ying",
      stars: ["Juda yomon", "Yomon", "O'rtacha", "Yaxshi", "A'lo"]
    },
    recommendations: {
      recommendedMasters: "Tavsiya etilgan ustalar",
      recommendedCourses: "Tavsiya etilgan kurslar",
      viewAll: "Barchasini ko'rish",
      rating: "Reyting",
      free: "Bepul",
      reviews: "ta sharh",
      lessons: "ta dars"
    },
  },

  ru: {
    // Navigation
    nav: {
      home: 'Главная',
      courses: 'Курсы',
      calculator: 'Калькулятор материалов',
      contact: 'Контакты',
      profile: 'Профиль',
      logout: 'Выйти',
      login: 'Войти',
    },

    // Auth Page
    auth: {
      welcome: 'Добро пожаловать!',
      register: 'Регистрация',
      loginDesc: 'Войдите в свой аккаунт',
      registerDesc: 'Создайте новый аккаунт',
      phoneOrEmail: 'Телефон или Email',
      password: 'Пароль',
      enterPassword: 'Введите пароль',
      forgotPassword: 'Забыли пароль?',
      showPassword: 'Показать',
      hidePassword: 'Скрыть',
      loginButton: 'Войти',
      registerButton: 'Зарегистрироваться',
      noAccount: 'Нет аккаунта?',
      hasAccount: 'Уже есть аккаунт?',
      name: 'Ваше имя',
      namePlaceholder: 'Имя и фамилия',
      passwordPlaceholder: 'Минимум 8 символов',
      termsText: 'Регистрируясь, вы соглашаетесь с',
      termsLink: 'Условиями использования',
      termsAgree: '',
      loggingIn: 'Вход...',
      registering: 'Регистрация...',
      // Left panel
      heroTitle: 'Учитесь ремеслу,\nнаходите мастеров',
      heroDesc: 'Видеоуроки, практические курсы и местные мастера — всё в одном месте. Зарегистрируйтесь и начните свой путь.',
      feature1: '50+ профессиональных курсов',
      feature2: '500+ квалифицированных мастеров',
      feature3: 'Официальные сертификаты',
      partnership: 'При поддержке Агентства по делам молодёжи',
      welcomeBack: 'С возвращением!',
      heyThere: 'Привет!',
      welcomeBackDesc: 'Оставайтесь на связи, войдя в систему со своими учетными данными',
      heyThereDesc: 'Начните свое удивительное путешествие, создав аккаунт у нас сегодня',
    },

    // Home Page
    home: {
      heroTitle: 'Найдите лучших мастеров',
      heroDesc: 'Видеоуроки, практические курсы и местные мастера — всё в одном месте. Выберите подходящего мастера и освойте профессию.',
      searchMasters: 'Найти мастера',
      viewCourses: 'Смотреть курсы',
      stats: {
        masters: 'Мастеров',
        courses: 'Курсов',
        users: 'Пользователей',
        reviews: 'Отзывов',
      },
      popularDirections: 'Популярные направления',
      categories: {
        welding: 'Сварка',
        plumbing: 'Сантехника',
        electrical: 'Электрика',
        construction: 'Строительство',
        drywall: 'Гипсокартон',
        roofing: 'Кровля',
      },
      searchSection: {
        title: 'Поиск мастера',
        subtitle: 'Выберите область, район и профессию',
        foundCount: 'мастеров найдено',
        allRegions: 'Все области',
        allDistricts: 'Все районы',
        allProfessions: 'Все профессии',
        activeFilters: 'Активные фильтры:',
        clearFilters: 'Очистить',
        foundMasters: 'Найденные мастера',
        noMasters: 'Мастера не найдены',
        noMastersDesc: 'По выбранным фильтрам мастера не найдены. Попробуйте другие фильтры.',
        clearFiltersBtn: 'Сбросить фильтры',
      },
      videoSection: {
        title: 'Популярные видеоуроки',
        subtitle: 'Самые просматриваемые уроки',
        viewAll: 'Смотреть все',
      },
      ctaSection: {
        title: 'Хотите стать мастером?',
        desc: 'Пройдите наши курсы, получите сертификат и зарегистрируйтесь как профессиональный мастер.',
        viewCourses: 'Смотреть курсы',
        register: 'Зарегистрироваться',
      },
    },

    // Courses Page
    courses: {
      title: 'Курсы',
      description: 'Осваивайте профессию через видеоуроки. После завершения каждого курса можно сдать тест на сертификат.',
      getCertificate: 'Получить сертификат',
      category: 'Категория',
      level: 'Уровень',
      all: 'Все',
      beginner: 'Начальный',
      intermediate: 'Средний',
      professional: 'Профессиональный',
      foundCourses: 'курсов найдено',
      lessons: 'уроков',
      startCourse: 'Начать курс',
      buyCourse: 'Купить',
      free: 'Бесплатно',
      certificateSection: {
        title: 'Получите сертификат',
        desc: 'После завершения курсов сдайте тест и получите официальный сертификат.',
        takeTest: 'Сдать тест',
      },
    },

    // Calculator Page
    calculator: {
      title: 'Калькулятор материалов',
      description: 'Удобный калькулятор для расчёта строительных материалов. Введите размеры и узнайте необходимое количество материалов.',
      howItWorks: 'Как это работает?',
      step1: 'Выберите материал',
      step1Desc: 'Выберите нужный материал из списка ниже',
      step2: 'Введите размеры',
      step2Desc: 'Введите длину, ширину и другие параметры',
      step3: 'Получите результат',
      step3Desc: 'Количество материала рассчитывается автоматически',
      materials: 'Материалы',
      calculate: 'Рассчитать',
      tip: 'Полезный совет',
      tipText: 'При расчёте количества материала не забудьте добавить 5-10% запаса. Это резерв на обрезки и брак.',
    },

    // Contact Page
    contact: {
      title: 'Свяжитесь с нами',
      description: 'Есть вопросы? Выберите один из способов связи или заполните форму.',
      telegram: 'Telegram',
      telegramDesc: 'Для быстрого ответа',
      phone: 'Телефон',
      email: 'Email',
      sendMessage: 'Отправить сообщение',
      name: 'Ваше имя',
      namePlaceholder: 'Полное имя',
      phonePlaceholder: '+998 90 123 45 67',
      emailPlaceholder: 'example@mail.com',
      message: 'Сообщение',
      messagePlaceholder: 'Напишите ваше сообщение здесь...',
      send: 'Отправить',
      sending: 'Отправка...',
      sent: 'Сообщение отправлено!',
      faq: 'Часто задаваемые вопросы',
      faq1: 'Как найти мастера?',
      faq1Answer: 'На главной странице выберите область, район и профессию. В результате появится список подходящих мастеров.',
      faq2: 'Курсы платные?',
      faq2Answer: 'Некоторые курсы бесплатные, некоторые платные. Цена указана на странице каждого курса.',
      faq3: 'Как получить сертификат?',
      faq3Answer: 'После завершения курса сдайте тест. При успешном прохождении появится возможность скачать сертификат.',
    },

    // Profile Page
    profile: {
      title: 'Редактирование профиля',
      description: 'Заполните данные и создайте свой профиль',
      completion: 'Заполненность профиля',
      steps: {
        personal: 'Личные',
        personalDesc: 'Основные данные',
        location: 'Адрес',
        locationDesc: 'Местоположение',
        profession: 'Профессия',
        professionDesc: 'Опыт и навыки',
      },
      personalInfo: 'Личные данные',
      profilePhoto: 'Фото профиля',
      photoHint: 'JPG, PNG. Макс. 2MB.',
      changePhoto: 'Изменить фото',
      firstName: 'Имя',
      lastName: 'Фамилия',
      phone: 'Телефон',
      email: 'Email',
      gender: 'Пол',
      genderSelect: 'Выберите',
      male: 'Мужской',
      female: 'Женский',
      birthday: 'Дата рождения',
      country: 'Страна',
      region: 'Область',
      regionSelect: 'Выберите область',
      district: 'Район / Город',
      districtPlaceholder: 'Название района или города',
      mfy: 'Махалля',
      mfyPlaceholder: 'Махаллинский сход граждан',
      profession: 'Профессия',
      professionSelect: 'Выберите профессию',
      experience: 'Опыт (лет)',
      experienceSelect: 'Выберите опыт',
      expLess1: 'Менее 1 года',
      exp1to3: '1-3 года',
      exp3to5: '3-5 лет',
      exp5to10: '5-10 лет',
      exp10plus: 'Более 10 лет',
      about: 'О себе',
      aboutPlaceholder: 'Расскажите немного о себе...',
      characters: 'символов',
      back: 'Назад',
      next: 'Далее',
      save: 'Сохранить',
      saving: 'Сохранение...',
      saved: 'Профиль успешно сохранён!',
      backToHome: 'Вернуться на главную',
    },

    // Footer
    footer: {
      description: 'Видеоуроки, практические курсы и местные мастера — всё в одном месте.',
      quickLinks: 'Быстрые ссылки',
      courses: 'Курсы',
      contact: 'Контакты',
      allRights: 'Все права защищены',
      partnership: 'При поддержке:',
    },

    // Master Card
    masterCard: {
      verified: 'Проверенный мастер',
      fastResponse: 'Быстрый ответ',
      message: 'Написать',
    },

    // Common
    common: {
      loading: 'Загрузка...',
      error: 'Произошла ошибка',
      retry: 'Повторить',
      cancel: 'Отмена',
      confirm: 'Подтвердить',
      close: 'Закрыть',
      search: 'Поиск',
      filter: 'Фильтр',
      sort: 'Сортировка',
      required: 'обязательно',
    },

    // 404 Page
    notFound: {
      title: 'Страница не найдена',
      description: 'Извините, запрашиваемая страница не существует или была перемещена.',
      backHome: 'На главную',
      viewCourses: 'Смотреть курсы',
      helpfulLinks: 'Полезные ссылки:',
    },

    // Error Page
    errorPage: {
      title: 'Что-то пошло не так',
      description: 'Извините, произошла непредвиденная ошибка. Пожалуйста, попробуйте ещё раз или вернитесь на главную.',
      retry: 'Повторить',
      backHome: 'На главную',
    },
    portfolio: {
      portfolio: "Портфолио",
      noItems: "Портфолио пусто",
      completedAt: "Выполнено",
      client: "Клиент",
      close: "Закрыть"
    },
    payment: {
      title: "Оплата",
      selectMethod: "Выберите способ оплаты",
      amount: "Сумма",
      pay: "Оплатить",
      cancel: "Отмена",
      processing: "Обработка...",
      secure: "Безопасная оплата"
    },
    review: {
      title: "Написать отзыв",
      ratingLabel: "Оценка",
      commentLabel: "Текст отзыва",
      commentPlaceholder: "Напишите ваше мнение о мастере...",
      addPhotos: "Добавить фото",
      maxPhotos: "(максимум 3)",
      submit: "Отправить",
      cancel: "Отмена",
      ratingRequired: "Пожалуйста, поставьте оценку",
      stars: ["Очень плохо", "Плохо", "Средне", "Хорошо", "Отлично"]
    },
    recommendations: {
      recommendedMasters: "Рекомендуемые мастера",
      recommendedCourses: "Рекомендуемые курсы",
      viewAll: "Смотреть все",
      rating: "Рейтинг",
      free: "Бесплатно",
      reviews: "отзывов",
      lessons: "уроков"
    },
  },

  en: {
    // Navigation
    nav: {
      home: 'Home',
      courses: 'Courses',
      calculator: 'Material Calculator',
      contact: 'Contact',
      profile: 'Profile',
      logout: 'Logout',
      login: 'Login',
    },

    // Auth Page
    auth: {
      welcome: 'Welcome!',
      register: 'Register',
      loginDesc: 'Sign in to your account',
      registerDesc: 'Create a new account',
      phoneOrEmail: 'Phone or Email',
      password: 'Password',
      enterPassword: 'Enter password',
      forgotPassword: 'Forgot password?',
      showPassword: 'Show',
      hidePassword: 'Hide',
      loginButton: 'Login',
      registerButton: 'Register',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      name: 'Your name',
      namePlaceholder: 'Full name',
      passwordPlaceholder: 'At least 8 characters',
      termsText: 'By registering, you agree to our',
      termsLink: 'Terms of Service',
      termsAgree: '',
      loggingIn: 'Logging in...',
      registering: 'Registering...',
      // Left panel
      heroTitle: 'Learn a trade,\nfind craftsmen',
      heroDesc: 'Video tutorials, practical courses, and local craftsmen — all in one place. Register and start your journey.',
      feature1: '50+ professional courses',
      feature2: '500+ qualified craftsmen',
      feature3: 'Official certificates',
      partnership: 'In partnership with the Youth Affairs Agency',
      welcomeBack: 'Welcome Back!',
      heyThere: 'Hey There!',
      welcomeBackDesc: 'Stay connected by logging in with your credentials and continue your experience',
      heyThereDesc: 'Begin your amazing journey by creating an account with us today',
    },

    // Home Page
    home: {
      heroTitle: 'Find the best craftsmen',
      heroDesc: 'Video tutorials, practical courses, and local craftsmen — all in one place. Choose the right craftsman and learn a trade.',
      searchMasters: 'Find craftsmen',
      viewCourses: 'View courses',
      stats: {
        masters: 'Craftsmen',
        courses: 'Courses',
        users: 'Users',
        reviews: 'Reviews',
      },
      popularDirections: 'Popular directions',
      categories: {
        welding: 'Welding',
        plumbing: 'Plumbing',
        electrical: 'Electrical',
        construction: 'Construction',
        drywall: 'Drywall',
        roofing: 'Roofing',
      },
      searchSection: {
        title: 'Find craftsmen',
        subtitle: 'Select region, district, and profession',
        foundCount: 'craftsmen found',
        allRegions: 'All regions',
        allDistricts: 'All districts',
        allProfessions: 'All professions',
        activeFilters: 'Active filters:',
        clearFilters: 'Clear',
        foundMasters: 'Found craftsmen',
        noMasters: 'No craftsmen found',
        noMastersDesc: 'No craftsmen found with selected filters. Try different filters.',
        clearFiltersBtn: 'Clear filters',
      },
      videoSection: {
        title: 'Popular video lessons',
        subtitle: 'Most watched lessons',
        viewAll: 'View all',
      },
      ctaSection: {
        title: 'Want to become a craftsman?',
        desc: 'Complete our courses, get a certificate, and register as a professional craftsman.',
        viewCourses: 'View courses',
        register: 'Register',
      },
    },

    // Courses Page
    courses: {
      title: 'Courses',
      description: 'Learn a profession through video lessons. After completing each course, you can take a certification test.',
      getCertificate: 'Get certificate',
      category: 'Category',
      level: 'Level',
      all: 'All',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      professional: 'Professional',
      foundCourses: 'courses found',
      lessons: 'lessons',
      startCourse: 'Start course',
      buyCourse: 'Buy',
      free: 'Free',
      certificateSection: {
        title: 'Get a certificate',
        desc: 'After completing courses, take the test and get an official certificate.',
        takeTest: 'Take test',
      },
    },

    // Calculator Page
    calculator: {
      title: 'Material Calculator',
      description: 'A convenient calculator for construction materials. Enter dimensions and determine the required amount of materials.',
      howItWorks: 'How it works?',
      step1: 'Select material',
      step1Desc: 'Choose the required material from the list below',
      step2: 'Enter dimensions',
      step2Desc: 'Enter length, width, and other parameters',
      step3: 'Get result',
      step3Desc: 'Material quantity is calculated automatically',
      materials: 'Materials',
      calculate: 'Calculate',
      tip: 'Helpful tip',
      tipText: 'When calculating material quantity, remember to add 5-10% reserve. This is a reserve for cutting and defects.',
    },

    // Contact Page
    contact: {
      title: 'Contact us',
      description: 'Have questions? Choose one of the contact methods or fill out the form.',
      telegram: 'Telegram',
      telegramDesc: 'For quick response',
      phone: 'Phone',
      email: 'Email',
      sendMessage: 'Send message',
      name: 'Your name',
      namePlaceholder: 'Full name',
      phonePlaceholder: '+998 90 123 45 67',
      emailPlaceholder: 'example@mail.com',
      message: 'Message',
      messagePlaceholder: 'Write your message here...',
      send: 'Send',
      sending: 'Sending...',
      sent: 'Message sent!',
      faq: 'Frequently asked questions',
      faq1: 'How to find craftsmen?',
      faq1Answer: 'On the home page, select region, district, and profession. A list of suitable craftsmen will appear.',
      faq2: 'Are courses paid?',
      faq2Answer: 'Some courses are free, some are paid. The price is shown on each course page.',
      faq3: 'How to get a certificate?',
      faq3Answer: 'After completing a course, take the test. Upon successful completion, you can download the certificate.',
    },

    // Profile Page
    profile: {
      title: 'Edit profile',
      description: 'Fill in your details and create your profile',
      completion: 'Profile completion',
      steps: {
        personal: 'Personal',
        personalDesc: 'Basic info',
        location: 'Address',
        locationDesc: 'Location',
        profession: 'Profession',
        professionDesc: 'Experience & skills',
      },
      personalInfo: 'Personal information',
      profilePhoto: 'Profile photo',
      photoHint: 'JPG, PNG. Max 2MB.',
      changePhoto: 'Change photo',
      firstName: 'First name',
      lastName: 'Last name',
      phone: 'Phone',
      email: 'Email',
      gender: 'Gender',
      genderSelect: 'Select',
      male: 'Male',
      female: 'Female',
      birthday: 'Date of birth',
      country: 'Country',
      region: 'Region',
      regionSelect: 'Select region',
      district: 'District / City',
      districtPlaceholder: 'District or city name',
      mfy: 'Neighborhood',
      mfyPlaceholder: 'Neighborhood community',
      profession: 'Profession',
      professionSelect: 'Select profession',
      experience: 'Experience (years)',
      experienceSelect: 'Select experience',
      expLess1: 'Less than 1 year',
      exp1to3: '1-3 years',
      exp3to5: '3-5 years',
      exp5to10: '5-10 years',
      exp10plus: 'More than 10 years',
      about: 'About yourself',
      aboutPlaceholder: 'Tell us briefly about yourself...',
      characters: 'characters',
      back: 'Back',
      next: 'Next',
      save: 'Save',
      saving: 'Saving...',
      saved: 'Profile saved successfully!',
      backToHome: 'Back to home',
    },

    // Footer
    footer: {
      description: 'Video tutorials, practical courses, and local craftsmen — all in one place.',
      quickLinks: 'Quick links',
      courses: 'Courses',
      contact: 'Contact',
      allRights: 'All rights reserved',
      partnership: 'In partnership with:',
    },

    // Master Card
    masterCard: {
      verified: 'Verified craftsman',
      fastResponse: 'Fast response',
      message: 'Message',
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      retry: 'Retry',
      cancel: 'Cancel',
      confirm: 'Confirm',
      close: 'Close',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      required: 'required',
    },

    // 404 Page
    notFound: {
      title: 'Page not found',
      description: 'Sorry, the page you are looking for does not exist or has been moved.',
      backHome: 'Go home',
      viewCourses: 'View courses',
      helpfulLinks: 'Helpful links:',
    },

    // Error Page
    errorPage: {
      title: 'Something went wrong',
      description: 'Sorry, an unexpected error occurred. Please try again or return to the home page.',
      retry: 'Retry',
      backHome: 'Go home',
    },
    portfolio: {
      portfolio: "Portfolio",
      noItems: "Portfolio is empty",
      completedAt: "Completed",
      client: "Client",
      close: "Close"
    },
    payment: {
      title: "Payment",
      selectMethod: "Select payment method",
      amount: "Amount",
      pay: "Pay",
      cancel: "Cancel",
      processing: "Processing...",
      secure: "Secure payment"
    },
    review: {
      title: "Write a Review",
      ratingLabel: "Rating",
      commentLabel: "Review text",
      commentPlaceholder: "Write your opinion about the master...",
      addPhotos: "Add photos",
      maxPhotos: "(maximum 3)",
      submit: "Submit",
      cancel: "Cancel",
      ratingRequired: "Please provide a rating",
      stars: ["Very bad", "Bad", "Average", "Good", "Excellent"]
    },
    recommendations: {
      recommendedMasters: "Recommended Masters",
      recommendedCourses: "Recommended Courses",
      viewAll: "View All",
      rating: "Rating",
      free: "Free",
      reviews: "reviews",
      lessons: "lessons"
    },
  },
} as const;

export type TranslationKeys = typeof translations.uz;
