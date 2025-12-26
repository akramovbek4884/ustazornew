// ==================== CORE TYPES ====================

export interface Master {
  id: string;
  name: string;
  profession: string;
  region: string;
  city: string;
  phone: string;
  avatar: string;
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
  responseTime?: string;
  // Enhanced fields
  email?: string;
  bio?: string;
  experience?: number; // years
  completedJobs?: number;
  hourlyRate?: number;
  services?: Service[];
  portfolio?: PortfolioItem[];
  availability?: Availability;
  badges?: Badge[];
  languages?: string[];
  joinedAt?: string;
  lastActive?: string;
  serviceAreas?: string[];
  insurance?: boolean;
  guarantee?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  priceType: 'fixed' | 'hourly' | 'negotiable';
  duration?: string;
  description?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  images: string[];
  category: string;
  completedAt: string;
  client?: string;
}

export interface Availability {
  monday?: TimeSlot[];
  tuesday?: TimeSlot[];
  wednesday?: TimeSlot[];
  thursday?: TimeSlot[];
  friday?: TimeSlot[];
  saturday?: TimeSlot[];
  sunday?: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:mm
  end: string; // HH:mm
}

export interface Region {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
  regionId: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
}

// ==================== VIDEO & COURSES ====================

export interface Video {
  id: string;
  src: string;
  title: string;
  instructor: string;
  duration: string;
  views?: number;
  likes?: number;
  // Enhanced fields
  thumbnail?: string;
  description?: string;
  category?: string;
  courseId?: string;
  order?: number;
  resources?: Resource[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  href: string;
  price?: string;
  priceValue?: number;
  duration?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  lessons?: number;
  isFree?: boolean;
  instructor?: string;
  // Enhanced fields
  category?: string;
  rating?: number;
  enrolledCount?: number;
  completionRate?: number;
  prerequisites?: string[];
  learningOutcomes?: string[];
  videos?: Video[];
  quizzes?: Quiz[];
  certificate?: boolean;
  language?: string;
  updatedAt?: string;
}

export interface CourseProgress {
  courseId: string;
  lessonId: string;
  progress: number; // 0-100
  completedLessons: string[];
  lastWatched: string;
  notes?: CourseNote[];
  bookmarks?: Bookmark[];
}

export interface CourseNote {
  id: string;
  lessonId: string;
  content: string;
  timestamp?: number; // video timestamp
  createdAt: string;
}

export interface Bookmark {
  id: string;
  lessonId: string;
  timestamp: number;
  note?: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'image' | 'link';
  url: string;
  size?: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number; // minutes
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

// ==================== BOOKING SYSTEM ====================

export interface Booking {
  id: string;
  masterId: string;
  masterName: string;
  masterAvatar?: string;
  userId: string;
  userName: string;
  userPhone: string;
  serviceId?: string;
  serviceName: string;
  date: string;
  timeSlot: TimeSlot;
  status: BookingStatus;
  totalPrice: number;
  address: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'disputed';

// ==================== REVIEWS ====================

export interface Review {
  id: string;
  masterId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  bookingId?: string;
  rating: number;
  comment: string;
  photos?: string[];
  createdAt: string;
  updatedAt?: string;
  reply?: ReviewReply;
  helpful?: number;
  isVerified?: boolean; // verified purchase/booking
}

export interface ReviewReply {
  content: string;
  createdAt: string;
}

// ==================== MESSAGING ====================

export interface Conversation {
  id: string;
  participants: string[];
  participantNames: Record<string, string>;
  participantAvatars: Record<string, string>;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'system';
  fileUrl?: string;
  fileName?: string;
  read: boolean;
  createdAt: string;
}

// ==================== JOB BOARD ====================

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  budgetType: 'fixed' | 'hourly' | 'negotiable';
  location: {
    region: string;
    city: string;
    address?: string;
  };
  userId: string;
  userName: string;
  userPhone?: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  status: JobStatus;
  applicants?: JobApplication[];
  selectedMasterId?: string;
  images?: string[];
  startDate?: string;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export type JobStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface JobApplication {
  id: string;
  jobId: string;
  masterId: string;
  masterName: string;
  masterAvatar?: string;
  masterRating?: number;
  proposal: string;
  proposedPrice: number;
  estimatedDuration: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

// ==================== FORUM / COMMUNITY ====================

export interface ForumCategory {
  id: string;
  name: string;
  nameRu?: string;
  nameEn?: string;
  description: string;
  icon: string;
  topicCount: number;
  postCount: number;
  lastPost?: ForumPost;
}

export interface ForumTopic {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  isPinned?: boolean;
  isLocked?: boolean;
  views: number;
  replyCount: number;
  lastReply?: ForumPost;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ForumPost {
  id: string;
  topicId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  likes: number;
  isAnswer?: boolean; // marked as solution
  createdAt: string;
  updatedAt?: string;
}

// ==================== BLOG ====================

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  commentsCount: number;
  readTime: number; // minutes
  publishedAt: string;
  updatedAt?: string;
}

export interface BlogComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  likes: number;
  parentId?: string; // for nested comments
  createdAt: string;
}

// ==================== USER PROFILE ====================

export interface UserProfile {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  job: string;
  birthday: string;
  country: string;
  region: string;
  city: string;
  mfy: string;
  avatar: string;
  experience?: string;
  bio?: string;
  // Enhanced fields
  role: 'user' | 'master' | 'admin';
  isVerified?: boolean;
  favorites?: string[]; // master IDs
  savedJobs?: string[];
  notifications?: NotificationSettings;
  createdAt?: string;
  lastLogin?: string;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  bookingUpdates: boolean;
  messages: boolean;
  promotions: boolean;
}

// ==================== NOTIFICATIONS ====================

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export type NotificationType =
  | 'booking'
  | 'message'
  | 'review'
  | 'job'
  | 'course'
  | 'system'
  | 'promotion';

// ==================== PAYMENTS ====================

export interface Payment {
  id: string;
  userId: string;
  type: 'booking' | 'course' | 'subscription';
  referenceId: string;
  amount: number;
  currency: string;
  method: 'payme' | 'click' | 'uzum' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  completedAt?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'basic' | 'premium' | 'professional';
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

// ==================== CALCULATOR ====================

export interface Material {
  id: string;
  title: string;
  image: string;
  href: string;
  description?: string;
}

export interface CalculatorResult {
  materialType: string;
  quantity: number;
  unit: string;
  estimatedCost?: number;
  breakdown?: {
    item: string;
    quantity: number;
    unit: string;
    price?: number;
  }[];
}

// ==================== MISC ====================

export interface FilterState {
  region: string;
  city: string;
  profession: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  availability?: string;
  verified?: boolean;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Stats for dashboards
export interface MasterStats {
  totalEarnings: number;
  monthlyEarnings: number;
  totalBookings: number;
  completedBookings: number;
  averageRating: number;
  totalReviews: number;
  profileViews: number;
  responseRate: number;
}

export interface UserStats {
  totalBookings: number;
  completedCourses: number;
  certificates: number;
  savedMasters: number;
  reviewsGiven: number;
}
