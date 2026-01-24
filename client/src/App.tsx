import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLanguageInit } from "@/hooks/use-language";

import Home from "@/pages/Home";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import Routines from "@/pages/Routines";
import Remedies from "@/pages/Remedies";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

function Router() {
  useLanguageInit();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/articles" component={Articles} />
          <Route path="/articles/:id" component={ArticleDetail} />
          <Route path="/routines" component={Routines} />
          <Route path="/remedies" component={Remedies} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
