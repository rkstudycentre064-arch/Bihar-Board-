import { ProtectedRoute } from "./components/layout/ProtectedRoute";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from "react-router";
import { WebsiteLayout } from "./components/layout/WebsiteLayout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { OnboardingPage } from "./pages/auth/OnboardingPage";
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { AiTutorPage } from "./pages/student/AiTutorPage";
import { BoardExamModePage } from "./pages/student/BoardExamModePage";
import { TestsPage } from "./pages/tests/TestsPage";
import { StorePage } from "./pages/store/StorePage";
import { AboutPage } from "./pages/AboutPage";
import { FAQPage } from "./pages/public/FAQPage";
import { PrivacyPolicyPage } from "./pages/public/PrivacyPolicyPage";
import { PrivacyDashboardPage } from "./pages/privacy/PrivacyDashboardPage";
import { AdminPrivacyCMSPage } from "./pages/admin/AdminPrivacyCMSPage";
import { TermsPage } from "./pages/public/TermsPage";
import { RefundPolicyPage } from "./pages/public/RefundPolicyPage";
import { ShippingPolicyPage } from "./pages/public/ShippingPolicyPage";
import { ContactPage } from "./pages/public/ContactPage";

// New Pages
import { ClassesPage } from "./pages/public/ClassesPage";
import { CoursesPage } from "./pages/public/CoursesPage";
import { StudyMaterialsPage } from "./pages/public/StudyMaterialsPage";
import { ParentPortal } from "./pages/portals/ParentPortal";
import { TeacherPortal } from "./pages/portals/TeacherPortal";
import { AdminPanel } from "./pages/admin/AdminPanel";
import { PermissionsPage } from "./pages/settings/PermissionsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Legal & Privacy Routes */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy/dashboard" element={<PrivacyDashboardPage />} />
        <Route path="/admin/privacy" element={<AdminPrivacyCMSPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/refund" element={<RefundPolicyPage />} />
        <Route path="/shipping-policy" element={<ShippingPolicyPage />} />

        {/* Public Catalog Routes */}
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/study-materials" element={<StudyMaterialsPage />} />

        {/* Auth & App Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Routes */}
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        
        <Route path="/parent-portal" element={<ProtectedRoute allowedRoles={['parent', 'admin']}><ParentPortal /></ProtectedRoute>} />
        <Route path="/teacher-portal" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><TeacherPortal /></ProtectedRoute>} />
        <Route path="/admin-panel" element={<ProtectedRoute allowedRoles={['admin']}><AdminPanel /></ProtectedRoute>} />
        
        <Route path="/ai-tutor" element={<ProtectedRoute><AiTutorPage /></ProtectedRoute>} />
        <Route path="/exam-mode" element={<ProtectedRoute><BoardExamModePage /></ProtectedRoute>} />
        <Route path="/tests" element={<ProtectedRoute><TestsPage /></ProtectedRoute>} />
        <Route path="/store" element={<StorePage />} />
        
        <Route path="/settings/permissions" element={<ProtectedRoute><PermissionsPage /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}
