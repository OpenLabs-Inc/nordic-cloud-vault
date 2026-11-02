import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";

// Auth Provider
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Layouts
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AppLayout } from "@/components/layout/AppLayout";

// Public Pages
import Landing from "@/pages/Landing";
import Pricing from "@/pages/Pricing";
import Webinar from "@/pages/Webinar";
import HelpCenter from "@/pages/HelpCenter";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

// App Pages
import Dashboard from "@/pages/app/Dashboard";
import Files from "@/pages/app/Files";
import RecentFiles from "@/pages/app/RecentFiles";
import StarredFiles from "@/pages/app/StarredFiles";
import Trash from "@/pages/app/Trash";
import SharedFiles from "@/pages/app/SharedFiles";
import Settings from "@/pages/app/Settings";
import AdminDashboard from "@/pages/app/AdminDashboard";
import PublicShare from "@/pages/PublicShare";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/webinar" element={<Webinar />} />
                <Route path="/help" element={<HelpCenter />} />
              </Route>

              {/* Auth Routes (no layout) */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Public Share Route */}
              <Route path="/shared/:token" element={<PublicShare />} />

              {/* Protected App Routes */}
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="files" element={<Files />} />
                <Route path="recent" element={<RecentFiles />} />
                <Route path="starred" element={<StarredFiles />} />
                <Route path="trash" element={<Trash />} />
                <Route path="shared" element={<SharedFiles />} />
                <Route path="settings" element={<Settings />} />
                <Route path="admin" element={<AdminDashboard />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
