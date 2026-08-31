import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, boolean, json, decimal } from 'drizzle-orm/pg-core';

// Base Users
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email'),
  phone: text('phone'),
  role: text('role').notNull().default('student'), // student, parent, teacher, admin
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Profiles
export const studentProfiles = pgTable('student_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull().unique(),
  classId: integer('class_id'),
  mediumId: integer('medium_id'),
  district: text('district'),
});

export const parentProfiles = pgTable('parent_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull().unique(),
});

export const teacherProfiles = pgTable('teacher_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull().unique(),
});

export const parentStudentLinks = pgTable('parent_student_links', {
  id: serial('id').primaryKey(),
  parentId: integer('parent_id').references(() => users.id).notNull(),
  studentId: integer('student_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Academic Structure
export const boards = pgTable('boards', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const classes = pgTable('classes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  boardId: integer('board_id').references(() => boards.id).notNull(),
});

export const mediums = pgTable('mediums', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const subjects = pgTable('subjects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  classId: integer('class_id').references(() => classes.id).notNull(),
});

export const chapters = pgTable('chapters', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  subjectId: integer('subject_id').references(() => subjects.id).notNull(),
  order: integer('order').notNull().default(0),
});

export const topics = pgTable('topics', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  chapterId: integer('chapter_id').references(() => chapters.id).notNull(),
  order: integer('order').notNull().default(0),
});

// Content
export const contents = pgTable('contents', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  topicId: integer('topic_id').references(() => topics.id).notNull(),
  type: text('type').notNull(), // video, pdf, note
  isPremium: boolean('is_premium').default(false),
  status: text('status').default('published'), // draft, review, published
});

export const videos = pgTable('videos', {
  id: serial('id').primaryKey(),
  contentId: integer('content_id').references(() => contents.id).notNull().unique(),
  url: text('url').notNull(),
  duration: integer('duration'),
});

export const videoProgress = pgTable('video_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  videoId: integer('video_id').references(() => videos.id).notNull(),
  lastPosition: integer('last_position').default(0),
  isCompleted: boolean('is_completed').default(false),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Practice and Tests
export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  topicId: integer('topic_id').references(() => topics.id).notNull(),
  type: text('type').notNull(), // mcq, true_false, short, long, etc.
  text: text('text').notNull(),
  explanation: text('explanation'),
  difficulty: text('difficulty'),
  importance: text('importance'), // VVI, etc.
  marks: integer('marks').default(1),
  year: integer('year'), // For previous year questions
});

export const questionOptions = pgTable('question_options', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id').references(() => questions.id).notNull(),
  text: text('text').notNull(),
  isCorrect: boolean('is_correct').default(false),
});

export const tests = pgTable('tests', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  totalMarks: integer('total_marks').notNull(),
  classId: integer('class_id').references(() => classes.id),
  subjectId: integer('subject_id').references(() => subjects.id),
  isPremium: boolean('is_premium').default(false),
});

export const testQuestions = pgTable('test_questions', {
  id: serial('id').primaryKey(),
  testId: integer('test_id').references(() => tests.id).notNull(),
  questionId: integer('question_id').references(() => questions.id).notNull(),
  order: integer('order').default(0),
});

export const testAttempts = pgTable('test_attempts', {
  id: serial('id').primaryKey(),
  testId: integer('test_id').references(() => tests.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  startTime: timestamp('start_time').defaultNow(),
  endTime: timestamp('end_time'),
  score: integer('score'),
  status: text('status').default('in_progress'), // in_progress, submitted
});

// Store & Commerce
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  price: decimal('price').notNull(),
  discount: decimal('discount').default('0'),
  stock: integer('stock').default(0),
  category: text('category').notNull(), // book, note, test_series, etc.
  classId: integer('class_id').references(() => classes.id),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  totalAmount: decimal('total_amount').notNull(),
  status: text('status').default('created'), // created, payment, processing, shipped, delivered
  createdAt: timestamp('created_at').defaultNow(),
});

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id).notNull(),
  productId: integer('product_id').references(() => products.id).notNull(),
  quantity: integer('quantity').default(1),
  price: decimal('price').notNull(),
});

export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  plan: text('plan').notNull(), // FREE, BASIC, PREMIUM
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// AI & Doubts
export const aiConversations = pgTable('ai_conversations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  topicId: integer('topic_id').references(() => topics.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const aiMessages = pgTable('ai_messages', {
  id: serial('id').primaryKey(),
  conversationId: integer('conversation_id').references(() => aiConversations.id).notNull(),
  role: text('role').notNull(), // user, assistant
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const doubts = pgTable('doubts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  subjectId: integer('subject_id').references(() => subjects.id),
  question: text('question').notNull(),
  status: text('status').default('pending'), // pending, answered, resolved
  createdAt: timestamp('created_at').defaultNow(),
});

// Privacy & Compliance
export const privacyPolicies = pgTable('privacy_policies', {
  id: serial('id').primaryKey(),
  version: text('version').notNull(),
  title: text('title').notNull().default('Privacy Policy'),
  smallLabel: text('small_label').notNull().default('LEGAL & PRIVACY'),
  subtitle: text('subtitle').notNull().default('Your privacy matters to us. Learn how BIHAR BOARD collects, uses, protects and manages information when you use our Services.'),
  effectiveDate: text('effective_date').notNull(),
  lastUpdated: text('last_updated').notNull(),
  entityName: text('entity_name').notNull().default('BIHAR BOARD Education Technology Private Limited'),
  websiteUrl: text('website_url').notNull().default('https://biharboard.org.in'),
  privacyEmail: text('privacy_email').notNull().default('privacy@biharboard.org.in'),
  supportPhone: text('support_phone').notNull().default('+91 612 000 0000'),
  address: text('address').notNull().default('Dak Bunglow Road, Fraser Road Area, Patna, Bihar 800001, India'),
  grievanceOfficer: text('grievance_officer').notNull().default('Compliance & Grievance Redressal Officer'),
  grievanceEmail: text('grievance_email').notNull().default('grievance@biharboard.org.in'),
  retentionConfig: json('retention_config'),
  thirdPartiesConfig: json('third_parties_config'),
  sectionsConfig: json('sections_config'),
  isPublished: boolean('is_published').default(true),
  publishedAt: timestamp('published_at').defaultNow(),
  publishedBy: text('published_by').default('System Administrator'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const privacyRequests = pgTable('privacy_requests', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  requestType: text('request_type').notNull(), // 'data_export', 'account_deletion', 'data_correction', 'privacy_concern', 'consent_withdrawal', 'access_request', 'other'
  message: text('message').notNull(),
  status: text('status').notNull().default('new'), // 'new', 'in_review', 'action_required', 'resolved', 'rejected'
  assignedTo: text('assigned_to'),
  internalNotes: text('internal_notes'),
  responseMessage: text('response_message'),
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userConsents = pgTable('user_consents', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  sessionId: text('session_id'),
  consentType: text('consent_type').notNull(), // 'privacy_policy', 'cookie_necessary', 'cookie_analytics', 'cookie_marketing', 'cookie_personalization', 'ai_learning'
  policyVersion: text('policy_version').notNull(),
  consentStatus: text('consent_status').notNull().default('granted'), // 'granted', 'denied', 'revoked'
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userPrivacyPreferences = pgTable('user_privacy_preferences', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull().unique(),
  marketingEmails: boolean('marketing_emails').default(false),
  learningReminders: boolean('learning_reminders').default(true),
  aiPersonalization: boolean('ai_personalization').default(true),
  analyticsTracking: boolean('analytics_tracking').default(true),
  pushNotifications: boolean('push_notifications').default(true),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// FAQs
export const faqCategories = pgTable('faq_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  displayOrder: integer('display_order').default(0),
});

export const faqs = pgTable('faqs', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').references(() => faqCategories.id).notNull(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  keywords: text('keywords'), // comma-separated or json
  displayOrder: integer('display_order').default(0),
  status: text('status').default('published'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const faqFeedback = pgTable('faq_feedback', {
  id: serial('id').primaryKey(),
  faqId: integer('faq_id').references(() => faqs.id).notNull(),
  isHelpful: boolean('is_helpful').notNull(),
  feedbackText: text('feedback_text'),
  createdAt: timestamp('created_at').defaultNow(),
});


