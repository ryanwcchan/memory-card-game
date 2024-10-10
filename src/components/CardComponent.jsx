export default function CardComponent({ id, name, url, updateCards }) {
  return (
    <div onClick={() => updateCards()} 
      className="w-72 h-80 flex flex-col p-6 justify-center items-center 
      bg-slate-950 rounded-lg hover:shadow-[0_0_15px_5px_rgba(0,191,255,0.7)] 
      duration-200">
        <div className="w-full h-64 overflow-hidden">
            <img className="w-full h-full object-cover" 
                src={url}
                alt="image of an owl" />
        </div>
        <h1 className="w-full text-center text-blue-400 pt-4 
        font-semibold break-words whitespace-normal 
        h-20">{name}</h1>
    </div>
  )
}