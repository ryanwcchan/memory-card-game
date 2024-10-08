import { useState } from "react"
import Generator from "./components/Generator"

function App() {
  const [cardData, setCardData] = useState(null)

  return (
    <>
      <Generator />
    </>
  )
}

export default App
