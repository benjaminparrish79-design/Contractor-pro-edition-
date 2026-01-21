import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import Clients from "@/pages/Clients";
import Projects from "@/pages/Projects";
import Invoices from "@/pages/Invoices";
import Analytics from "@/pages/Analytics";
import TimeTracking from "@/pages/TimeTracking";
import Expenses from "@/pages/Expenses";
import TeamMembers from "@/pages/TeamMembers";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/ "} component={Home} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/clients"} component={Clients} />
      <Route path={"/projects"} component={Projects} />
      <Route path={"/invoices"} component={Invoices} />
      <Route path={"/analytics"} component={Analytics} />
      <Route path={"/time-tracking"} component={TimeTracking} />
      <Route path={"/expenses"} component={Expenses} />
      <Route path={"/team-members"} component={TeamMembers} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
