function Header() {
    return (
        <div className="flex items-center justify-center py-10 bg-slate-950 text-red-400">
            <h1 className="text-3xl font-semibold sm:text-2xl">Memory Card Game</h1>
        </div>
    )
}

export default function Generator() {
  return (
    <div>
        <Header />
    </div>
  )
}
