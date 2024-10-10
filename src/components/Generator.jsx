import CardComponent from "./CardComponent"
import { useEffect, useState } from "react"

function Header() {
    return (
        <div className="flex items-center justify-between p-10 bg-slate-950 text-gray-50">
            <h1 className="text-3xl font-semibold sm:text-2xl">Memory Card Game</h1>
            <p>Score</p>
        </div>
    )
}

export default function Generator() {
  const [cardData, setCardData] = useState([])

  useEffect(() => {
    async function fetchCardData() {
        const today = (new Date()).toDateString()
        const API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Drytron'
    
        const localKey = `YugiohCards-${today}`
    
        if (localStorage.getItem(localKey)) {
            const storedData = JSON.parse(localStorage.getItem(localKey))
            setCardData(shuffleCards(storedData.data));
            console.log('Fetched card data from cache')
            console.log(storedData.data)
            return
        }

        localStorage.clear()
    
        // const shuffledCards = newCards.sort(() => Math.random() - 0.5)
        // const selectedCards = shuffledCards.slice(0, 12)
    
        try {
            const response = await(fetch(API_URL))
            const data = await response.json()
    
            // Get card images and name
    
            localStorage.setItem(localKey, JSON.stringify(data))
    
            console.log(data.data)
            setCardData(data.data)
            console.log('Fetched from API today')
        } catch (error) {
            console.log('Error: ', error)
        }
      }
    
      fetchCardData()
  }, [])

  function shuffleCards(array) {
    return array.sort(() => Math.random() - 0.5)
  }

  function updateCards() {
    alert('Card was clicked')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-blue-700">
        <Header />
            <div className="p-10">
                <div className="flex flex-wrap justify-center gap-10">
                    {cardData.map((card) => {
                        return (
                            <CardComponent 
                                key={card.id}
                                id={card.id}
                                name={card.name}
                                url={card.card_images[0].image_url_cropped}
                                updateCards={updateCards}
                            />
                        )
                    })}
                </div>
            </div>
    </div>
  )
}
