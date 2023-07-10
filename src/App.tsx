import FlowerCard from "./components/flowerCard/FlowerCard"
import { flowerShopData } from "./shared/flower-shop-tools"
import { CartProvider } from "./useCart"
import Breakdown from "./components/breakdown/Breakdown"

import './App.scss'

const App = () => {

  return (
    <CartProvider>
      <h1>Flower Shop Demo</h1>

      <div className="flex-container">
        <ul>
          {flowerShopData.map(flower => {
            return <FlowerCard key={flower.code} {...flower} />
          })}
        </ul>

        <Breakdown />
      </div>

    </CartProvider>
  )
}

export default App
