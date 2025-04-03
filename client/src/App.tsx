/**
 * Kids Code & Math Academy - Main Application Component
 * 
 * This is the entry point for the educational application designed for children ages 6-8.
 * The app provides interactive learning modules for Python programming, algebra, and geometry.
 */

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

/**
 * Router Component
 * 
 * Handles application routing with a simple structure:
 * - Home page ('/') contains the main educational interface with the three learning modules
 * - NotFound catches all other routes and displays a friendly 404 page
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
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
