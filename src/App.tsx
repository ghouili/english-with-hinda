import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import BooksIndex from "./pages/BooksIndex";
import GradeHub from "./pages/GradeHub";
import BookDetail from "./pages/BookDetail";
import ResourcesIndex from "./pages/ResourcesIndex";
import ResourceDetail from "./pages/ResourceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Privacy, Terms, Cookies } from "./pages/Legal";
import NotFound from "./pages/NotFound";
import AddResource from "./pages/AddResource";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/books" element={<BooksIndex />} />
            <Route path="/books/:gradeSlug" element={<GradeHub />} />
            <Route path="/book/:slug" element={<BookDetail />} />
            <Route path="/resources" element={<ResourcesIndex />} />
            <Route path="/resources/:slug" element={<ResourceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/add-resource" element={<AddResource />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
