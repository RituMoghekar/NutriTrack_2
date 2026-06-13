import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import MealPlanner from "./pages/MealPlanner";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Quiz from "@/components/Quiz";
import Education from "@/pages/Education";
import GuessNutrientPage from "@/pages/GuessNutrientPage";
import BuildAPlate from "@/components/BuildAPlateCard";
import MemoryMatch from "@/components/MemoryMatchCard";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AshaDashboard from "@/pages/AshaDashboard";
import AshaLogin from "@/pages/AshaLogin";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Grocery from "@/pages/Grocery";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";

const queryClient = new QueryClient();

const App = () => {
   // ✅ Load Google Translate script ONCE
  useEffect(() => {
  if (!document.querySelector("#google-translate-script")) {
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,te,ta,bn,pa,gu,ml,kn,ur",
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };
  }
}, []);

useEffect(() => {
  const header = document.querySelector("header") as HTMLElement;

  const observer = new MutationObserver(() => {
    const topValue = document.body.style.top;
    if (header) {
      header.style.marginTop = topValue === "" ? "0" : topValue;
    }
  });

  observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

  return () => observer.disconnect();
}, []);

  return(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider> {/* ✅ AuthProvider added */}
      <TranslationProvider>  {/* ✅ Wrap Entire App Here */}
      <Toaster />
      <Sonner />
      {/* ✅ Google Translate Dropdown mounted globally */}
            <div id="google_translate_element" style={{ position: "fixed", top: 10, right: 10, zIndex: 9999 }}></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/education" element={<Education />} />
          <Route path="/games" element={<Games />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/guess" element={<GuessNutrientPage />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/asha-dashboard" element={<AshaDashboard />} />
          <Route path="/asha-login" element={<AshaLogin />} />
          <Route path="/build" element={<DndProvider backend={HTML5Backend}>
  <BuildAPlate />
</DndProvider>} />
          <Route path="/match" element={<MemoryMatch />} />
        </Routes>
      </BrowserRouter>
</TranslationProvider>
</AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);
};

export default App;
