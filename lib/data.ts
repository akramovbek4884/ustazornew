import { 
  Master, Video, Course, Question, Material, 
  Booking, Review, Job, ForumCategory, ForumTopic, 
  BlogPost, Conversation, Message, Notification,
  Service, PortfolioItem
} from '@/types';

// ==================== MASTERS ====================

export const masters: Master[] = [
  {
    id: '1',
    name: 'Abdulloh Karimov',
    profession: "G'isht Teruvchi",
    region: 'Toshkent',
    city: 'Chilonzor',
    phone: '+998901234567',
    avatar: 'https://img.a.transfermarkt.technology/portrait/big/581678-1748102891.jpg?lm=1',
    rating: 4.8,
    reviewCount: 47,
    isVerified: true,
    responseTime: '< 1 soat',
    email: 'abdulloh@example.com',
    bio: "15 yillik tajribaga ega g'isht teruvchi usta. Sifatli va tez ish kafolatlanadi.",
    experience: 15,
    completedJobs: 234,
    hourlyRate: 50000,
    insurance: true,
    guarantee: '2 yil kafolat',
    badges: [
      { id: '1', name: 'Top Usta', icon: '🏆', description: "Eng ko'p baholangan", earnedAt: '2024-01-15' },
      { id: '2', name: 'Tez Javob', icon: '⚡', description: '1 soat ichida javob beradi', earnedAt: '2024-03-20' }
    ],
    services: [
      { id: 's1', name: "G'isht terish", price: 50000, priceType: 'hourly', description: "Har qanday turdagi g'isht ishlari" },
      { id: 's2', name: 'Devor qurish', price: 150000, priceType: 'fixed', duration: '1-3 kun' }
    ]
  },
  {
    id: '2',
    name: 'Jasur Toshmatov',
    profession: "G'isht Teruvchi",
    region: 'Toshkent',
    city: 'Chilonzor',
    phone: '+998901234568',
    avatar: 'https://img.a.transfermarkt.technology/portrait/big/342229-1682683695.jpg?lm=1',
    rating: 4.6,
    reviewCount: 32,
    isVerified: true,
    responseTime: '< 2 soat',
    experience: 10,
    completedJobs: 156,
    hourlyRate: 45000,
  },
  {
    id: '3',
    name: 'Sardor Alimov',
    profession: 'Suvoq qiluvchi',
    region: 'Toshkent',
    city: 'Yunusobod',
    phone: '+998901234570',
    avatar: 'https://zamin.uz/uploads/posts/2025-07/a9f29331ec_lamin-yamal-barselona-jamoasida-raqamini-ozgartirdi-9359-1.webp',
    rating: 4.9,
    reviewCount: 89,
    isVerified: true,
    responseTime: '< 30 daqiqa',
    experience: 20,
    completedJobs: 412,
    hourlyRate: 60000,
    badges: [
      { id: '3', name: 'Premium Usta', icon: '👑', description: "Eng yuqori reytingli", earnedAt: '2024-02-10' }
    ]
  },
  {
    id: '4',
    name: 'Bobur Rahimov',
    profession: 'Tom Yopuvchi',
    region: 'Samarqand',
    city: 'Shahrisabz',
    phone: '+998901234572',
    avatar: 'https://i.pinimg.com/736x/b4/0e/9e/b40e9eadc4187bcdf22ac4461883548e.jpg',
    rating: 4.7,
    reviewCount: 28,
    isVerified: false,
    responseTime: '< 3 soat',
    experience: 8,
    completedJobs: 98,
    hourlyRate: 55000,
  },
  {
    id: '5',
    name: 'Rustam Qodirov',
    profession: 'Chilangar',
    region: "Farg'ona",
    city: "Farg'ona Shahri",
    phone: '+998901234574',
    avatar: 'https://hips.hearstapps.com/hmg-prod/images/cristiano-ronaldo-of-portugal-during-the-uefa-nations-news-photo-1748359673.pjpeg?crop=0.610xw:0.917xh;0.317xw,0.0829xh&resize=640:*',
    rating: 4.5,
    reviewCount: 21,
    isVerified: true,
    responseTime: '< 1 soat',
    experience: 12,
    completedJobs: 187,
    hourlyRate: 40000,
  },
  {
    id: '6',
    name: 'Nodirbek Tursunov',
    profession: 'Payvandchi',
    region: 'Toshkent',
    city: 'Sergeli',
    phone: '+998901234575',
    avatar: '/img/svarkachi.jpg',
    rating: 4.9,
    reviewCount: 156,
    isVerified: true,
    responseTime: '< 15 daqiqa',
    experience: 18,
    completedJobs: 523,
    hourlyRate: 70000,
    insurance: true,
    guarantee: '3 yil kafolat',
    badges: [
      { id: '4', name: 'Super Usta', icon: '⭐', description: "500+ ish bajarilgan", earnedAt: '2024-01-01' },
      { id: '5', name: 'Sertifikatlangan', icon: '📜', description: "Rasmiy sertifikat mavjud", earnedAt: '2023-06-15' }
    ]
  },
  {
    id: '7',
    name: 'Akmal Nazarov',
    profession: 'Santexnik',
    region: 'Toshkent',
    city: 'Mirzo Ulugbek',
    phone: '+998901234576',
    avatar: 'https://stroybirja.km.ua/wp-content/uploads/2020/04/santehnik.jpg',
    rating: 4.7,
    reviewCount: 64,
    isVerified: true,
    responseTime: '< 30 daqiqa',
    experience: 14,
    completedJobs: 298,
    hourlyRate: 45000,
  },
  {
    id: '8',
    name: 'Dilshod Ergashev',
    profession: 'Elektrik',
    region: 'Toshkent',
    city: 'Shayxontohur',
    phone: '+998901234577',
    avatar: 'https://mfcs-ufa.ru/upload/images_Roman/elektromontazhnye_raboty-min.jpeg',
    rating: 4.8,
    reviewCount: 92,
    isVerified: true,
    responseTime: '< 1 soat',
    experience: 16,
    completedJobs: 387,
    hourlyRate: 55000,
    insurance: true,
  }
];

export const regions = ['Toshkent', 'Samarqand', "Farg'ona", 'Andijon', 'Namangan', 'Buxoro', 'Xorazm', 'Qashqadaryo', 'Surxondaryo', 'Jizzax', 'Sirdaryo', 'Navoiy', "Qoraqalpog'iston"];

export const cities: Record<string, string[]> = {
  'Toshkent': ['Chilonzor', 'Yunusobod', 'Sergeli', 'Mirzo Ulugbek', 'Shayxontohur', 'Olmazor', 'Yakkasaroy', 'Mirobod', 'Bektemir', 'Uchtepa', 'Yashnobod'],
  'Samarqand': ['Samarqand Shahri', 'Shahrisabz', 'Urgut', 'Kattaqurgon', 'Bulungur'],
  "Farg'ona": ["Farg'ona Shahri", "Marg'ilon", 'Quva', 'Qoqon', 'Rishton'],
  'Andijon': ['Andijon Shahri', 'Asaka', 'Xonobod'],
  'Namangan': ['Namangan Shahri', 'Chortoq', 'Pop'],
  'Buxoro': ['Buxoro Shahri', 'Kogon', 'Jondor'],
  'default': ['Markaz', 'Shahar']
};

export const professions = [
  "G'isht Teruvchi", 'Suvoq qiluvchi', 'Tom Yopuvchi', 'Chilangar',
  'Payvandchi', 'Santexnik', 'Elektrik', 'Gipsokartonchi',
  'Duradgor', "Bo'yoqchi", 'Kafelchi', 'Derazachi'
];

// ==================== VIDEOS ====================

export const videos: Video[] = [
  { id: '1', src: '/video/vid1.mp4', title: 'Payvand asoslari', instructor: 'Nodirbek', duration: '45 min', views: 12500, likes: 890, category: 'welding', thumbnail: '/img/svarkachi.jpg' },
  { id: '2', src: '/video/payvandlash.mp4', title: 'Payvandlash amaliyoti', instructor: 'Nodirbek', duration: '40 min', views: 9800, likes: 720, category: 'welding' },
  { id: '3', src: '/video/vid2.mp4', title: 'Santexnika — trubalar', instructor: 'Akmal', duration: '28 min', views: 8200, likes: 560, category: 'plumbing' },
  { id: '4', src: '/video/w.mp4', title: 'Elektr olchovlari 1', instructor: 'Dilshod', duration: '33 min', views: 7600, likes: 480, category: 'electrical' },
  { id: '5', src: '/video/e.mp4', title: 'Elektr olchovlari 2', instructor: 'Dilshod', duration: '33 min', views: 6900, likes: 420, category: 'electrical' },
  { id: '6', src: '/video/r.mp4', title: 'Elektr olchovlari 3', instructor: 'Dilshod', duration: '33 min', views: 5800, likes: 380, category: 'electrical' },
  { id: '7', src: '/video/a.mp4', title: 'Elektr olchovlari 4', instructor: 'Dilshod', duration: '33 min', views: 5200, likes: 340, category: 'electrical' },
  { id: '8', src: '/video/d.mp4', title: 'Elektr olchovlari 5', instructor: 'Dilshod', duration: '33 min', views: 4800, likes: 310, category: 'electrical' },
  { id: '9', src: '/video/vid3.mp4', title: 'Santexnika amaliyoti', instructor: 'Akmal', duration: '35 min', views: 7100, likes: 490, category: 'plumbing' },
  { id: '10', src: '/video/vid4.mp4', title: 'Gipsokarton ishlari', instructor: 'Sardor', duration: '21 min', views: 6400, likes: 430, category: 'drywall' },
];

// ==================== COURSES ====================

export const courses: Course[] = [
  {
    id: '1',
    title: 'Payvandchilik asoslari',
    description: "Payvandlash san'atini noldan o'rganing. Xavfsizlik qoidalari, asboblar va texnikalar.",
    thumbnail: 'https://aksent.uz/media/cache/39/85/398591bed6b3812e6f5c7d672ae36662.jpg',
    href: '/darslar/svarka',
    priceValue: 0,
    isFree: true,
    duration: '3 soat',
    level: 'beginner',
    lessons: 10,
    instructor: 'Nodirbek Tursunov',
    category: 'welding',
    rating: 4.9,
    enrolledCount: 2340,
    certificate: true
  },
  {
    id: '2',
    title: 'Santexnikada truba ishlari',
    description: "Truba o'rnatish, ta'mirlash va profilaktika bo'yicha to'liq kurs.",
    thumbnail: 'https://stroybirja.km.ua/wp-content/uploads/2020/04/santehnik.jpg',
    href: '/darslar/santexnik',
    priceValue: 150000,
    isFree: false,
    duration: '4 soat',
    level: 'intermediate',
    lessons: 12,
    instructor: 'Akmal Nazarov',
    category: 'plumbing',
    rating: 4.7,
    enrolledCount: 1560,
    certificate: true
  },
  {
    id: '3',
    title: 'Chilangarlik',
    description: "Metall buyumlarni yasash va ta'mirlash bo'yicha amaliy darslar.",
    thumbnail: 'https://v-prof.ru/%D1%81%D0%BB%D0%B5%D1%81%D0%B0%D1%80%D1%8C-%D1%8D%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%B8%D0%BA%20%D0%BF%D0%BE%20%D1%80%D0%B5%D0%BC%D0%BE%D0%BD%D1%82%D1%83%20%D1%8D%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D0%BE%D0%B1%D0%BE%D1%80%D1%83%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.jpg',
    href: '/darslar/chilangar',
    priceValue: 0,
    isFree: true,
    duration: '2 soat',
    level: 'beginner',
    lessons: 6,
    category: 'locksmith',
    rating: 4.5,
    enrolledCount: 890,
    certificate: true
  },
  {
    id: '4',
    title: 'Gipsokarton ishlari',
    description: "Professional darajada gipsokarton bilan ishlashni o'rganing.",
    thumbnail: 'https://jobcode.org/cdn/s1oxcuag11rp1lux2ky7n97tu7oc/gipsokartonshchik.jpg',
    href: '/darslar/gipsakarton',
    priceValue: 200000,
    isFree: false,
    duration: '5 soat',
    level: 'advanced',
    lessons: 15,
    category: 'drywall',
    rating: 4.8,
    enrolledCount: 1120,
    certificate: true
  },
  {
    id: '5',
    title: 'Chevarchilik ishlari',
    description: "Tikuvchilik va chevarchilik asoslarini o'rganing.",
    thumbnail: 'https://telegra.ph/file/0fed958fad28b02ad3547.jpg',
    href: '/darslar/chevar',
    priceValue: 100000,
    isFree: false,
    duration: '3 soat',
    level: 'intermediate',
    lessons: 10,
    category: 'sewing',
    rating: 4.6,
    enrolledCount: 670,
    certificate: true
  },
  {
    id: '6',
    title: 'Elektrika',
    description: "Elektr ishlari xavfsizligi va asosiy ko'nikmalar.",
    thumbnail: 'https://mfcs-ufa.ru/upload/images_Roman/elektromontazhnye_raboty-min.jpeg',
    href: '/darslar/elektrika',
    priceValue: 0,
    isFree: true,
    duration: '4 soat',
    level: 'beginner',
    lessons: 12,
    instructor: 'Dilshod Ergashev',
    category: 'electrical',
    rating: 4.9,
    enrolledCount: 3210,
    certificate: true
  },
  {
    id: '7',
    title: 'Qurilish ishlari',
    description: "Umumiy qurilish ishlari bo'yicha to'liq qo'llanma.",
    thumbnail: 'https://www.toshvilstat.uz/images/yangiliklar2023/190120234.jpg',
    href: '/darslar/qurilish',
    priceValue: 180000,
    isFree: false,
    duration: '6 soat',
    level: 'advanced',
    lessons: 18,
    category: 'construction',
    rating: 4.7,
    enrolledCount: 1890,
    certificate: true
  },
  {
    id: '8',
    title: 'Tom yopish kursi',
    description: "Tom yopish texnikasi va materiallar haqida batafsil.",
    thumbnail: 'https://images.squarespace-cdn.com/content/v1/647fac49543fd451acc04281/a030a0b0-495f-497b-b0f6-0799e002e913/Pyramid+Hip+Roof.png',
    href: '/darslar/tom',
    priceValue: 120000,
    isFree: false,
    duration: '3 soat',
    level: 'intermediate',
    lessons: 9,
    category: 'roofing',
    rating: 4.5,
    enrolledCount: 560,
    certificate: true
  }
];

// ==================== MATERIALS / CALCULATORS ====================

export const materials: Material[] = [
  {
    id: '1',
    title: "Patalog (shif) o'lchovi",
    image: 'https://artdeco.uz/wp-content/uploads/2017/08/photo_2021-12-16_13-45-42-800x600.jpg',
    href: '/calculator/patalog',
    description: "Shiftga kerakli material miqdorini hisoblang"
  },
  {
    id: '2',
    title: "Pol yuzasi o'lchovi",
    image: 'https://lesshop.ru/wa-data/public/photos/99/19/1999/1999.970.jpeg',
    href: '/calculator/pol',
    description: "Pol qoplamasi uchun material hisoblash"
  },
  {
    id: '3',
    title: 'Beton',
    image: 'https://frankfurt.apollo.olxcdn.com/v1/files/z1xayeof1i5a2-UZ/image',
    href: '/calculator/beton',
    description: "Beton aralashma miqdorini hisoblang"
  },
  {
    id: '4',
    title: "G'isht",
    image: 'https://devel.prom.uz/upload/category_logos/1e/87/1e87e5bab9e8c85bb050fdcd2cbeff8c.png',
    href: '/calculator/gisht',
    description: "Devor uchun g'isht sonini aniqlang"
  },
  {
    id: '5',
    title: 'Kafel',
    image: 'https://static.tildacdn.com/tild6561-6138-4665-b736-393133316234/huurre-image-scaled.jpg',
    href: '/calculator/kafel',
    description: "Kafel plitka miqdorini hisoblang"
  },
  {
    id: '6',
    title: 'Tom olchovi',
    image: 'https://www.tk-lanskoy.ru/upload/iblock/124/1240a9fcde65f56276522f677cf31d39.jpg',
    href: '/calculator/tom',
    description: "Tom yopish materiallari hisoblash"
  },
  {
    id: '7',
    title: "Bo'yoq",
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400',
    href: '/calculator/boyoq',
    description: "Devor va shiftga kerakli bo'yoq miqdori"
  },
  {
    id: '8',
    title: 'Oboi (Devor qog\'ozi)',
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400',
    href: '/calculator/oboi',
    description: "Devor qog'ozi rulonlari sonini hisoblang"
  },
  {
    id: '9',
    title: 'Elektr simlar',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    href: '/calculator/elektr',
    description: "Elektr simlari uzunligini hisoblang"
  },
  {
    id: '10',
    title: 'Trubalar',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400',
    href: '/calculator/truba',
    description: "Santexnika trubalari uzunligini hisoblang"
  }
];

// ==================== TEST QUESTIONS ====================

export const testQuestions: Question[] = [
  {
    id: 1,
    question: 'Qaysi usulda metall buyumlar qattiqlashtiriladi?',
    options: ['Payvandlash', 'Qaynatish', 'Termik ishlov berish', 'Tok bilan ishlov berish'],
    correctAnswer: 2,
    explanation: "Termik ishlov berish metallning tuzilishini o'zgartiradi va uni qattiqlashtiradi."
  },
  {
    id: 2,
    question: 'Gayka va boltni mahkamlash uchun nima ishlatiladi?',
    options: ['Ombur', "Bolg'a", 'Kalit (klyuch)', 'Zanjir'],
    correctAnswer: 2,
    explanation: "Kalit (klyuch) gayka va boltlarni mahkamlash uchun maxsus mo'ljallangan asbob."
  },
  {
    id: 3,
    question: 'Metall qismlarni biriktirishning eng keng tarqalgan usuli?',
    options: ['Yelimlash', 'Payvandlash (svarka)', 'Qirqish', "Burg'ulash"],
    correctAnswer: 1,
    explanation: "Payvandlash metalllarni biriktirishning eng mustahkam va keng tarqalgan usuli."
  },
  {
    id: 4,
    question: "Metallarni kesish uchun qo'lda ishlatiladigan vosita nima?",
    options: ['Randa', "Yog'och arra", "No'xat (nozovka)", 'Otvyortka'],
    correctAnswer: 2,
    explanation: "No'xat (nozovka) metallni qo'lda kesish uchun ishlatiladigan asbob."
  },
  {
    id: 5,
    question: "Chilangarlik asbobi bo'lmaganini toping:",
    options: ["Zambilg'altak (shtangel)", 'Ombur', 'Lupa', 'Rezba kesish asbobi'],
    correctAnswer: 2,
    explanation: "Lupa kattalashtirish uchun ishlatiladi, chilangarlik asbobi emas."
  },
  {
    id: 6,
    question: 'Payvandlashda eng muhim xavfsizlik vositasi nima?',
    options: ["Qo'lqop", 'Shlem', "Ko'zoynak", 'Barchasi'],
    correctAnswer: 3,
    explanation: "Payvandlashda qo'lqop, shlem va ko'zoynak — barchasi muhim."
  },
  {
    id: 7,
    question: 'Metallni egish uchun ishlatiladigan asbob nima?',
    options: ['Shtanga', 'Kalevka', "Burg'ulash", 'Tok'],
    correctAnswer: 1,
    explanation: "Kalevka metallni egish uchun ishlatiladigan asbob."
  },
  {
    id: 8,
    question: 'Metallarni qattiqlashtirish jarayonida qaysi omil muhim?',
    options: ['Harorat', 'Bosim', 'Vaqt', 'Barchasi'],
    correctAnswer: 3,
    explanation: "Qattiqlashtirishda harorat, bosim va vaqt — barchasi muhim rol o'ynaydi."
  },
  {
    id: 9,
    question: "Chilangar tomonidan ishlatiladigan o'lchov asbobi qaysi?",
    options: ['Ruller', 'Kaliper', 'Mikrometr', 'Barchasi'],
    correctAnswer: 3,
    explanation: "Chilangar ruller, kaliper va mikrometr — barcha o'lchov asboblaridan foydalanadi."
  },
  {
    id: 10,
    question: 'Metallarni kesishda ishlatiladigan elektr asbobi nima?',
    options: ['Elektroprut', 'Grinder', 'Tok apparati', "Bulg'ash"],
    correctAnswer: 1,
    explanation: "Grinder (bolgarka) metallni kesishda keng qo'llaniladi."
  }
];

// ==================== DEMO MASTERS FOR RATING ====================

export const demoMasters = [
  { name: 'Abdulloh', profession: 'Elektrik', rating: 0, id: 'd1' },
  { name: 'Madina', profession: 'Santexnik', rating: 0, id: 'd2' },
  { name: 'Sardor', profession: 'Duradgor', rating: 0, id: 'd3' },
  { name: 'Aziz', profession: 'Quruvchi', rating: 0, id: 'd4' },
  { name: 'Nodirbek', profession: 'Payvandchi', rating: 0, id: 'd5' },
  { name: 'Rustam', profession: "G'isht Teruvchi", rating: 0, id: 'd6' }
];

// ==================== BOOKINGS ====================

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    masterId: '1',
    masterName: 'Abdulloh Karimov',
    masterAvatar: 'https://img.a.transfermarkt.technology/portrait/big/581678-1748102891.jpg?lm=1',
    userId: 'u1',
    userName: 'Jamshid Toshmatov',
    userPhone: '+998901234567',
    serviceName: "G'isht terish",
    date: '2025-12-15',
    timeSlot: { start: '09:00', end: '12:00' },
    status: 'confirmed',
    totalPrice: 150000,
    address: "Toshkent, Chilonzor tumani, 7-kvartal",
    notes: "Hovli devori uchun",
    createdAt: '2025-12-08T10:00:00Z',
    updatedAt: '2025-12-08T10:30:00Z'
  },
  {
    id: 'b2',
    masterId: '6',
    masterName: 'Nodirbek Tursunov',
    masterAvatar: '/img/svarkachi.jpg',
    userId: 'u1',
    userName: 'Jamshid Toshmatov',
    userPhone: '+998901234567',
    serviceName: 'Payvandlash ishlari',
    date: '2025-12-10',
    timeSlot: { start: '14:00', end: '18:00' },
    status: 'completed',
    totalPrice: 280000,
    address: "Toshkent, Sergeli tumani, Yangi Sergeli",
    createdAt: '2025-12-01T08:00:00Z',
    updatedAt: '2025-12-10T18:00:00Z',
    completedAt: '2025-12-10T17:45:00Z'
  },
  {
    id: 'b3',
    masterId: '7',
    masterName: 'Akmal Nazarov',
    userId: 'u1',
    userName: 'Jamshid Toshmatov',
    userPhone: '+998901234567',
    serviceName: "Truba ta'mirlash",
    date: '2025-12-20',
    timeSlot: { start: '10:00', end: '13:00' },
    status: 'pending',
    totalPrice: 135000,
    address: "Toshkent, Mirzo Ulugbek tumani",
    createdAt: '2025-12-08T14:00:00Z',
    updatedAt: '2025-12-08T14:00:00Z'
  }
];

// ==================== REVIEWS ====================

export const mockReviews: Review[] = [
  {
    id: 'r1',
    masterId: '1',
    userId: 'u2',
    userName: 'Bekzod Rahimov',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    comment: "Juda yaxshi usta! Ishni sifatli va vaqtida bajardilar. Hammaga tavsiya qilaman.",
    photos: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400'],
    createdAt: '2025-11-28T10:00:00Z',
    helpful: 12,
    isVerified: true,
    reply: {
      content: "Rahmat! Sizga ham minnatdorman. Yana murojaat qiling!",
      createdAt: '2025-11-28T14:00:00Z'
    }
  },
  {
    id: 'r2',
    masterId: '1',
    userId: 'u3',
    userName: 'Dilnoza Karimova',
    rating: 4,
    comment: "Yaxshi ish qildilar, lekin biroz kechikib kelishdi. Umuman olganda mamnunman.",
    createdAt: '2025-11-20T08:00:00Z',
    helpful: 5,
    isVerified: true
  },
  {
    id: 'r3',
    masterId: '6',
    userId: 'u4',
    userName: 'Sherzod Alimov',
    userAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 5,
    comment: "Nodirbek aka — haqiqiy professional! Payvandlash ishlari zo'r chiqdi. Mahkam va chiroyli.",
    photos: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400'
    ],
    createdAt: '2025-12-05T16:00:00Z',
    helpful: 23,
    isVerified: true
  },
  {
    id: 'r4',
    masterId: '6',
    userId: 'u5',
    userName: 'Anvar Toshmatov',
    rating: 5,
    comment: "Bir necha bor murojaat qildim, har safar sifatli ish. Tavsiya qilaman!",
    createdAt: '2025-12-01T12:00:00Z',
    helpful: 8,
    isVerified: true,
    reply: {
      content: "Sizga ham katta rahmat! Doimiy mijozlarimga maxsus chegirmalar mavjud.",
      createdAt: '2025-12-01T15:00:00Z'
    }
  }
];

// ==================== JOBS ====================

export const mockJobs: Job[] = [
  {
    id: 'j1',
    title: "Hovli devori qurish",
    description: "3 metr balandlikda, 20 metr uzunlikda g'ishtdan devor qurish kerak. Material bor.",
    category: "G'isht Teruvchi",
    budget: 2500000,
    budgetType: 'fixed',
    location: { region: 'Toshkent', city: 'Chilonzor', address: '7-kvartal' },
    userId: 'u6',
    userName: 'Karim Aliyev',
    userPhone: '+998901112233',
    urgency: 'medium',
    status: 'open',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    startDate: '2025-12-20',
    deadline: '2025-12-30',
    createdAt: '2025-12-07T10:00:00Z',
    updatedAt: '2025-12-07T10:00:00Z',
    applicants: [
      {
        id: 'a1',
        jobId: 'j1',
        masterId: '1',
        masterName: 'Abdulloh Karimov',
        masterAvatar: 'https://img.a.transfermarkt.technology/portrait/big/581678-1748102891.jpg?lm=1',
        masterRating: 4.8,
        proposal: "Salom! Bu ishni 7 kunda bajarib beraman. 15 yillik tajribam bor.",
        proposedPrice: 2300000,
        estimatedDuration: '7 kun',
        status: 'pending',
        createdAt: '2025-12-07T12:00:00Z'
      }
    ]
  },
  {
    id: 'j2',
    title: "Shoshilinch: Truba oqyapti",
    description: "Hammomda truba yorildi, suv oqyapti. Zudlik bilan ta'mirlash kerak!",
    category: 'Santexnik',
    budget: 200000,
    budgetType: 'negotiable',
    location: { region: 'Toshkent', city: 'Yunusobod' },
    userId: 'u7',
    userName: 'Malika Rahimova',
    urgency: 'emergency',
    status: 'open',
    createdAt: '2025-12-08T08:00:00Z',
    updatedAt: '2025-12-08T08:00:00Z'
  },
  {
    id: 'j3',
    title: "Elektr ishlari — yangi uy",
    description: "Yangi qurilgan uyda to'liq elektr ishlari: rozetka, vyklyuchatel, shitok o'rnatish.",
    category: 'Elektrik',
    budget: 5000000,
    budgetType: 'fixed',
    location: { region: 'Toshkent', city: 'Sergeli', address: 'Yangi Sergeli massivi' },
    userId: 'u8',
    userName: 'Bobur Qodirov',
    urgency: 'low',
    status: 'open',
    startDate: '2025-01-10',
    deadline: '2025-01-25',
    createdAt: '2025-12-05T14:00:00Z',
    updatedAt: '2025-12-05T14:00:00Z'
  },
  {
    id: 'j4',
    title: "Darvoza payvandlash",
    description: "Temir darvoza yasash kerak. O'lchamlari: 3m x 2m. Chiroyli dizayn bilan.",
    category: 'Payvandchi',
    budget: 3500000,
    budgetType: 'fixed',
    location: { region: 'Samarqand', city: 'Samarqand Shahri' },
    userId: 'u9',
    userName: 'Sanjar Tursunov',
    urgency: 'medium',
    status: 'in_progress',
    selectedMasterId: '6',
    createdAt: '2025-12-01T09:00:00Z',
    updatedAt: '2025-12-03T10:00:00Z'
  }
];

// ==================== FORUM ====================

export const forumCategories: ForumCategory[] = [
  {
    id: 'fc1',
    name: 'Umumiy savol-javoblar',
    nameRu: 'Общие вопросы',
    nameEn: 'General Questions',
    description: 'Har qanday savol va muhokamalar',
    icon: '💬',
    topicCount: 156,
    postCount: 1234
  },
  {
    id: 'fc2',
    name: 'Payvandchilik',
    nameRu: 'Сварка',
    nameEn: 'Welding',
    description: 'Payvandlash texnikasi va savollar',
    icon: '🔧',
    topicCount: 89,
    postCount: 567
  },
  {
    id: 'fc3',
    name: 'Elektrika',
    nameRu: 'Электрика',
    nameEn: 'Electrical',
    description: 'Elektr ishlari va xavfsizlik',
    icon: '⚡',
    topicCount: 124,
    postCount: 892
  },
  {
    id: 'fc4',
    name: 'Santexnika',
    nameRu: 'Сантехника',
    nameEn: 'Plumbing',
    description: 'Trubalar, kranlar, kanalizatsiya',
    icon: '🚿',
    topicCount: 78,
    postCount: 445
  },
  {
    id: 'fc5',
    name: 'Qurilish',
    nameRu: 'Строительство',
    nameEn: 'Construction',
    description: "G'isht, beton, suvoq ishlari",
    icon: '🏗️',
    topicCount: 201,
    postCount: 1567
  },
  {
    id: 'fc6',
    name: 'Asboblar va materiallar',
    nameRu: 'Инструменты и материалы',
    nameEn: 'Tools & Materials',
    description: 'Asboblar haqida tavsiyalar',
    icon: '🛠️',
    topicCount: 67,
    postCount: 334
  }
];

export const mockForumTopics: ForumTopic[] = [
  {
    id: 'ft1',
    categoryId: 'fc2',
    title: 'Yangi boshlanuvchilar uchun qaysi svarka apparati yaxshi?',
    content: "Salom! Men endi payvandlashni o'rganmoqchiman. Boshlang'ich uchun qaysi apparatni tavsiya qilasiz? Byudjet 500-800 ming so'm atrofida.",
    authorId: 'u10',
    authorName: 'Sanjar',
    authorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    isPinned: true,
    views: 2345,
    replyCount: 23,
    tags: ['svarka', 'apparat', 'boshlangich'],
    createdAt: '2025-12-01T10:00:00Z',
    updatedAt: '2025-12-08T14:00:00Z'
  },
  {
    id: 'ft2',
    categoryId: 'fc3',
    title: 'Uyda elektr qisqa tutashishi — nima qilish kerak?',
    content: "Uyda vaqti-vaqti bilan elektr o'chib qoladi. Avtomat tez-tez tushib qoladi. Sababi nima bo'lishi mumkin?",
    authorId: 'u11',
    authorName: 'Dilshod',
    views: 1890,
    replyCount: 15,
    tags: ['elektrika', 'avtomat', 'muammo'],
    createdAt: '2025-12-05T08:00:00Z',
    updatedAt: '2025-12-07T16:00:00Z'
  },
  {
    id: 'ft3',
    categoryId: 'fc5',
    title: "Qaysi g'isht yaxshi: kul g'isht yoki qizil g'isht?",
    content: "Uy qurmoqchiman. Kul g'isht va qizil g'isht farqi nimada? Qaysi biri mustahkamroq va tejamkorroq?",
    authorId: 'u12',
    authorName: 'Bobur',
    authorAvatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    views: 3456,
    replyCount: 31,
    tags: ['gisht', 'qurilish', 'material'],
    createdAt: '2025-11-28T12:00:00Z',
    updatedAt: '2025-12-06T09:00:00Z'
  }
];

// ==================== BLOG ====================

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'bp1',
    slug: 'payvandlash-xavfsizligi',
    title: 'Payvandlashda xavfsizlik qoidalari: To\'liq qo\'llanma',
    excerpt: "Payvandlash ishlarida xavfsizlikni ta'minlash uchun bilishingiz kerak bo'lgan barcha qoidalar.",
    content: `# Payvandlashda xavfsizlik qoidalari

Payvandlash — bu yuqori harorat va yorug'lik bilan ishlaydigan jarayon. Xavfsizlik qoidalariga rioya qilish juda muhim.

## Asosiy himoya vositalari

1. **Payvandchilik niqobi** — ko'zni ultrabinafsha nurlardan himoya qiladi
2. **Qo'lqoplar** — qo'llarni kuyishdan saqlaydi
3. **Maxsus kiyim** — uchqunlardan himoya
4. **Oyoq kiyimi** — berk, metall uchli

## Ish joyini tayyorlash

- Yonuvchan materiallarni olib tashlang
- Yaxshi shamollatish tashkil qiling
- O't o'chirish vositalarini yaqiniga qo'ying

## Xulosa

Xavfsizlik — bu eng muhim narsa. Hech qachon himoya vositalarisiz ishlamang!`,
    coverImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
    authorId: 'admin',
    authorName: "USTA ZO'R",
    category: 'Xavfsizlik',
    tags: ['payvandlash', 'xavfsizlik', "qo'llanma"],
    views: 5670,
    likes: 234,
    commentsCount: 45,
    readTime: 8,
    publishedAt: '2025-11-15T10:00:00Z'
  },
  {
    id: 'bp2',
    slug: 'santexnik-asboblar',
    title: 'Har bir santexnikda bo\'lishi kerak bo\'lgan 10 ta asbob',
    excerpt: "Professional santexnik sifatida ishlash uchun zarur asboblar ro'yxati va ulardan foydalanish.",
    content: `# Santexnik asboблар

Yaxshi usta — yaxshi asbobi bilan taniladi. Santexnik uchun eng zarur asboblar...`,
    coverImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800',
    authorId: 'admin',
    authorName: "USTA ZO'R",
    category: 'Asboblar',
    tags: ['santexnika', 'asboblar', 'tavsiya'],
    views: 4230,
    likes: 189,
    commentsCount: 28,
    readTime: 6,
    publishedAt: '2025-11-20T14:00:00Z'
  },
  {
    id: 'bp3',
    slug: 'elektrik-xatolar',
    title: 'Elektrik ishlarida eng ko\'p uchraydigan 5 ta xato',
    excerpt: "Uy elektr tarmog'ida ko'p uchraydigan xatolar va ularni qanday oldini olish mumkin.",
    content: `# Elektrik ishlaridagi xatolar

Ko'pchilik uy egalarining yo'l qo'yadigan xatolari...`,
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    authorId: 'admin',
    authorName: "USTA ZO'R",
    category: 'Maslahatlar',
    tags: ['elektrika', 'xatolar', 'xavfsizlik'],
    views: 7890,
    likes: 312,
    commentsCount: 67,
    readTime: 10,
    publishedAt: '2025-11-25T09:00:00Z'
  },
  {
    id: 'bp4',
    slug: 'qurilish-materiallar-2025',
    title: '2025 yilda eng yaxshi qurilish materiallari',
    excerpt: "Yangi texnologiyalar va materiallar haqida batafsil ma'lumot.",
    content: `# Zamonaviy qurilish materiallari

2025 yilda qurilish sohasida ko'p yangiliklar paydo bo'ldi...`,
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    authorId: 'admin',
    authorName: "USTA ZO'R",
    category: 'Materiallar',
    tags: ['qurilish', 'materiallar', 'yangiliklar'],
    views: 3450,
    likes: 156,
    commentsCount: 23,
    readTime: 7,
    publishedAt: '2025-12-01T11:00:00Z'
  }
];

// ==================== MESSAGES ====================

export const mockConversations: Conversation[] = [
  {
    id: 'c1',
    participants: ['u1', '1'],
    participantNames: { 'u1': 'Siz', '1': 'Abdulloh Karimov' },
    participantAvatars: { '1': 'https://img.a.transfermarkt.technology/portrait/big/581678-1748102891.jpg?lm=1' },
    lastMessage: {
      id: 'm3',
      conversationId: 'c1',
      senderId: '1',
      senderName: 'Abdulloh Karimov',
      content: "Ha, ertaga ertalab soat 9 da kelaman. Tayyor turaveringlar!",
      type: 'text',
      read: false,
      createdAt: '2025-12-08T14:30:00Z'
    },
    unreadCount: 1,
    createdAt: '2025-12-06T10:00:00Z',
    updatedAt: '2025-12-08T14:30:00Z'
  },
  {
    id: 'c2',
    participants: ['u1', '6'],
    participantNames: { 'u1': 'Siz', '6': 'Nodirbek Tursunov' },
    participantAvatars: { '6': '/img/svarkachi.jpg' },
    lastMessage: {
      id: 'm5',
      conversationId: 'c2',
      senderId: 'u1',
      senderName: 'Siz',
      content: "Rahmat! Ish juda yaxshi chiqdi.",
      type: 'text',
      read: true,
      createdAt: '2025-12-07T18:00:00Z'
    },
    unreadCount: 0,
    createdAt: '2025-12-01T08:00:00Z',
    updatedAt: '2025-12-07T18:00:00Z'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    conversationId: 'c1',
    senderId: 'u1',
    senderName: 'Siz',
    content: "Salom! G'isht terish ishlari bo'yicha so'ramoqchi edim.",
    type: 'text',
    read: true,
    createdAt: '2025-12-06T10:00:00Z'
  },
  {
    id: 'm2',
    conversationId: 'c1',
    senderId: '1',
    senderName: 'Abdulloh Karimov',
    content: "Salom! Ha, albatta. Qanday ish kerak? O'lchamlarini ayting.",
    type: 'text',
    read: true,
    createdAt: '2025-12-06T10:15:00Z'
  },
  {
    id: 'm3',
    conversationId: 'c1',
    senderId: '1',
    senderName: 'Abdulloh Karimov',
    content: "Ha, ertaga ertalab soat 9 da kelaman. Tayyor turaveringlar!",
    type: 'text',
    read: false,
    createdAt: '2025-12-08T14:30:00Z'
  }
];

// ==================== NOTIFICATIONS ====================

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: 'u1',
    type: 'booking',
    title: 'Buyurtma tasdiqlandi',
    message: "Abdulloh Karimov buyurtmangizni tasdiqladi. 15-dekabr, soat 9:00.",
    link: '/dashboard/bookings',
    read: false,
    createdAt: '2025-12-08T10:30:00Z'
  },
  {
    id: 'n2',
    userId: 'u1',
    type: 'message',
    title: 'Yangi xabar',
    message: "Nodirbek Tursunov sizga xabar yubordi.",
    link: '/xabarlar',
    read: false,
    createdAt: '2025-12-08T14:30:00Z'
  },
  {
    id: 'n3',
    userId: 'u1',
    type: 'course',
    title: "Kurs yangilandi",
    message: "'Payvandchilik asoslari' kursiga yangi dars qo'shildi.",
    link: '/darslar/svarka',
    read: true,
    createdAt: '2025-12-07T09:00:00Z'
  },
  {
    id: 'n4',
    userId: 'u1',
    type: 'promotion',
    title: '🎉 Bayram chegirmasi!',
    message: "Barcha kurslarga 20% chegirma. Faqat 3 kun!",
    link: '/kurslar',
    read: true,
    createdAt: '2025-12-05T12:00:00Z'
  }
];

// ==================== UTILITY FUNCTIONS ====================

export const getMasterById = (id: string): Master | undefined => {
  return masters.find(m => m.id === id);
};

export const getReviewsByMasterId = (masterId: string): Review[] => {
  return mockReviews.filter(r => r.masterId === masterId);
};

export const getJobsByCategory = (category: string): Job[] => {
  return mockJobs.filter(j => j.category === category);
};

export const getOpenJobs = (): Job[] => {
  return mockJobs.filter(j => j.status === 'open');
};

export const getCitiesByRegion = (region: string): string[] => {
  return cities[region] || cities['default'];
};
