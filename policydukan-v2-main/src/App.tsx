import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Policies from "./pages/Policies";
import AddPolicy from "./pages/AddPolicy";
import ExpiredPolicies from "./pages/ExpiredPolicies";
import RenewPolicy from "./pages/RenewPolicy";
import Customers from "./pages/Customers";
import Leads from "./pages/Leads";
import Renewals from "./pages/Renewals";
import Commissions from "./pages/Commissions";
import Reports from "./pages/Reports";
import Companies from "./pages/Companies";
import Users from "./pages/Users";
import Imports from "./pages/Imports";
import Plans from "./pages/Plans";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/policies/new" element={<AddPolicy />} />
          <Route path="/policies/expired" element={<ExpiredPolicies />} />
          <Route path="/policies/renew" element={<RenewPolicy />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/renewals" element={<Renewals />} />
          <Route path="/commissions" element={<Commissions />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/users" element={<Users />} />
          <Route path="/imports" element={<Imports />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
