export interface TermsSection {
  id: string;
  number: number;
  title: string;
  category: 'General & Access' | 'Platform Features' | 'Commerce & Content' | 'Legal & Compliance' | 'Dispute & Final Provisions';
  summary: string;
  content: string[];
  keyPoints?: string[];
  highlight?: string;
  actionLink?: {
    label: string;
    url: string;
  };
}

export const TERMS_METADATA = {
  version: "v2.4 (2026)",
  effectiveDate: "January 1, 2026",
  lastUpdated: "August 31, 2026",
  platformName: "BIHAR BOARD",
  taglineEn: "Learn • Practice • Test • Revise • Succeed",
  taglineHi: "पढ़ाई • अभ्यास • टेस्ट • रिविजन • सफलता",
  supportEmail: "support@biharboard.org.in",
  legalEmail: "legal@biharboard.org.in",
  grievanceEmail: "grievance@biharboard.org.in",
  helplinePhone: "+91 612 000 0000",
  headquarters: "Dak Bunglow Road, Fraser Road Area, Patna, Bihar 800001, India",
  disclaimer: "BIHAR BOARD is an independent educational platform and is not the official Bihar School Examination Board (BSEB) or a Government of Bihar website, unless expressly authorized."
};

export const TERMS_SECTIONS: TermsSection[] = [
  {
    id: "introduction",
    number: 1,
    title: "Introduction",
    category: "General & Access",
    summary: "Welcome to BIHAR BOARD, a dedicated digital learning and educational technology platform designed to empower students across Class 6 to 12 with comprehensive bilingual curriculum, mock tests, and smart study tools.",
    content: [
      "These Terms and Conditions of Use (\"Terms\", \"Agreement\") constitute a legally binding agreement between you (the \"User\", \"Student\", \"Parent\", \"Teacher\", or \"Visitor\") and BIHAR BOARD (\"we\", \"us\", \"our\", or the \"Platform\").",
      "By accessing, downloading, browsing, or utilizing the BIHAR BOARD website (biharboard.org.in), web application, mobile applications, Android WebView instances, APIs, online test series, Study Store products, or AI Tutor features, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms, together with our Privacy Policy and auxiliary operational guidelines.",
      "If you do not agree to all provisions contained within these Terms, you must discontinue your use of the Platform immediately."
    ],
    keyPoints: [
      "Applies across all web, Android app, tablet, and mobile interfaces.",
      "Governs all educational resources, courses, tests, AI utilities, and store purchases.",
      "Requires explicit mutual assent prior to account creation or store transactions."
    ]
  },
  {
    id: "important-disclaimer",
    number: 2,
    title: "Important Disclaimer",
    category: "General & Access",
    summary: "Non-Government Entity & Independent Status Advisory.",
    highlight: "BIHAR BOARD is an independent educational platform and is not the official Bihar School Examination Board (BSEB) or a Government of Bihar website, unless expressly authorized.",
    content: [
      "BIHAR BOARD (\"Learn • Practice • Test • Revise • Succeed\" / \"पढ़ाई • अभ्यास • टेस्ट • रिविजन • सफलता\") is a privately owned and operated digital education technology platform. The platform operates independently to provide supplemental educational notes, video explanations, chapter question banks, mock examination test series, and AI-assisted doubt clarification tools.",
      "We are NOT affiliated with, authorized by, sponsored by, endorsed by, or in any way officially connected to the Bihar School Examination Board (BSEB), the State Council of Educational Research and Training (SCERT Bihar), the Department of Education (Government of Bihar), or the Ministry of Education (Government of India).",
      "All official board examination notifications, official admit cards, exam center allotments, fee circulars, official curriculum syllabi, answer keys, and final board exam results are published exclusively on official government portals. Students, parents, and schools must always rely on official government notifications for formal administrative procedures."
    ],
    keyPoints: [
      "Private educational technology initiative with no statutory government authority.",
      "Does not issue official government certificates, marks sheets, or admit cards.",
      "All government references are solely for educational identification and curriculum alignment."
    ]
  },
  {
    id: "eligibility",
    number: 3,
    title: "Eligibility",
    category: "General & Access",
    summary: "Criteria for student, guardian, and educator participation on the platform.",
    content: [
      "The Platform is specifically curated for students enrolled in or preparing for Class 6th through 12th state board examinations, their lawful parents or legal guardians, and qualified academic educators.",
      "Minors & Parental Consent: If you are under 18 years of age (a minor under the Indian Majority Act, 1875 and the Digital Personal Data Protection Act, 2023), you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf. By granting permission, the parent or guardian agrees to monitor the minor's educational usage, purchases, and data sharing.",
      "You represent and warrant that you possess the legal capacity to enter into a binding contract and are not barred from accessing educational software under the laws of India or any applicable jurisdiction."
    ],
    keyPoints: [
      "Tailored for students (Grades 6–12), parents/guardians, and verified educators.",
      "Minor usage requires parental/guardian supervision and verifiable consent.",
      "Requires accurate representation of age and legal jurisdiction."
    ]
  },
  {
    id: "account-registration",
    number: 4,
    title: "Account Registration",
    category: "General & Access",
    summary: "Creating, maintaining, and verifying a genuine learner or educator account.",
    content: [
      "To access full-length test series, save bookmarks, interact with the AI Tutor, or track your study progress, you must register a unique user account.",
      "You agree to provide true, accurate, current, and complete registration details, including your full legal name, active email address, contact phone number, academic grade/class (e.g., Class 10th or 12th Science/Arts/Commerce), preferred language medium (Hindi or English), and Bihar district.",
      "You may not register under a false identity, impersonate any other individual, or use an email or phone number that you are not legally authorized to use. Creating multiple abusive accounts to manipulate test leaderboards is strictly prohibited."
    ],
    keyPoints: [
      "One account per student to preserve genuine learning analytics.",
      "Mandatory profile accuracy for customized chapter question banks and test generation.",
      "Strict ban on disposable email accounts and automated bot registrations."
    ]
  },
  {
    id: "login-and-authentication",
    number: 5,
    title: "Login and Authentication",
    category: "General & Access",
    summary: "Security protocols, OAuth authentication, OTP verification, and session tokens.",
    content: [
      "BIHAR BOARD utilizes Google OAuth single sign-on and verified phone OTP authentication for secure access. You are exclusively responsible for safeguarding your credentials, mobile device security, and session tokens.",
      "You agree not to disclose your login credentials or share your active account session with any third party. Any actions taken through your account are legally attributed to you.",
      "If you suspect or discover any unauthorized access, compromised security token, or password breach, you must notify our technical security team immediately at support@biharboard.org.in."
    ],
    keyPoints: [
      "Standard industry OAuth SSO and one-time verification tokens.",
      "No storage of raw external passwords on our servers.",
      "Mandatory notification of compromised devices or session leaks."
    ]
  },
  {
    id: "student-account",
    number: 6,
    title: "Student Account",
    category: "Platform Features",
    summary: "Individual learner profile, personalized study schedules, streak records, and progress stats.",
    content: [
      "A Student Account grants a non-exclusive, non-transferable, personal license to access educational notes, video explanations, practice quizzes, timed mock tests, and AI doubt resolutions for individual personal study.",
      "Student accounts cannot be sublicensed, leased, shared in communal coaching batches, or resold. Platform algorithms track simultaneous multi-IP logins and may automatically lock shared credentials to protect intellectual property.",
      "Students agree to maintain academic integrity while taking online examinations and solving chapter quizzes."
    ],
    keyPoints: [
      "Personal non-commercial learning license.",
      "Anti-account-sharing concurrency checks.",
      "Fair learning and ethical test-taking expectations."
    ]
  },
  {
    id: "parent-portal",
    number: 7,
    title: "Parent Portal",
    category: "Platform Features",
    summary: "Guardian visibility, student performance oversight, purchase approvals, and data rights.",
    content: [
      "Parents or legal guardians may link their accounts to a student account to monitor study time, attendance in live/recorded lectures, test scores, weak topic diagnostics, and Store purchase history.",
      "Parents have the legal authority under the DPDP Act 2023 to review, correct, or request the deletion of their minor child's educational data through our Privacy Dashboard or Grievance Desk.",
      "Parents are responsible for reviewing and approving all monetary transactions and Study Store purchases made for or by their children."
    ],
    keyPoints: [
      "Transparent progress and chapter completion metrics for guardians.",
      "Statutory parental data control and consent withdrawal mechanisms.",
      "Transaction oversight and digital safety supervision."
    ]
  },
  {
    id: "teacher-portal",
    number: 8,
    title: "Teacher Portal",
    category: "Platform Features",
    summary: "Educator tools, doubt resolution desk, study note publishing, and academic conduct.",
    content: [
      "Qualified teachers and academic mentors using the Teacher Portal agree to uphold the highest standards of pedagogical ethics, subject accuracy, and student respect.",
      "Educators must not publish inaccurate syllabus notes, post copyrighted content from competing private publishers, solicit students for unauthorized private tuitions, or extract private student contact information.",
      "BIHAR BOARD reserves the right to review, moderate, approve, or remove any teacher-uploaded study notes or video answers that violate our quality criteria or community guidelines."
    ],
    keyPoints: [
      "Strict educator code of conduct and student privacy protection.",
      "Ban on external commercial solicitation or unauthorized data extraction.",
      "Editorial oversight for all public educational materials."
    ]
  },
  {
    id: "admin-panel",
    number: 9,
    title: "Admin Panel",
    category: "Platform Features",
    summary: "Administrative oversight, platform maintenance, content moderation, and anti-fraud.",
    content: [
      "Authorized platform administrators possess administrative authority to manage user accounts, moderate test question banks, update syllabus content, audit security logs, and process refund/privacy requests.",
      "Admin actions are governed by strict role-based access control (RBAC), multi-factor authentication, and immutable audit logs to safeguard student records and proprietary assets.",
      "Administrators may temporarily restrict, flag, or terminate user access in cases of cheating on state rank tests, DDoS attempts, payment fraud, or Terms violations."
    ],
    keyPoints: [
      "Role-based access control and continuous security audit logging.",
      "Enforcement of fair leaderboard standards and fraud prevention.",
      "Protection of platform integrity and database assets."
    ]
  },
  {
    id: "courses-and-study-materials",
    number: 10,
    title: "Courses and Study Materials",
    category: "Platform Features",
    summary: "Video lectures, PDF notes, formula sheets, chapter summaries, and revision blueprints.",
    content: [
      "All video lectures, audio explanations, bilingual PDFs, formula cheat sheets, mind maps, and chapter-wise question solutions provided on BIHAR BOARD are for your personal educational use only.",
      "You are granted a limited, revocable, non-exclusive, non-transferable license to view, download (where offline caching is explicitly enabled), and review materials for your personal examination preparation.",
      "You are strictly prohibited from copying, distributing, selling, broadcasting, uploading to Telegram/YouTube/WhatsApp groups, printing for commercial resale, or creating derivative works from our proprietary study materials."
    ],
    keyPoints: [
      "Bilingual study notes aligned with state curriculum standards.",
      "Personal educational use license with strict copyright protections.",
      "Zero tolerance for unauthorized public redistribution or piracy."
    ]
  },
  {
    id: "online-tests-and-results",
    number: 11,
    title: "Online Tests and Results",
    category: "Platform Features",
    summary: "Chapter tests, full-syllabus mock tests, timing algorithms, percentiles, and state leaderboards.",
    content: [
      "Online tests are designed to simulate the format, timing, question distribution, and marking schemes of state board examinations. Results, percentages, state percentiles, and ranks are calculated algorithmically based on user submissions.",
      "Leaderboards and comparative analytics are provided for motivational and diagnostic purposes only. Platform ranks do not constitute or guarantee official Bihar School Examination Board results or merit ranks.",
      "The Platform employs automated integrity monitoring. Using multiple tabs, external scripting, automated answer fetchers, or coordinated answer sharing will result in disqualification from test leaderboards and potential account suspension."
    ],
    keyPoints: [
      "Objective, subjective, and rapid-fire quiz modes with detailed answer keys.",
      "Leaderboard rankings are simulated diagnostic metrics.",
      "Automated anti-cheating algorithms protect fair academic competition."
    ]
  },
  {
    id: "ai-tutor",
    number: 12,
    title: "AI Tutor",
    category: "Platform Features",
    summary: "AI-driven doubt resolution, step-by-step math solver, language explanations, and model limitations.",
    content: [
      "The BIHAR BOARD AI Tutor is an automated learning assistant powered by advanced artificial intelligence (Google Gemini GenAI models). It is engineered to help students understand difficult scientific concepts, solve step-by-step mathematics problems, translate Hindi-English terminology, and generate study revision cards.",
      "Supplementary Nature & Verification: The AI Tutor is an automated supplementary aid. While we fine-tune our prompts for high syllabus fidelity, generative AI may occasionally produce incomplete, inaccurate, or outdated explanations (\"hallucinations\").",
      "Students and teachers MUST independently verify crucial formulas, historical dates, exam marking rules, and numerical solutions using their standard NCERT/BSTBPC textbooks and teacher guidance. BIHAR BOARD is not liable for errors arising from unverified AI responses.",
      "Safety & Prohibited AI Prompts: You agree not to submit toxic, obscene, hateful, non-educational, or malicious prompts to the AI Tutor. All prompt telemetry is monitored for child safety and academic relevance."
    ],
    keyPoints: [
      "Supplementary 24/7 AI doubt solving and concept simplification.",
      "Students must verify critical formulas and dates against official textbooks.",
      "Strict content safety filtering and child-safe guardrails."
    ]
  },
  {
    id: "study-store-digital-products",
    number: 13,
    title: "Study Store / Digital Products",
    category: "Commerce & Content",
    summary: "Physical Bihar Board Question Banks, formula booklets, sample paper packs, and digital bundles.",
    content: [
      "The BIHAR BOARD Study Store offers physical printed books (e.g., Class 10 & 12 Previous 10 Years Solved Question Banks, Model Papers) as well as premium digital PDF bundles and test series passes.",
      "Product Descriptions & Availability: We strive to display product details, book page counts, binding types, and prices with complete accuracy. However, cover designs and minor formatting may be updated across print editions. All items are subject to stock availability.",
      "Pricing & Taxes: All prices listed on the Study Store are in Indian Rupees (INR) and are inclusive of applicable Goods and Services Tax (GST) unless specified otherwise. We reserve the right to modify prices or discontinue products at any time without prior notice."
    ],
    keyPoints: [
      "High-quality printed books and instant-access digital study bundles.",
      "Transparent INR pricing with statutory GST tax compliance.",
      "Clear distinction between physical deliveries and instant digital goods."
    ],
    actionLink: {
      label: "Visit Study Store",
      url: "/store"
    }
  },
  {
    id: "payments-and-orders",
    number: 14,
    title: "Payments and Orders",
    category: "Commerce & Content",
    summary: "Secure checkout, UPI, cards, net banking, payment gateways, and invoice generation.",
    content: [
      "Payment Processing: Payments on BIHAR BOARD are securely routed through RBI-authorized payment aggregators (e.g., Razorpay, Cashfree, UPI QR, Debit/Credit Cards, Net Banking). We do not collect or store full credit/debit card numbers or bank passwords on our servers.",
      "Order Confirmation: Upon successful payment verification, you will receive an immediate on-screen confirmation, an email receipt, and an SMS with your Order ID. For digital items, access is unlocked immediately on your account dashboard.",
      "Failed Transactions: If funds are deducted from your bank account during a network failure or payment gateway timeout without an order confirmation, the amount is automatically refunded by the payment gateway to your source account within 3 to 7 business banking days."
    ],
    keyPoints: [
      "PCI-DSS compliant, RBI-regulated payment gateway processing.",
      "Instant automated invoice generation and digital access provisioning.",
      "Automated reconciliation and reversal for failed bank transactions."
    ]
  },
  {
    id: "refund-and-cancellation",
    number: 15,
    title: "Refund and Cancellation",
    category: "Commerce & Content",
    summary: "Cancellation rules, digital content non-refundability, and physical product return guidelines.",
    content: [
      "Digital Courses & Test Series: Due to the instant delivery of digital study notes, video lectures, and AI credits, all digital subscription fees are non-refundable once content has been accessed, except in cases of verified duplicate billing.",
      "Physical Books & Materials: Physical books purchased from the Study Store are eligible for replacement or full refund if delivered in a physically damaged, defective, or misprinted condition, provided you notify our support desk within 7 calendar days of delivery with photographic evidence.",
      "For comprehensive step-by-step instructions, timelines, and claim procedures, please review our full Cancellation and Refund Policy."
    ],
    keyPoints: [
      "Instant digital access goods are non-refundable once unlocked.",
      "7-day replacement guarantee for damaged or defective physical books.",
      "Transparent 5–7 business day refund credit back to original payment source."
    ],
    actionLink: {
      label: "View Refund Policy",
      url: "/refund-policy"
    }
  },
  {
    id: "shipping-policy",
    number: 16,
    title: "Shipping Policy",
    category: "Commerce & Content",
    summary: "Delivery across 38 Bihar districts and pan-India, courier partners, dispatch timelines, and tracking.",
    content: [
      "Fulfillment & Dispatch: All physical book orders are processed and dispatched from our central fulfillment facility in Patna, Bihar within 24 to 48 business hours of order placement.",
      "Delivery Timelines: Typical delivery timelines are 3 to 5 business days for addresses within Bihar (covering all 38 districts including Patna, Gaya, Muzaffarpur, Bhagalpur, Darbhanga, Purnia, Saharsa, Saran, etc.) and 5 to 7 business days for other Indian states.",
      "Tracking: Once your package is handed over to our courier partner (e.g., India Post, Delhivery, Blue Dart), an SMS and email notification with an active Airway Bill (AWB) tracking link will be transmitted to you.",
      "For complete logistical details, please consult our full Shipping and Delivery Policy."
    ],
    keyPoints: [
      "Prompt 24–48 hour order dispatch from Patna logistics hub.",
      "Comprehensive coverage of all 38 Bihar districts and nationwide pincodes.",
      "Live SMS & email courier tracking with dedicated delivery support."
    ],
    actionLink: {
      label: "View Shipping Policy",
      url: "/shipping-policy"
    }
  },
  {
    id: "intellectual-property",
    number: 17,
    title: "Intellectual Property",
    category: "Commerce & Content",
    summary: "Trademarks, copyrighted test banks, proprietary software, UI layout, and anti-piracy covenants.",
    content: [
      "All intellectual property on the Platform—including but not limited to the BIHAR BOARD name, logo, graphic designs, icons, UI/UX architecture, source code, database schemas, question banks, answer keys, video scripts, diagrams, and AI prompts—is the exclusive proprietary property of BIHAR BOARD and its content creators.",
      "All content is protected under the Indian Copyright Act, 1957, the Trade Marks Act, 1999, the Information Technology Act, 2000, and international intellectual property conventions.",
      "You are strictly prohibited from reverse-engineering, decompiling, scraping, mass downloading, recording, screenshotting for distribution, republishing, or creating unauthorized derivative works from any portion of the Platform without our prior written consent."
    ],
    keyPoints: [
      "All study materials, logos, and software code are legally protected assets.",
      "Strict ban on scraping, video screen-recording, or commercial redistribution.",
      "Violations are subject to immediate civil and criminal statutory legal action."
    ]
  },
  {
    id: "user-generated-content",
    number: 18,
    title: "User-Generated Content",
    category: "Commerce & Content",
    summary: "Doubt submissions, forum discussions, student reviews, handwritten question images, and content licenses.",
    content: [
      "The Platform may allow students, parents, and educators to post comments, submit academic doubts, upload photos of handwritten questions for AI analysis, and submit product reviews (\"User Content\").",
      "License Grant: By submitting User Content, you grant BIHAR BOARD a worldwide, perpetual, royalty-free, non-exclusive license to use, reproduce, display, adapt, and analyze such content solely for the purpose of operating, improving, training educational models, and delivering our educational services.",
      "Content Standards: You warrant that your User Content is original, does not infringe third-party copyrights, is free of harmful code or malware, and does not contain defamatory, obscene, harassing, or unlawful material. We reserve the right to delete any non-compliant User Content immediately without notice."
    ],
    keyPoints: [
      "Students retain ownership of their personal doubts and handwritten questions.",
      "Non-exclusive license granted to platform for educational analysis and model improvement.",
      "Strict moderation against abusive, defamatory, or non-educational content."
    ]
  },
  {
    id: "prohibited-activities",
    number: 19,
    title: "Prohibited Activities",
    category: "Legal & Compliance",
    summary: "Explicit restrictions, anti-hacking rules, cheating bans, harassment policies, and abuse prevention.",
    content: [
      "You agree NOT to engage in any of the following prohibited actions:",
      "1. Academic Dishonesty: Using automated bots, scripts, unauthorized browser extensions, or proxy test-takers to cheat on timed test series or falsify leaderboard rankings.",
      "2. Commercial Exploitation: Reselling account access, sharing login credentials across coaching centers, or selling downloaded PDFs and video lectures.",
      "3. Technical Interference: Attempting to bypass security mechanisms, probe server vulnerabilities, execute Denial of Service (DoS/DDoS) attacks, inject malicious code, or scrape data using automated crawlers.",
      "4. Impersonation & Misrepresentation: Pretending to be an official Bihar School Examination Board examiner, government official, or BIHAR BOARD staff member.",
      "5. Harassment & Abuse: Posting derogatory comments, harassing fellow students or teachers, or transmitting hateful or sexually suggestive material across forums and AI chats."
    ],
    keyPoints: [
      "Strict prohibition against academic cheating and automated test hacking.",
      "Ban on commercial resale or communal coaching account sharing.",
      "Zero tolerance for technical attacks, scraping, harassment, or government impersonation."
    ]
  },
  {
    id: "third-party-services",
    number: 20,
    title: "Third-Party Services",
    category: "Legal & Compliance",
    summary: "Cloud infrastructure, Google Cloud GenAI, Firebase, Razorpay, and external study resources.",
    content: [
      "The Platform integrates with trusted enterprise third-party service providers to deliver robust infrastructure, including Google Cloud Platform (compute & AI inference), Firebase Authentication, payment gateways (Razorpay/Cashfree), and courier logistics APIs.",
      "Your interactions with these third-party services are subject to their respective terms of service and privacy policies. While we mandate high standards of data security from our partners, BIHAR BOARD is not responsible for the independent uptime, policies, or practices of external third-party entities.",
      "External Links: The Platform may contain hyperlinks to external educational websites, NCERT reference archives, or government portals. We do not endorse or assume liability for the content or security of external third-party websites."
    ],
    keyPoints: [
      "Enterprise-grade cloud hosting and certified payment gateways.",
      "Third-party integrations operate under strict contractual data protection terms.",
      "Platform not liable for external third-party websites or disruptions."
    ]
  },
  {
    id: "privacy",
    number: 21,
    title: "Privacy",
    category: "Legal & Compliance",
    summary: "Full incorporation of the Privacy Policy and adherence to Indian data protection laws.",
    content: [
      "Your privacy and digital safety are paramount to us. Our collection, processing, storage, and sharing of your personal data are governed by our comprehensive Privacy Policy, which is incorporated by reference into these Terms.",
      "We strictly comply with the Digital Personal Data Protection (DPDP) Act, 2023, the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.",
      "We NEVER sell, rent, or trade your personal data, phone numbers, or academic records to third-party marketing brokers. Please read our Privacy Policy for full details regarding your data rights."
    ],
    keyPoints: [
      "Privacy Policy is a binding legal component of this agreement.",
      "Full compliance with India's DPDP Act 2023 and IT Act 2000.",
      "Zero commercial sale or marketing brokering of student data."
    ],
    actionLink: {
      label: "Read Privacy Policy",
      url: "/privacy-policy"
    }
  },
  {
    id: "data-retention-and-account-deletion",
    number: 22,
    title: "Data Retention and Account Deletion",
    category: "Legal & Compliance",
    summary: "Right to data erasure, account deletion workflow, and statutory retention periods.",
    content: [
      "Right to Erasure: You possess the right to permanently delete your BIHAR BOARD account and erase your personal profile data, study streak logs, test records, and AI chat histories at any time.",
      "Self-Service Deletion Workflow: You can initiate account deletion directly through the Privacy Dashboard at /privacy/dashboard or by submitting a formal deletion request to privacy@biharboard.org.in.",
      "Retention & Anonymization: Once a deletion request is confirmed, your personal identifiers are purged from active production databases within 30 calendar days. Financial tax invoices, GST transaction records, and security audit logs are retained for mandatory statutory periods (up to 7 years) under Indian tax laws in encrypted archives."
    ],
    keyPoints: [
      "Unrestricted student right to request permanent account deletion.",
      "Self-service controls available in the Privacy Dashboard.",
      "Secure 30-day purge with statutory retention for tax records only."
    ],
    actionLink: {
      label: "Go to Privacy Dashboard",
      url: "/privacy/dashboard"
    }
  },
  {
    id: "security",
    number: 23,
    title: "Security",
    category: "Legal & Compliance",
    summary: "SSL/TLS 256-bit encryption, token security, rate limiting, and vulnerability reporting.",
    content: [
      "We implement comprehensive technical, administrative, and physical security measures to safeguard user records, including 256-bit SSL/TLS transport encryption, hashed authentication tokens, firewalls, and automated DDoS rate limiting.",
      "No security system is 100% impenetrable. While we follow industry best practices, we cannot guarantee absolute immunity from unforeseen cyber attacks, hardware failures, or network disruptions.",
      "Responsible Disclosure: If you identify a potential security vulnerability or data exposure on our platform, please report it immediately to our security desk at security@biharboard.org.in. We appreciate collaborative ethical research."
    ],
    keyPoints: [
      "End-to-end 256-bit TLS encryption across all web and mobile traffic.",
      "Strict token security and rate limiting against brute force attacks.",
      "Dedicated responsible disclosure channel for security researchers."
    ]
  },
  {
    id: "service-availability",
    number: 24,
    title: "Service Availability",
    category: "Legal & Compliance",
    summary: "Uptime targets, scheduled maintenance windows, bandwidth limits, and force majeure events.",
    content: [
      "We strive to maintain 99.9% platform availability so students can study and take mock tests without interruption. However, platform access is provided on an \"AS IS\" and \"AS AVAILABLE\" basis.",
      "We may occasionally conduct scheduled maintenance, database upgrades, or server migrations, which we will endeavor to schedule during low-traffic off-peak hours with prior banner announcements.",
      "Force Majeure: BIHAR BOARD is not liable for service interruptions, delays, or performance failures caused by events beyond our reasonable control, including natural disasters, telecommunication failures, power grid outages, state-wide internet suspensions, cyber attacks, or government directives."
    ],
    keyPoints: [
      "99.9% target uptime for core learning and test environments.",
      "Advance notice for scheduled system maintenance windows.",
      "Protection under standard force majeure and internet outage events."
    ]
  },
  {
    id: "educational-disclaimer",
    number: 25,
    title: "Educational Disclaimer",
    category: "Legal & Compliance",
    summary: "Self-study diagnostic aid, no guarantee of board examination marks, ranks, or outcomes.",
    content: [
      "BIHAR BOARD provides self-directed academic preparation resources, chapter practice questions, sample test papers, and AI explanations. All materials are intended solely as study aids to supplement regular schooling and self-study.",
      "NO GUARANTEE OF MARKS OR PASSING: We do NOT guarantee that using our platform will result in passing marks, specific percentages, distinction grades, or state ranks in the official Bihar School Examination Board (BSEB) Class 10 or Class 12 exams.",
      "Academic performance depends entirely on the student's personal dedication, school instruction, exam preparation, and individual aptitude. Our mock test scores are simulated diagnostics and may not mirror exact state exam difficulty or grading standards."
    ],
    keyPoints: [
      "Platform materials are supplementary self-study aids.",
      "No express or implied guarantee of specific examination ranks or grades.",
      "Students must follow prescribed official curriculum textbooks."
    ]
  },
  {
    id: "limitation-of-liability",
    number: 26,
    title: "Limitation of Liability",
    category: "Dispute & Final Provisions",
    summary: "Capped statutory monetary liability, waiver of indirect, consequential, or punitive damages.",
    content: [
      "To the maximum extent permitted by applicable Indian law, BIHAR BOARD, its directors, officers, employees, educators, affiliates, and technical partners shall NOT be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, loss of data, loss of academic opportunity, or cost of substitute goods.",
      "Aggregate Liability Cap: Under all circumstances, our aggregate monetary liability arising out of or related to these Terms, the Platform, digital courses, or Study Store orders shall be strictly capped at the total amount actually paid by you to BIHAR BOARD in the three (3) months preceding the incident giving rise to the claim, or INR ₹1,000 (Indian Rupees One Thousand), whichever is less.",
      "Some jurisdictions do not allow the limitation or exclusion of certain liabilities; in such jurisdictions, our liability is limited to the greatest extent permitted by law."
    ],
    keyPoints: [
      "Waiver of indirect, special, punitive, or consequential damages.",
      "Total liability capped at amounts paid in the preceding 3 months or ₹1,000.",
      "Enforceable to the fullest extent permitted by Indian statutory law."
    ]
  },
  {
    id: "indemnification",
    number: 27,
    title: "Indemnification",
    category: "Dispute & Final Provisions",
    summary: "User obligation to defend, indemnify, and hold harmless the platform against breach of terms.",
    content: [
      "You agree to defend, indemnify, and hold harmless BIHAR BOARD, its parent entities, subsidiaries, officers, directors, employees, educators, agents, and licensors from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or legal fees arising out of or relating to:",
      "1. Your violation of these Terms and Conditions or our Privacy Policy;",
      "2. Your User Content, submitted questions, or forum postings;",
      "3. Your violation of any third-party intellectual property, privacy, or statutory rights; or",
      "4. Any fraudulent, abusive, or unlawful use of your account by you or any third party using your credentials."
    ],
    keyPoints: [
      "Mutual protection against unlawful misuse, IP infringement, or fraudulent behavior.",
      "Covers legal defense costs resulting from user violations.",
      "Survives termination of the user account and agreement."
    ]
  },
  {
    id: "suspension-and-termination",
    number: 28,
    title: "Suspension and Termination",
    category: "Dispute & Final Provisions",
    summary: "Grounds for account locking, cancellation of access, and post-termination effects.",
    content: [
      "Platform Termination Rights: We reserve the right, in our sole discretion, without prior notice or liability, to suspend, restrict, or terminate your account and access to the Platform if:",
      "1. You breach any provision of these Terms or associated policies;",
      "2. You engage in academic cheating, automated scraping, or platform abuse;",
      "3. Your account is linked to suspected payment fraud, chargeback abuse, or identity falsification; or",
      "4. We are required to do so by a court of competent jurisdiction or law enforcement order.",
      "Effect of Termination: Upon termination, your right to use the Platform ceases immediately. All provisions of these Terms which by their nature should survive termination shall survive, including intellectual property rights, warranty disclaimers, indemnity, and limitations of liability."
    ],
    keyPoints: [
      "Immediate termination for academic cheating, fraud, or terms violations.",
      "No refund for accounts terminated due to unlawful or abusive conduct.",
      "IP rights, disclaimers, and legal clauses survive termination."
    ]
  },
  {
    id: "changes-to-terms",
    number: 29,
    title: "Changes to Terms",
    category: "Dispute & Final Provisions",
    summary: "Version updates, notice of revisions, and binding continuous acceptance.",
    content: [
      "We reserve the right to review, update, amend, or modify these Terms and Conditions at any time to reflect legislative updates, new features, or changes in our educational business operations.",
      "Notification of Updates: When modifications occur, we will update the \"Last Updated\" date at the top of this document. For material changes that substantially impact your rights, we will provide prominent notice via a website banner, email bulletin, or in-app notification.",
      "Your continued use of the Platform following the publication of revised Terms constitutes your unconditional acceptance of the updated terms. If you do not agree with the revisions, you must cease using the Platform and may request account deletion."
    ],
    keyPoints: [
      "Periodic reviews ensure alignment with evolving digital education laws.",
      "Prominent banners and email alerts for material policy revisions.",
      "Continued platform usage constitutes legally binding assent."
    ]
  },
  {
    id: "governing-law-and-jurisdiction",
    number: 30,
    title: "Governing Law and Jurisdiction",
    category: "Dispute & Final Provisions",
    summary: "Republic of India legal framework and exclusive court jurisdiction in Patna, Bihar.",
    content: [
      "These Terms, their interpretation, validity, and any dispute or claim arising out of or in connection with them (including non-contractual disputes) shall be governed by and construed in accordance with the laws of the Republic of India.",
      "Exclusive Jurisdiction: You expressly agree that any legal action, lawsuit, arbitration, or proceeding arising out of or related to these Terms or the BIHAR BOARD platform shall be instituted exclusively in the competent civil courts and tribunals located in Patna, Bihar, India.",
      "You irrevocably waive any objection to the laying of venue or the convenience of forum in the courts of Patna, Bihar."
    ],
    keyPoints: [
      "Governed under the laws of the Republic of India.",
      "Exclusive territorial jurisdiction vested in the competent courts of Patna, Bihar.",
      "Waiver of forum non-conveniens."
    ]
  },
  {
    id: "contact-information",
    number: 31,
    title: "Contact Information",
    category: "Dispute & Final Provisions",
    summary: "Platform headquarters, support helplines, official emails, and grievance contacts.",
    content: [
      "If you have any questions, clarifications, or feedback regarding these Terms & Conditions, you may reach our compliance and academic support teams through the following official channels:",
      "• Registered Entity: BIHAR BOARD Digital Education Platform",
      "• Registered Address: Dak Bunglow Road, Fraser Road Area, Patna, Bihar 800001, India",
      "• Academic Support Email: support@biharboard.org.in",
      "• Legal & Compliance Email: legal@biharboard.org.in",
      "• Grievance Desk Email: grievance@biharboard.org.in",
      "• Telephone Helpline: +91 612 000 0000 (Monday to Saturday, 9:00 AM to 7:00 PM IST)"
    ],
    keyPoints: [
      "Direct communication channels for academic, legal, and operational inquiries.",
      "Physical office presence in Patna, Bihar.",
      "Dedicated response timeline within 24 to 48 business hours."
    ],
    actionLink: {
      label: "Contact Support Desk",
      url: "/contact"
    }
  },
  {
    id: "legal-notices",
    number: 32,
    title: "Legal Notices",
    category: "Dispute & Final Provisions",
    summary: "Formal delivery of statutory notices, legal correspondence, and compliance communications.",
    content: [
      "All formal legal notices, statutory demands, or regulatory communications directed to BIHAR BOARD must be in writing and delivered either by registered post to our registered office in Patna or by email to legal@biharboard.org.in with confirmed delivery receipt.",
      "Notices from BIHAR BOARD to you will be transmitted electronically to the primary email address linked to your account or posted prominently on the Platform. Notices shall be deemed delivered twenty-four (24) hours after transmission."
    ],
    keyPoints: [
      "Formal written requirements for statutory notices and court filings.",
      "Electronic delivery to verified user email addresses.",
      "Established legal receipt acknowledgment protocols."
    ]
  },
  {
    id: "severability",
    number: 33,
    title: "Severability",
    category: "Dispute & Final Provisions",
    summary: "Independence of individual clauses and preservation of the overall agreement.",
    content: [
      "If any provision, clause, or sub-clause of these Terms is held by a court or tribunal of competent jurisdiction to be invalid, illegal, void, or unenforceable under applicable law, such invalidity shall not affect the remaining provisions.",
      "The invalid provision shall be modified, restricted, or replaced by a valid provision that most closely reflects the original economic, educational, and legal intent of the parties, and all other provisions shall continue in full force and effect."
    ],
    keyPoints: [
      "Invalidity of a single clause does not invalidate the entire agreement.",
      "Enforceability of remaining educational covenants is fully preserved.",
      "Automatic reformation of non-compliant terms to legally valid standards."
    ]
  },
  {
    id: "entire-agreement",
    number: 34,
    title: "Entire Agreement",
    category: "Dispute & Final Provisions",
    summary: "Superseding all prior verbal or written understandings between the user and the platform.",
    content: [
      "These Terms & Conditions, together with our Privacy Policy, Cancellation & Refund Policy, Shipping Policy, and any written order confirmation receipts, constitute the sole and entire agreement between you and BIHAR BOARD regarding your use of the Platform.",
      "This Agreement supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, whether oral or written, regarding the subject matter herein.",
      "No oral advice, social media post, or informal chat response by any BIHAR BOARD representative shall be deemed to modify these Terms unless formalized in a written amendment signed by an authorized director."
    ],
    keyPoints: [
      "Comprehensive binding contract between user and BIHAR BOARD.",
      "Supersedes all prior verbal representations, marketing pitches, or chats.",
      "Written authorization required for any formal amendments."
    ]
  },
  {
    id: "waiver",
    number: 35,
    title: "Waiver",
    category: "Dispute & Final Provisions",
    summary: "Non-waiver of rights through delayed enforcement or failure to exercise remedies.",
    content: [
      "No failure or delay by BIHAR BOARD in exercising any right, power, or privilege under these Terms shall operate as a waiver thereof.",
      "No single or partial exercise of any right, power, or privilege shall preclude any other or further exercise thereof or the exercise of any other right, power, or privilege.",
      "Any waiver by BIHAR BOARD of a breach of any provision must be in writing and shall not constitute a continuing waiver of subsequent breaches of the same or any other provision."
    ],
    keyPoints: [
      "Platform retains all legal remedies even if enforcement is delayed.",
      "Waivers must be explicitly executed in writing.",
      "Single-instance leniency does not establish a permanent waiver."
    ]
  },
  {
    id: "assignment",
    number: 36,
    title: "Assignment",
    category: "Dispute & Final Provisions",
    summary: "Transfer of rights in corporate reorganizations and prohibition of user account transfer.",
    content: [
      "You may not assign, sublicense, delegate, or transfer your rights, licenses, or obligations under these Terms, in whole or in part, to any third party without our prior written consent. Any attempted assignment in violation of this section is null and void.",
      "BIHAR BOARD may freely assign, transfer, or delegate its rights, licenses, and obligations under these Terms, in whole or in part, in connection with a merger, acquisition, corporate restructuring, sale of assets, or by operation of law, without your consent or prior notice."
    ],
    keyPoints: [
      "User licenses and accounts are strictly personal and non-assignable.",
      "Platform may assign obligations in case of merger or acquisition.",
      "Protects uninterrupted continuity of student study services."
    ]
  },
  {
    id: "contact-support",
    number: 37,
    title: "Contact/Support",
    category: "Dispute & Final Provisions",
    summary: "Dedicated student support desk, ticket escalation matrix, and grievance redressal officer.",
    content: [
      "Our Student Support and Academic Grievance teams are dedicated to ensuring you have an uninterrupted, enriching, and fair learning experience.",
      "Support Escalation Matrix:",
      "• Level 1 (General & Academic Support): For test issues, app questions, or chapter notes inquiries, contact support@biharboard.org.in or call our helpline at +91 612 000 0000 (Mon–Sat, 9:00 AM – 7:00 PM).",
      "• Level 2 (Store & Order Logistics): For physical book tracking, delayed shipments, or replacement claims, email store@biharboard.org.in with your Order ID.",
      "• Level 3 (Grievance Redressal Officer): In compliance with the Information Technology Act, 2000 and DPDP Act, 2023, you may escalate unresolved grievances or privacy complaints to our Designated Grievance Officer at grievance@biharboard.org.in. All formal grievances are acknowledged within 24 hours and resolved within 15 working days."
    ],
    keyPoints: [
      "Multi-tiered support matrix for rapid problem resolution.",
      "Dedicated Store fulfillment support for physical textbook shipments.",
      "Designated Statutory Grievance Redressal Officer with 15-day statutory resolution timeline."
    ],
    actionLink: {
      label: "Open Contact Desk",
      url: "/contact"
    }
  }
];
