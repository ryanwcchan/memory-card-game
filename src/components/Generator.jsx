import CardComponent from "./CardComponent"
import { useState } from "react"

function Header() {
    return (
        <div className="flex items-center justify-between p-10 bg-slate-950 text-gray-50">
            <h1 className="text-3xl font-semibold sm:text-2xl">Memory Card Game</h1>
            <p>Score</p>
        </div>
    )
}

export default function Generator() {
  const tempPhoto = 'https://images.unsplash.com/photo-1728233363803-88a1226bf91d?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  const [cards, setCards] = useState([
    { id: 1, name: "Card 1", url: tempPhoto },
    { id: 2, name: "Card 2", url: tempPhoto },
    { id: 3, name: "Card 3", url: tempPhoto },
    { id: 4, name: "Card 4", url: tempPhoto },
    { id: 5, name: "Card 5", url: tempPhoto },
    { id: 6, name: "Card 6", url: tempPhoto },
    { id: 7, name: "Card 7", url: tempPhoto },
    { id: 8, name: "Card 8", url: tempPhoto },
    { id: 9, name: "Card 9", url: tempPhoto }
  ])

  const fetchData = (url) => {
    new Promise((resolve, reject) => {
        
    })
  }

  function updateCards() {

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
                                name={card.name}
                                url={card.url}
                            />
                        )
                    })}
                </div>
            </div>
    </div>
  )
}
