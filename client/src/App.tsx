/**
 * Main Application Component
 * 
 * This is the entry point for the application.
 * It now includes a Solitaire card game that runs without ads.
 */

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import SolitairePage from "@/pages/Solitaire";
import Landing from "@/pages/Landing";

/**
 * Router Component
 * 
 * Handles application routing with a simple structure:
 * - Landing page ('/') contains the welcome page with links to the game
 * - Solitaire page ('/solitaire') contains the Solitaire card game
 * - Original Home page ('/academy') contains the educational interface
 * - NotFound catches all other routes and displays a friendly 404 page
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/solitaire" component={SolitairePage} />
      <Route path="/academy" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Main App Component
 * 
 * Wraps the application with necessary providers:
 * - QueryClientProvider: Manages API requests and caching
 * - Router: Handles navigation between pages
 * - Toaster: Provides toast notifications for user feedback
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
