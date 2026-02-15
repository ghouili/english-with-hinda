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
import WhereToBuy from "./pages/WhereToBuy";
import ResourcesIndex from "./pages/ResourcesIndex";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Privacy, Terms, Cookies } from "./pages/Legal";
import NotFound from "./pages/NotFound";

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
            <Route path="/livres" element={<BooksIndex />} />
            <Route path="/livres/:gradeSlug" element={<GradeHub />} />
            <Route path="/livre/:slug" element={<BookDetail />} />
            <Route path="/ou-acheter" element={<WhereToBuy />} />
            <Route path="/ressources" element={<ResourcesIndex />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/confidentialite" element={<Privacy />} />
            <Route path="/conditions" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
