import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserRole, User, Company, Trip, AIRecommendation, MarketPrice, DriverStatus } from '@/types';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

// Mock Data imports
import { MOCK_USERS, MOCK_COMPANIES, MOCK_TRIPS, MOCK_AI_RECOMMENDATIONS, MOCK_MARKET_PRICES, MOCK_DRIVERS } from '@/data/mock';

// Super Admin Pages
import { SuperAdminDashboard } from '@/pages/SuperAdminDashboard';
import { CompanyManagement } from '@/pages/super-admin/CompanyManagement';
import { Analytics } from '@/pages/super-admin/Analytics';
import { AIConfigurator } from '@/pages/super-admin/AIConfigurator';

// Admin Pages
import { AdminInbox } from '@/pages/AdminInbox';
import { CompanyDashboard } from '@/pages/admin/CompanyDashboard';
import { ApprovalPanel } from '@/pages/admin/ApprovalPanel';
import { UserManagement } from '@/pages/admin/UserManagement';

// Dispatcher Pages
import { DispatcherMap } from '@/pages/DispatcherMap';
import { TripManagement } from '@/pages/dispatcher/TripManagement';
import { FleetManagement } from '@/pages/dispatcher/FleetManagement';
// Driver Pages
import { DriverDashboard } from '@/pages/DriverDashboard';
// Placeholders for new pages until they are created
const Placeholder = ({ title }: { title: string }) => <div className="p-8 text-center text-slate-500 font-bold">{title} Page Under Construction</div>;

interface AppContextType {
  role: UserRole;
  user: User;
  switchUser: (userId: string) => void;
  // Global Data
  users: User[];
  companies: Company[];
  trips: Trip[];
  drivers: DriverStatus[];
  aiRecommendations: AIRecommendation[];
  marketPrices: MarketPrice[];
  // Mutators
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
  setAiRecommendations: React.Dispatch<React.SetStateAction<AIRecommendation[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export default function App() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[2]); // Default to Dispatcher (Sarah Ops)
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);
  const [drivers, setDrivers] = useState<DriverStatus[]>(MOCK_DRIVERS);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>(MOCK_AI_RECOMMENDATIONS);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>(MOCK_MARKET_PRICES);

  const switchUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) setCurrentUser(user);
  };

  return (
    <AppContext.Provider value={{ 
      role: currentUser.role, 
      user: currentUser, 
      switchUser,
      users, companies, trips, drivers, aiRecommendations, marketPrices,
      setTrips, setAiRecommendations
    }}>
      <BrowserRouter>
        <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 overflow-hidden font-sans">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
              <Routes>
                {/* Redirect based on role */}
                <Route path="/" element={
                  currentUser.role === 'SUPER_ADMIN' ? <Navigate to="/super-admin/dashboard" replace /> :
                  currentUser.role === 'ADMIN' ? <Navigate to="/admin/dashboard" replace /> :
                  currentUser.role === 'DISPATCHER' ? <Navigate to="/dispatcher/map" replace /> :
                  <Navigate to="/driver/dashboard" replace />
                } />

                {/* Super Admin Routes */}
                <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
                <Route path="/super-admin/companies" element={<CompanyManagement />} />
                <Route path="/super-admin/analytics" element={<Analytics />} />
                <Route path="/super-admin/ai-config" element={<AIConfigurator />} />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<CompanyDashboard />} />
                <Route path="/admin/inbox" element={<AdminInbox />} />
                <Route path="/admin/approvals" element={<ApprovalPanel />} />
                <Route path="/admin/users" element={<UserManagement />} />

                {/* Dispatcher Routes */}
                <Route path="/dispatcher/map" element={<DispatcherMap />} />
                <Route path="/dispatcher/trips" element={<TripManagement />} />
                <Route path="/dispatcher/fleet" element={<FleetManagement />} />

                {/* Driver Routes */}
                <Route path="/driver/dashboard" element={<DriverDashboard />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
