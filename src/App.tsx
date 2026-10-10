import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BusinessProvider } from './context/BusinessContext';

// Layouts
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ExplorePage } from './pages/public/ExplorePage';
import { PricingPage } from './pages/public/PricingPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { CategoriesPage } from './pages/public/CategoriesPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { FAQPage } from './pages/public/FAQPage';
import { ContactPage } from './pages/public/ContactPage';
import { PrivacyPolicyPage } from './pages/public/PrivacyPolicyPage';
import { TermsPage } from './pages/public/TermsPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';

// Tenant App Pages
import { DashboardPage } from './pages/app/DashboardPage';
import { CatalogPage } from './pages/app/CatalogPage';
import { CustomersPage } from './pages/app/CustomersPage';
import { VisitsPage } from './pages/app/VisitsPage';
import { BranchesPage } from './pages/app/BranchesPage';
import { LoyaltyProgramPage } from './pages/app/LoyaltyProgramPage';
import { TasksPage } from './pages/app/TasksPage';
import { RewardsPage } from './pages/app/RewardsPage';
import { ReferralsPage } from './pages/app/ReferralsPage';
import { SettingsPage } from './pages/app/SettingsPage';

// Portal & Admin
import { CustomerPortalPage } from './pages/portal/CustomerPortalPage';
import { PlatformAdminPage } from './pages/admin/PlatformAdminPage';

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user || !user.is_platform_admin) {
    return <Navigate to="/app/dashboard" replace />;
  }
  return <>{children}</>;
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BusinessProvider>
          <BrowserRouter>
            <Routes>
              {/* Marketing & Discovery Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Authentication */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />

              {/* Customer Digital Stamp Card Portal */}
              <Route path="/c/:slug" element={<CustomerPortalPage />} />

              {/* Authenticated Business Tenant Console */}
              <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="catalog" element={<CatalogPage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="visits" element={<VisitsPage />} />
                <Route path="branches" element={<BranchesPage />} />
                <Route path="loyalty" element={<LoyaltyProgramPage />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="rewards" element={<RewardsPage />} />
                <Route path="referrals" element={<ReferralsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Platform Admin Area */}
              <Route path="/admin" element={<AdminRoute><PlatformAdminPage /></AdminRoute>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </BusinessProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
