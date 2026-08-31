import { db } from './src/db/index.ts';
import { privacyPolicies } from './src/db/schema.ts';
import { eq } from 'drizzle-orm';

async function seedPrivacy() {
  try {
    console.log("Checking existing privacy policy...");
    const existing = await db.select().from(privacyPolicies).where(eq(privacyPolicies.version, 'v1.0.0'));
    
    const retentionData = [
      {
        category: "Account & Profile Information",
        retentionPeriod: "Duration of active account + 30 days post deletion request",
        purpose: "Account authentication, profile management, and delivering services",
        deletionMethod: "Automated database cascade purge"
      },
      {
        category: "Student Learning Progress & Test Submissions",
        retentionPeriod: "Duration of active account",
        purpose: "Tracking academic progress, calculating scores, and adaptive recommendations",
        deletionMethod: "Hard deletion upon account deletion request"
      },
      {
        category: "AI Tutor Conversations & Doubts",
        retentionPeriod: "90 days from creation",
        purpose: "Providing conversational context and academic assistance",
        deletionMethod: "Automated quarterly rolling deletion"
      },
      {
        category: "Study Store Orders & Invoices",
        retentionPeriod: "7 years (as mandated by statutory tax and company laws)",
        purpose: "Fulfilling orders, handling returns/warranty, tax & audit compliance",
        deletionMethod: "Purged following expiry of statutory retention period"
      },
      {
        category: "Technical, Network & Security Logs",
        retentionPeriod: "180 days",
        purpose: "Maintaining cybersecurity, troubleshooting errors, and preventing fraud",
        deletionMethod: "Automated log rotation and cryptographic zeroing"
      },
      {
        category: "Privacy Consents & Request Audit Logs",
        retentionPeriod: "3 years",
        purpose: "Verifiable proof of regulatory compliance and grievance records",
        deletionMethod: "Permanent audit log expiration"
      }
    ];

    const thirdPartyData = [
      {
        category: "Cloud Hosting & Compute",
        purpose: "Application server deployment, container scaling, and SSL termination",
        dataProcessed: "HTTP/HTTPS requests, IP address, user agent, session tokens",
        provider: "Google Cloud Platform (Cloud Run)"
      },
      {
        category: "Database Storage",
        purpose: "Secure storage of structured learning, user, and commerce data",
        dataProcessed: "Encrypted student profiles, progress, tests, order records",
        provider: "Google Cloud SQL (PostgreSQL)"
      },
      {
        category: "Authentication",
        purpose: "Identity verification, OAuth 2.0 Google sign-in, session tokens",
        dataProcessed: "User ID, verified email address, display name",
        provider: "Google Firebase Authentication"
      },
      {
        category: "AI Tutoring Engine",
        purpose: "Generating step-by-step academic solutions and summaries",
        dataProcessed: "Educational query text and user-uploaded question photos",
        provider: "Google Gemini 2.0 / GenAI Models"
      },
      {
        category: "Payment Processing",
        purpose: "Facilitating secure UPI, card, and net banking transactions for study materials",
        dataProcessed: "Transaction amount, Order ID, payment status (Card/PIN never stored on platform)",
        provider: "PCI-DSS Certified Payment Gateways (Razorpay / BillDesk)"
      },
      {
        category: "Content Delivery & Security",
        purpose: "Edge caching, fast asset distribution, and DDoS mitigation",
        dataProcessed: "Encrypted network traffic, cache telemetry",
        provider: "Cloudflare / Global Edge CDN"
      }
    ];

    if (existing.length === 0) {
      await db.insert(privacyPolicies).values({
        version: "v1.0.0",
        title: "Privacy Policy",
        smallLabel: "LEGAL & PRIVACY",
        subtitle: "Your privacy matters to us. Learn how BIHAR BOARD collects, uses, protects and manages information when you use our Services.",
        effectiveDate: "01/01/2026",
        lastUpdated: "30/08/2026",
        entityName: "BIHAR BOARD Education Technology Private Limited",
        websiteUrl: "https://biharboard.org.in",
        privacyEmail: "privacy@biharboard.org.in",
        supportPhone: "+91 612 000 0000",
        address: "Dak Bunglow Road, Fraser Road Area, Patna, Bihar 800001, India",
        grievanceOfficer: "Compliance & Grievance Redressal Officer",
        grievanceEmail: "grievance@biharboard.org.in",
        retentionConfig: retentionData,
        thirdPartiesConfig: thirdPartyData,
        isPublished: true,
        publishedBy: "System Administrator",
      });
      console.log("Privacy Policy v1.0.0 seeded successfully!");
    } else {
      console.log("Privacy policy already exists.");
    }
    process.exit(0);
  } catch (error) {
    console.error("Error seeding privacy policy:", error);
    process.exit(1);
  }
}

seedPrivacy();
