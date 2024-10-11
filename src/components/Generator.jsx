import CardComponent from "./CardComponent"
import { useEffect, useState } from "react"

function Header({ score }) {
    return (
        <div className="flex items-center justify-between p-10 bg-slate-950 text-gray-50">
            <h1 className="text-3xl font-semibold sm:text-2xl">Memory Card Game</h1>
            <p>Score: {score}</p>
        </div>
    )
}

export default function Generator() {
  const [cardData, setCardData] = useState([])
  const [clickedCards, setClickedCards] = useState([])
  const [score, setScore] = useState(0)

  useEffect(() => {
    const archetypes = ["Drytron", "Voiceless Voice", "Herald"]
    const allCards = []

    async function fetchCardData(archetype) {
        // const today = (new Date()).toDateString()
        const API_URL = `https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${archetype}`
        
        const localKey = `YugiohCards-${archetype}`
    
        if (localStorage.getItem(localKey)) {
            const storedData = JSON.parse(localStorage.getItem(localKey))
            allCards.push(...storedData.data)
            console.log('Fetched card data from cache', storedData.data)
            return
        }
    
        try {
            const response = await(fetch(API_URL))
            const data = await response.json()

            if (data.data) {
                allCards.push(...data.data)
            }

            localStorage.setItem(localKey, JSON.stringify(data))
            console.log('Fetched from API today', data.data)
            
        } catch (error) {
            console.log('Error fetching cards: ', error)
        }
      }
      
      const fetchPromises = archetypes.map((archetype) => {
        fetchCardData(archetype)
      })

      Promise.all(fetchPromises).then(() => {
        const shuffledCards = shuffleAndSelect(allCards, 12)
        setCardData(shuffledCards)
      })
  }, [])

  function shuffleAndSelect(array, count) {
    const shuffled = [...array];
    const selected = new Set();

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    while (selected.size < count) {
        const randomIndex = Math.floor(Math.random() * shuffled.length);
        selected.add(shuffled[randomIndex]);
    }

    return Array.from(selected);
  }

  function updateCards(cardId) {
    if (clickedCards.includes(cardId)) {
        setClickedCards([])
        setScore(0)
    } else {
        setClickedCards([...clickedCards, cardId])
        setScore(score + 1)
    }

    const shuffledCards = shuffleAndSelect(cardData, 12)
    setCardData(shuffledCards);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-blue-700">
        <Header 
            score={score}
        />
            <div className="p-10 flex-grow">
                <div className="overflow-y-auto flex flex-wrap justify-center gap-10">
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
