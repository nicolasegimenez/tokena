import './App.css'
import { Routes, Route } from "react-router-dom"
import CarouselApp from "@/components/CarouselApp"
import MarketPlaceApp from "@/components/MarketPlaceApp"
import Profile from "@/components/Profile"
import { ThemeProvider } from "@/components/theme-provider"
import { Layout } from "@/components/Layout"
import TokenManagement from "@/components/TokenManagement"
import DashboardPage from "@/app/dashboard/page"
import AnalyticsPage from "@/app/analytics/page"
import ReportsPage from "@/app/reports/page"
import PortfolioPage from "@/app/portfolio/page"
import InvestProject1Page from "@/app/invest/project1/page"
import InvestProject2Page from "@/app/invest/project2/page"

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
    </ThemeProvider>
  )
}

export default App