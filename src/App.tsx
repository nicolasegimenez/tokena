import { Suspense, lazy } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { Layout } from "@/components/Layout"
import { Skeleton } from "@/components/ui/skeleton"

const CarouselApp = lazy(() => import("@/components/CarouselApp"))
const MarketPlaceApp = lazy(() => import("@/components/MarketPlaceApp"))
const Profile = lazy(() => import("@/components/Profile"))
const TokenManagement = lazy(() => import("@/components/TokenManagement"))
const DashboardPage = lazy(() => import("@/app/dashboard/page"))
const AnalyticsPage = lazy(() => import("@/app/analytics/page"))
const ReportsPage = lazy(() => import("@/app/reports/page"))
const PortfolioPage = lazy(() => import("@/app/portfolio/page"))
const InvestProject1Page = lazy(() => import("@/app/invest/project1/page"))
const InvestProject2Page = lazy(() => import("@/app/invest/project2/page"))

function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">Page Not Found</p>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><Skeleton className="w-1/2 h-1/2" /></div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <div>
                <CarouselApp />
                <MarketPlaceApp />
              </div>
            } />
            <Route path="/profile" element={<Profile />} />
            <Route path="/market" element={<MarketPlaceApp />} />
            <Route path="/token" element={<TokenManagement />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/invest/project1" element={<InvestProject1Page />} />
            <Route path="/invest/project2" element={<InvestProject2Page />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App