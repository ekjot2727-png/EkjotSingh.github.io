import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from "@/components/Navbar";
import { getDarkMode, saveDarkMode } from "@/lib/storage";
import HomePage from "./pages/HomePage";
import TrackerPage from "./pages/TrackerPage";
import HygienePage from "./pages/HygienePage";
import LearnPage from "./pages/LearnPage";
import ChatPage from "./pages/ChatPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => getDarkMode());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    saveDarkMode(isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tracker" element={<TrackerPage />} />
                <Route path="/hygiene" element={<HygienePage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
