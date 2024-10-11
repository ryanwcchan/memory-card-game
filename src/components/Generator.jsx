import CardComponent from "./CardComponent"
import { useEffect, useState } from "react"

function Header({ score }) {
    return (
        <div className="flex items-center justify-between p-10 bg-slate-950 text-gray-50">
            <div className="flex flex-col gap-2 text-gray-200">
                <h1 className="text-3xl font-semibold sm:text-2xl">Yugioh Memory Game</h1>
                <p className="text-sm">Get points for clicking on an image, but don't click the same one more than once.</p>
            </div>
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
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count); // Return the first `count` shuffled cards
  }

  function updateCards(cardId) {
    if (clickedCards.includes(cardId)) {
        setClickedCards([])
        setScore(0)
    } else {
        setClickedCards([...clickedCards, cardId])
        setScore(score + 1)
    }

    let newCards = shuffleAndSelect(cardData, 12);

    let hasUnclickedCard = newCards.filter(card => !clickedCards.includes(card.id));

    while (hasUnclickedCard.length === 0) {
        newCards = shuffleAndSelect(cardData, 12);
        hasUnclickedCard = newCards.filter(card => !clickedCards.includes(card.id));
    }

    setCardData(newCards);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-blue-700">
        <Header 
            score={score}
        />
            <div className="p-10 flex-grow">
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
