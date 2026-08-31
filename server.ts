import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser, updateProfile } from './src/db/users.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Sync user with DB on login
  app.post("/api/auth/sync", requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      const user = await getOrCreateUser(
        req.user.uid,
        req.user.email || "",
        req.user.name || "User"
      );
      res.json({ user });
    } catch (error: any) {
      console.error("Sync failed:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Update profile
  app.post("/api/users/profile", requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      const updatedUser = await updateProfile(req.user.uid, req.body);
      res.json({ user: updatedUser });
    } catch (error: any) {
      console.error("Profile update failed:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Example secured route
  app.get("/api/me", requireAuth, async (req: AuthRequest, res) => {
    try {
      res.json({ user: req.dbUser });
    } catch (error: any) {
      console.error("Failed to fetch user:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Fetch FAQ Categories
  app.get("/api/faq-categories", async (req, res) => {
    try {
      const { db } = await import('./src/db/index.ts');
      const { faqCategories } = await import('./src/db/schema.ts');
      const { asc } = await import('drizzle-orm');
      
      const categories = await db.select().from(faqCategories).orderBy(asc(faqCategories.displayOrder));
      res.json(categories);
    } catch (error: any) {
      console.error("Failed to fetch FAQ categories:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Fetch FAQs
  app.get("/api/faqs", async (req, res) => {
    try {
      const { db } = await import('./src/db/index.ts');
      const { faqs } = await import('./src/db/schema.ts');
      const { eq, asc } = await import('drizzle-orm');
      
      const allFaqs = await db.select().from(faqs).where(eq(faqs.status, 'published')).orderBy(asc(faqs.displayOrder));
      res.json(allFaqs);
    } catch (error: any) {
      console.error("Failed to fetch FAQs:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Submit FAQ Feedback
  app.post("/api/faqs/:id/feedback", async (req, res) => {
    try {
      const { db } = await import('./src/db/index.ts');
      const { faqFeedback } = await import('./src/db/schema.ts');
      
      const faqId = parseInt(req.params.id);
      const { isHelpful, feedbackText } = req.body;
      
      if (isNaN(faqId) || typeof isHelpful !== 'boolean') {
        return res.status(400).json({ error: 'Invalid input' });
      }

      await db.insert(faqFeedback).values({
        faqId,
        isHelpful,
        feedbackText: feedbackText || null,
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error("Failed to submit FAQ feedback:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // --- PRIVACY & COMPLIANCE ENDPOINTS ---

  // 1. Fetch active published privacy policy
  app.get("/api/privacy/policy/active", async (req, res) => {
    try {
      const { db } = await import('./src/db/index.ts');
      const { privacyPolicies } = await import('./src/db/schema.ts');
      const { eq, desc } = await import('drizzle-orm');

      const policies = await db
        .select()
        .from(privacyPolicies)
        .where(eq(privacyPolicies.isPublished, true))
        .orderBy(desc(privacyPolicies.publishedAt))
        .limit(1);

      if (policies.length === 0) {
        return res.status(404).json({ error: "No published policy found" });
      }

      res.json(policies[0]);
    } catch (error: any) {
      console.error("Failed to fetch active privacy policy:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 2. Fetch all privacy policy versions
  app.get("/api/privacy/policy/versions", async (req, res) => {
    try {
      const { db } = await import('./src/db/index.ts');
      const { privacyPolicies } = await import('./src/db/schema.ts');
      const { desc } = await import('drizzle-orm');

      const allVersions = await db
        .select({
          id: privacyPolicies.id,
          version: privacyPolicies.version,
          title: privacyPolicies.title,
          effectiveDate: privacyPolicies.effectiveDate,
          lastUpdated: privacyPolicies.lastUpdated,
          isPublished: privacyPolicies.isPublished,
          publishedAt: privacyPolicies.publishedAt,
          publishedBy: privacyPolicies.publishedBy,
          createdAt: privacyPolicies.createdAt,
        })
        .from(privacyPolicies)
        .orderBy(desc(privacyPolicies.createdAt));

      res.json(allVersions);
    } catch (error: any) {
      console.error("Failed to fetch policy versions:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 3. Submit a Privacy Request (Public or Authenticated)
  app.post("/api/privacy/requests", async (req, res) => {
    try {
      const { db } = await import('./src/db/index.ts');
      const { privacyRequests } = await import('./src/db/schema.ts');
      const { name, email, phone, requestType, message, userId } = req.body;

      if (!name || !email || !requestType || !message) {
        return res.status(400).json({ error: "Name, email, request type, and message are required." });
      }

      const validTypes = ['data_export', 'account_deletion', 'data_correction', 'privacy_concern', 'consent_withdrawal', 'access_request', 'other'];
      if (!validTypes.includes(requestType)) {
        return res.status(400).json({ error: "Invalid request type." });
      }

      const inserted = await db.insert(privacyRequests).values({
        name,
        email,
        phone: phone || null,
        requestType,
        message,
        userId: userId ? parseInt(userId) : null,
        status: 'new',
      }).returning();

      res.status(201).json({ success: true, request: inserted[0] });
    } catch (error: any) {
      console.error("Failed to submit privacy request:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 4. Get current user's submitted privacy requests
  app.get("/api/privacy/my-requests", requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.dbUser) return res.status(401).json({ error: "Unauthorized" });
      const { db } = await import('./src/db/index.ts');
      const { privacyRequests } = await import('./src/db/schema.ts');
      const { eq, or, desc } = await import('drizzle-orm');

      const requests = await db
        .select({
          id: privacyRequests.id,
          requestType: privacyRequests.requestType,
          message: privacyRequests.message,
          status: privacyRequests.status,
          responseMessage: privacyRequests.responseMessage,
          resolvedAt: privacyRequests.resolvedAt,
          createdAt: privacyRequests.createdAt,
        })
        .from(privacyRequests)
        .where(
          or(
            eq(privacyRequests.userId, req.dbUser.id),
            req.dbUser.email ? eq(privacyRequests.email, req.dbUser.email) : undefined
          )
        )
        .orderBy(desc(privacyRequests.createdAt));

      res.json(requests);
    } catch (error: any) {
      console.error("Failed to fetch my privacy requests:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 5. Record User Consent (Cookies, Policy Acknowledgement)
  app.post("/api/privacy/consent", async (req, res) => {
    try {
      const { db } = await import('./src/db/index.ts');
      const { userConsents } = await import('./src/db/schema.ts');
      const { consentType, policyVersion, consentStatus, sessionId, userId } = req.body;

      if (!consentType || !policyVersion) {
        return res.status(400).json({ error: "Consent type and policy version are required." });
      }

      await db.insert(userConsents).values({
        userId: userId ? parseInt(userId) : null,
        sessionId: sessionId || null,
        consentType,
        policyVersion,
        consentStatus: consentStatus || 'granted',
        ipAddress: req.ip || req.headers['x-forwarded-for']?.toString() || null,
        userAgent: req.headers['user-agent'] || null,
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error("Failed to record consent:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 6. Get User Privacy Preferences
  app.get("/api/privacy/preferences", requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.dbUser) return res.status(401).json({ error: "Unauthorized" });
      const { db } = await import('./src/db/index.ts');
      const { userPrivacyPreferences } = await import('./src/db/schema.ts');
      const { eq } = await import('drizzle-orm');

      const existing = await db
        .select()
        .from(userPrivacyPreferences)
        .where(eq(userPrivacyPreferences.userId, req.dbUser.id));

      if (existing.length === 0) {
        // Return defaults
        return res.json({
          marketingEmails: false,
          learningReminders: true,
          aiPersonalization: true,
          analyticsTracking: true,
          pushNotifications: true,
        });
      }

      res.json(existing[0]);
    } catch (error: any) {
      console.error("Failed to fetch privacy preferences:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 7. Update User Privacy Preferences
  app.post("/api/privacy/preferences", requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.dbUser) return res.status(401).json({ error: "Unauthorized" });
      const { db } = await import('./src/db/index.ts');
      const { userPrivacyPreferences } = await import('./src/db/schema.ts');
      const { eq } = await import('drizzle-orm');

      const { marketingEmails, learningReminders, aiPersonalization, analyticsTracking, pushNotifications } = req.body;

      const existing = await db
        .select()
        .from(userPrivacyPreferences)
        .where(eq(userPrivacyPreferences.userId, req.dbUser.id));

      if (existing.length === 0) {
        const inserted = await db.insert(userPrivacyPreferences).values({
          userId: req.dbUser.id,
          marketingEmails: !!marketingEmails,
          learningReminders: learningReminders !== false,
          aiPersonalization: aiPersonalization !== false,
          analyticsTracking: analyticsTracking !== false,
          pushNotifications: pushNotifications !== false,
        }).returning();
        return res.json(inserted[0]);
      } else {
        const updated = await db.update(userPrivacyPreferences).set({
          marketingEmails: !!marketingEmails,
          learningReminders: learningReminders !== false,
          aiPersonalization: aiPersonalization !== false,
          analyticsTracking: analyticsTracking !== false,
          pushNotifications: pushNotifications !== false,
          updatedAt: new Date(),
        }).where(eq(userPrivacyPreferences.userId, req.dbUser.id)).returning();
        return res.json(updated[0]);
      }
    } catch (error: any) {
      console.error("Failed to update privacy preferences:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 8. Export User Data (Data Portability Right)
  app.get("/api/privacy/export-data", requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.dbUser) return res.status(401).json({ error: "Unauthorized" });
      const { db } = await import('./src/db/index.ts');
      const { 
        studentProfiles, 
        testAttempts, 
        orders, 
        aiConversations, 
        aiMessages,
        userPrivacyPreferences 
      } = await import('./src/db/schema.ts');
      const { eq } = await import('drizzle-orm');

      const [profile] = await db.select().from(studentProfiles).where(eq(studentProfiles.userId, req.dbUser.id));
      const attempts = await db.select().from(testAttempts).where(eq(testAttempts.userId, req.dbUser.id));
      const userOrders = await db.select().from(orders).where(eq(orders.userId, req.dbUser.id));
      const convos = await db.select().from(aiConversations).where(eq(aiConversations.userId, req.dbUser.id));
      const [preferences] = await db.select().from(userPrivacyPreferences).where(eq(userPrivacyPreferences.userId, req.dbUser.id));

      const exportPayload = {
        platform: "BIHAR BOARD",
        tagline: "Learn • Practice • Test • Revise • Succeed",
        exportTimestamp: new Date().toISOString(),
        user: {
          id: req.dbUser.id,
          uid: req.dbUser.uid,
          name: req.dbUser.name,
          email: req.dbUser.email,
          phone: req.dbUser.phone,
          role: req.dbUser.role,
          createdAt: req.dbUser.createdAt,
        },
        studentProfile: profile || null,
        privacyPreferences: preferences || null,
        academicActivity: {
          testAttemptsCount: attempts.length,
          testAttempts: attempts,
          aiConversationsCount: convos.length,
        },
        storeOrders: userOrders,
        notice: "This export includes your verified personal and educational activity data collected by BIHAR BOARD in compliance with applicable data privacy rights."
      };

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename=bihar-board-data-export-${req.dbUser.id}.json`);
      res.json(exportPayload);
    } catch (error: any) {
      console.error("Failed to export user data:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 9. Admin: Get all Privacy Requests
  app.get("/api/admin/privacy/requests", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { db } = await import('./src/db/index.ts');
      const { privacyRequests } = await import('./src/db/schema.ts');
      const { desc } = await import('drizzle-orm');

      const requests = await db
        .select()
        .from(privacyRequests)
        .orderBy(desc(privacyRequests.createdAt));

      res.json(requests);
    } catch (error: any) {
      console.error("Failed to fetch admin privacy requests:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 10. Admin: Update Privacy Request Status & Internal Notes
  app.patch("/api/admin/privacy/requests/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { db } = await import('./src/db/index.ts');
      const { privacyRequests } = await import('./src/db/schema.ts');
      const { eq } = await import('drizzle-orm');

      const requestId = parseInt(req.params.id);
      const { status, internalNotes, responseMessage, assignedTo } = req.body;

      if (isNaN(requestId)) {
        return res.status(400).json({ error: "Invalid request ID" });
      }

      const updateData: any = {
        updatedAt: new Date(),
      };
      if (status) updateData.status = status;
      if (internalNotes !== undefined) updateData.internalNotes = internalNotes;
      if (responseMessage !== undefined) updateData.responseMessage = responseMessage;
      if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
      if (status === 'resolved' || status === 'rejected') {
        updateData.resolvedAt = new Date();
      }

      const updated = await db
        .update(privacyRequests)
        .set(updateData)
        .where(eq(privacyRequests.id, requestId))
        .returning();

      res.json(updated[0]);
    } catch (error: any) {
      console.error("Failed to update privacy request:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 11. Admin: Save or Publish new Privacy Policy
  app.post("/api/admin/privacy/policy", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { db } = await import('./src/db/index.ts');
      const { privacyPolicies } = await import('./src/db/schema.ts');

      const {
        version,
        title,
        smallLabel,
        subtitle,
        effectiveDate,
        lastUpdated,
        entityName,
        websiteUrl,
        privacyEmail,
        supportPhone,
        address,
        grievanceOfficer,
        grievanceEmail,
        retentionConfig,
        thirdPartiesConfig,
        sectionsConfig,
        isPublished,
      } = req.body;

      if (!version || !effectiveDate || !lastUpdated) {
        return res.status(400).json({ error: "Version, effective date, and last updated date are required." });
      }

      const inserted = await db.insert(privacyPolicies).values({
        version,
        title: title || 'Privacy Policy',
        smallLabel: smallLabel || 'LEGAL & PRIVACY',
        subtitle: subtitle || 'Your privacy matters to us. Learn how BIHAR BOARD collects, uses, protects and manages information when you use our Services.',
        effectiveDate,
        lastUpdated,
        entityName: entityName || 'BIHAR BOARD Education Technology Private Limited',
        websiteUrl: websiteUrl || 'https://biharboard.org.in',
        privacyEmail: privacyEmail || 'privacy@biharboard.org.in',
        supportPhone: supportPhone || '+91 612 000 0000',
        address: address || 'Dak Bunglow Road, Fraser Road Area, Patna, Bihar 800001, India',
        grievanceOfficer: grievanceOfficer || 'Compliance & Grievance Redressal Officer',
        grievanceEmail: grievanceEmail || 'grievance@biharboard.org.in',
        retentionConfig: retentionConfig || [],
        thirdPartiesConfig: thirdPartiesConfig || [],
        sectionsConfig: sectionsConfig || [],
        isPublished: isPublished !== false,
        publishedBy: req.dbUser?.name || "Administrator",
        publishedAt: new Date(),
      }).returning();

      res.json(inserted[0]);
    } catch (error: any) {
      console.error("Failed to save privacy policy:", error);
      res.status(500).json({ error: error.message });
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
