import { createContext, useState } from "react"
import FlowerCard from "./components/flowerCard/FlowerCard"
import { flowerShopData, generateTotal, TGenerateToolData, TGetTotalResult } from "./shared/flower-shop-tools"
import Button from "./components/button/Button"
import { CartProvider, useCart } from "./useCart"
import Breakdown from "./components/breakdown/Breakdown"

const App = () => {

  return (
    <CartProvider>
      <h1>Flower Shop Demo</h1>

      <ul>
        {flowerShopData.map(flower => {
          return <FlowerCard key={flower.code} {...flower} />
        })}
      </ul>

      <Breakdown />

    </CartProvider>
  )
}

export default App
