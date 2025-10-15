


import './App.css'
import CarouselApp from "@/components/CarouselApp"
import ConnectWallet from "@/components/ConnectWallet"
import NavigationMenuApp from "@/components/NavigationMenuApp"
import MarketPlaceApp from "@/components/MarketPlaceApp"
function App() {
  return (
    <div>
      <ConnectWallet />
    
      <NavigationMenuApp />
      <div> 
        <CarouselApp /> 
      </div>
      <MarketPlaceApp />
    </div>
  )
}

export default App
