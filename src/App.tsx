import './App.css'
import { Routes, Route } from "react-router-dom"
import CarouselApp from "@/components/CarouselApp"
import MarketPlaceApp from "@/components/MarketPlaceApp"
import Profile from "@/components/Profile"
import { ThemeProvider } from "@/components/theme-provider"
import { Layout } from "@/components/Layout"

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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App