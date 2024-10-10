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
  
  const [cards, setCards] = useState([])

  useEffect(() => {
    function addCards() {
        const tempPhoto = 'https://images.unsplash.com/photo-1728233363803-88a1226bf91d?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        const newCards = []
        for (let i = 1; i <= 20 ; i ++) {
            newCards.push({ id: i, name: `Card ${i}`, url: tempPhoto})
        }

        const shuffledCards = newCards.sort(() => Math.random() - 0.5)
        const selectedCards = shuffledCards.slice(0, 12)
    
        setCards(selectedCards)
      }

      
      
      addCards();
  }, [])
  

//   async function fetchCardData() {
//     try {
//         const response = await(fetch('google.ca'))
//         const data = await response.json()
//         console.log(data)
//         return data
//     } catch (error) {
//         console.log('Error: ', error)
//     }
//   }

//   fetchCardData()

  function updateCards() {
    alert('Card was clicked')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-blue-700">
        <Header />
            <div className="p-10">
                <div className="flex flex-wrap justify-center gap-10">
                    {cards.map((card) => {
                        return (
                            <CardComponent 
                                key={card.id}
                                id={card.id}
                                name={card.name}
                                url={card.url}
                                updateCards={updateCards}
                            />
                        )
                    })}
                </div>
            </div>
    </div>
  )
}
