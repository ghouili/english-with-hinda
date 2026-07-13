import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AccessGate } from "@/components/AccessGate";
import { ReactNode, Suspense, lazy } from "react";
import Index from "./pages/Index";

// Route-level code splitting: every route except the landing page is loaded on demand.
const BooksIndex = lazy(() => import("./pages/BooksIndex"));
const GradeHub = lazy(() => import("./pages/GradeHub"));
const BookDetail = lazy(() => import("./pages/BookDetail"));
const ResourcesIndex = lazy(() => import("./pages/ResourcesIndex"));
const ResourceDetail = lazy(() => import("./pages/ResourceDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const Privacy = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Terms })));
const Cookies = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Cookies })));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();
  return isAdmin ? <>{children}</> : <Navigate to="/login" replace />;
}

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AccessGate>
                <Suspense fallback={<RouteFallback />}>
                  <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/books" element={<BooksIndex />} />
                  <Route path="/books/:gradeSlug" element={<GradeHub />} />
                  <Route path="/book/:slug" element={<BookDetail />} />
                  <Route path="/resources" element={<ResourcesIndex />} />
                  <Route path="/resources/:slug" element={<ResourceDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/cookies" element={<Cookies />} />
                  {/* Legacy redirect */}
                  <Route path="/add-resource" element={<Navigate to="/admin" replace />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                </Suspense>
              </AccessGate>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
