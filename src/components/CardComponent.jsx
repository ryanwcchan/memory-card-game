export default function CardComponent({ id, name, url, updateCards }) {
  return (
    <div onClick={() => updateCards()} className="flex flex-col p-6 justify-center items-center bg-slate-950 rounded-lg">
        <div className="w-64 h-64 overflow-hidden">
            <img className="w-full h-full object-cover" 
                src={url}
                alt="image of an owl" />
        </div>
        <h1 className="flex flex-wrap text-blue-400 pt-2 font-semibold break-words">{name}</h1>
    </div>
  )
}