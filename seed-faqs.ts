import { db } from './src/db/index.ts';
import { faqCategories, faqs } from './src/db/schema.ts';
import { sql } from 'drizzle-orm';

const categoriesData = [
  { name: 'General', slug: 'general', displayOrder: 1 },
  { name: 'Students', slug: 'students', displayOrder: 2 },
  { name: 'Courses & Learning', slug: 'courses-learning', displayOrder: 3 },
  { name: 'Online Tests', slug: 'online-tests', displayOrder: 4 },
  { name: 'Smart Revision', slug: 'smart-revision', displayOrder: 5 },
  { name: 'AI Tutor', slug: 'ai-tutor', displayOrder: 6 },
  { name: 'Parents', slug: 'parents', displayOrder: 7 },
  { name: 'Teachers', slug: 'teachers', displayOrder: 8 },
  { name: 'Study Store', slug: 'study-store', displayOrder: 9 },
  { name: 'Payments', slug: 'payments', displayOrder: 10 },
  { name: 'Account & Security', slug: 'account-security', displayOrder: 11 },
  { name: 'Technical Support', slug: 'technical-support', displayOrder: 12 },
];

const faqsData = [
  { cat: 'General', q: 'What is BIHAR BOARD?', a: 'BIHAR BOARD is a digital learning platform designed to help students access learning resources, practice questions, online tests, revision tools and technology-assisted learning features in one place.', order: 1 },
  { cat: 'General', q: 'Who can use BIHAR BOARD?', a: 'The platform is designed primarily for students and can also provide dedicated experiences for parents and authorized teachers.', order: 2 },
  { cat: 'General', q: 'Which classes are supported?', a: 'Supported classes are displayed on the Classes section. The available classes may be updated as the platform expands.', order: 3 },
  { cat: 'General', q: 'Which languages are supported?', a: 'Language availability depends on the content and services provided on the platform. Hindi and English can be supported where available.', order: 4 },
  { cat: 'General', q: 'Is BIHAR BOARD an official government website?', a: 'BIHAR BOARD should not be presented as an official government or examination-board website unless an official authorization or affiliation actually exists.', order: 5 },
  { cat: 'General', q: 'How can I contact support?', a: 'Visit the Contact or Support section to find the currently available support options.', order: 6 },
  
  { cat: 'Students', q: 'How can I start learning?', a: 'Create or sign in to your account, select your class and explore the available subjects, courses and learning resources.', order: 1 },
  { cat: 'Students', q: 'Can I study chapter-wise?', a: 'Yes, where chapter-wise content is available, you can select a subject and chapter to access the relevant learning materials.', order: 2 },
  { cat: 'Students', q: 'Can I watch video lessons?', a: 'Yes, video lessons can be available for supported courses and learning content.', order: 3 },
  { cat: 'Students', q: 'Can I download study materials?', a: 'Download availability depends on the specific content and your access permissions.', order: 4 },
  { cat: 'Students', q: 'Can I track my learning progress?', a: 'Yes. Supported learning activities can be tracked through your student dashboard.', order: 5 },

  { cat: 'Courses & Learning', q: 'What type of study material is available?', a: 'Depending on the available content, resources may include video lessons, notes, PDFs, practice questions, important questions and previous-year questions.', order: 1 },
  { cat: 'Courses & Learning', q: 'Can I continue a lesson later?', a: 'Yes, supported lessons can remember your learning progress so that you can continue from where you stopped.', order: 2 },
  { cat: 'Courses & Learning', q: 'Can I bookmark content?', a: 'Bookmark or save features can be available for supported learning content.', order: 3 },
  { cat: 'Courses & Learning', q: 'Can I search for a topic?', a: 'Yes. Use the platform search feature to find available courses, subjects, chapters, questions and other resources.', order: 4 },

  { cat: 'Online Tests', q: 'Can I take online tests?', a: 'Yes. Available online tests and mock tests can be attempted through the Test section.', order: 1 },
  { cat: 'Online Tests', q: 'What happens after I submit a test?', a: 'You can receive a result showing available performance information such as score, accuracy, correct answers, incorrect answers and other supported analytics.', order: 2 },
  { cat: 'Online Tests', q: 'Can I see which questions I got wrong?', a: 'Yes, where solutions and answer analysis are provided, you can review incorrect questions and their explanations.', order: 3 },
  { cat: 'Online Tests', q: 'Can I retake a test?', a: 'Retake availability depends on the rules configured for that particular test.', order: 4 },
  { cat: 'Online Tests', q: 'Can I pause an online test?', a: 'Pause functionality depends on the rules of the specific test. Some timed examinations may not allow pausing.', order: 5 },
  { cat: 'Online Tests', q: 'What happens if my internet connection fails during a test?', a: 'The platform should attempt to preserve eligible saved answers and recover the session when connectivity returns. Test behavior depends on the specific test configuration.', order: 6 },

  { cat: 'Smart Revision', q: 'What is Smart Revision?', a: 'Smart Revision is a learning feature designed to help organize revision based on learning activity and assessment performance.', order: 1 },
  { cat: 'Smart Revision', q: 'How are revision priorities determined?', a: 'Revision priorities can be influenced by factors such as practice performance, test results and configured revision rules.', order: 2 },
  { cat: 'Smart Revision', q: 'Can I manually revise a chapter?', a: 'Yes. Students can manually select available chapters or topics for revision.', order: 3 },

  { cat: 'AI Tutor', q: 'What is BIHAR BOARD AI Tutor?', a: 'AI Tutor is an AI-assisted learning feature designed to help students understand questions and concepts.', order: 1 },
  { cat: 'AI Tutor', q: 'Can I ask questions using an image?', a: 'Image-based question assistance can be available where the AI image feature is enabled.', order: 2 },
  { cat: 'AI Tutor', q: 'Can I ask questions using voice?', a: 'Voice-based interaction can be available on supported devices and configurations.', order: 3 },
  { cat: 'AI Tutor', q: 'Can AI solve Mathematics questions?', a: 'AI Tutor can provide step-by-step assistance for supported questions, but students should review the solution carefully.', order: 4 },
  { cat: 'AI Tutor', q: 'Is AI Tutor always correct?', a: 'No AI system is guaranteed to be error-free. AI-generated answers should be treated as learning assistance and important academic information should be verified through reliable sources.', order: 5 },
  { cat: 'AI Tutor', q: 'Can I report an incorrect AI answer?', a: 'Yes. Provide a feedback or report option wherever AI responses are available.', order: 6 },

  { cat: 'Parents', q: 'Can parents create an account?', a: 'Yes, where the Parent Portal is enabled.', order: 1 },
  { cat: 'Parents', q: 'Can parents see student progress?', a: 'Parents can view authorized information for students correctly linked to their account.', order: 2 },
  { cat: 'Parents', q: 'Can one parent link multiple students?', a: 'Multiple student linking can be supported where enabled by the platform.', order: 3 },
  { cat: 'Parents', q: 'Can parents change student marks?', a: 'No. Parents cannot modify academic results or assessment data.', order: 4 },

  { cat: 'Teachers', q: 'Is there a Teacher Portal?', a: 'Yes, a dedicated Teacher Portal can provide authorized teachers with tools for content, questions, tests, doubts and learning management.', order: 1 },
  { cat: 'Teachers', q: 'Can teachers create tests?', a: 'Authorized teachers can create tests if their assigned permissions allow it.', order: 2 },
  { cat: 'Teachers', q: 'Can teachers answer student doubts?', a: 'Yes, authorized teachers can manage and answer assigned student doubts.', order: 3 },

  { cat: 'Study Store', q: 'What is the BIHAR BOARD Study Store?', a: 'The Study Store is an educational marketplace for available physical and digital learning resources.', order: 1 },
  { cat: 'Study Store', q: 'What products can be available?', a: 'Products may include books, notes, question banks, practice sets, model papers, test series and other educational materials.', order: 2 },
  { cat: 'Study Store', q: 'Can I cancel an order?', a: 'Cancellation depends on the product, order status and the applicable cancellation policy.', order: 3 },
  { cat: 'Study Store', q: 'How can I track my order?', a: 'Open your Orders section to view available order and shipment tracking information.', order: 4 },

  { cat: 'Payments', q: 'Which payment methods are supported?', a: 'Available payment methods are displayed during checkout.', order: 1 },
  { cat: 'Payments', q: 'My payment failed. What should I do?', a: 'Check your payment status in the order or transaction section. If the amount was deducted but the order was not confirmed, contact support with the relevant transaction details.', order: 2 },
  { cat: 'Payments', q: 'Is my payment information secure?', a: 'Payments should be processed through the configured payment provider using appropriate security controls. BIHAR BOARD should not store sensitive payment credentials unnecessarily.', order: 3 },
  { cat: 'Payments', q: 'How do refunds work?', a: 'Refund eligibility and processing depend on the applicable Refund Policy and the status of the order or payment.', order: 4 },

  { cat: 'Account & Security', q: 'How do I create an account?', a: 'Select Sign Up and complete the required registration steps.', order: 1 },
  { cat: 'Account & Security', q: 'How do I log in?', a: 'Use the available authentication method shown on the Login page.', order: 2 },
  { cat: 'Account & Security', q: 'Can I log out from all devices?', a: 'If device/session management is enabled, you can revoke active sessions from account security settings.', order: 3 },
  { cat: 'Account & Security', q: 'How do I delete my account?', a: 'Use the Account Deletion option where available or contact support according to the account deletion procedure.', order: 4 },
  { cat: 'Account & Security', q: 'Is my personal information protected?', a: 'BIHAR BOARD should use appropriate technical and organizational measures to protect user information. Please review the Privacy Policy for detailed information.', order: 5 },

  { cat: 'Technical Support', q: 'The website is not loading. What should I do?', a: 'Check your internet connection, refresh the page and try again. If the issue continues, contact support.', order: 1 },
  { cat: 'Technical Support', q: 'The video is not playing.', a: 'Check your internet connection, update your browser/app and try again. If the issue continues, report the problem to support.', order: 2 },
  { cat: 'Technical Support', q: 'The app is crashing.', a: 'Update the app to the latest available version, restart your device and try again. If the issue continues, contact support.', order: 3 },
  { cat: 'Technical Support', q: 'I cannot receive OTP.', a: 'Check your mobile network, verify that the entered number is correct and wait before requesting another OTP. If the issue continues, contact support.', order: 4 },
];

async function seedFaqs() {
  try {
    console.log("Seeding FAQs started...");
    await db.delete(faqs);
    await db.delete(faqCategories);

    const insertedCategories = await db.insert(faqCategories).values(categoriesData).returning();
    const catMap = {};
    for (const c of insertedCategories) {
      catMap[c.name] = c.id;
    }

    const qs = faqsData.map(f => ({
      categoryId: catMap[f.cat],
      question: f.q,
      answer: f.a,
      displayOrder: f.order,
      status: 'published'
    }));

    await db.insert(faqs).values(qs);
    console.log("Seeding FAQs complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding FAQs failed", err);
    process.exit(1);
  }
}

seedFaqs();
