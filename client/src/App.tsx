import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import Questionnaire from "@/pages/questionnaire";
import Result from "@/pages/result";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/questionnaire" component={Questionnaire} />
      <Route path="/result" component={Result} />
    </Switch>
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
