


import './App.css'
import { Routes, Route } from "react-router-dom"
import CarouselApp from "@/components/CarouselApp"
import ConnectWallet from "@/components/ConnectWallet"
import NavigationMenuApp from "@/components/NavigationMenuApp"
import MarketPlaceApp from "@/components/MarketPlaceApp"
import Profile from "@/components/Profile"

function App() {
  return (
    <div>
      <ConnectWallet />
      <NavigationMenuApp />
      
      <Routes>
        <Route path="/" element={
          <div> 
            <CarouselApp /> 
            <MarketPlaceApp />
          </div>
        } />
        <Route path="/profile" element={<Profile />} />
        <Route path="/market" element={<MarketPlaceApp />} />
      </Routes>
    </div>
  )
}

export default App
