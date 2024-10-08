export default function CardComponent({ key, name, url }) {
  return (
    <div className="flex flex-col p-6 justify-center items-center bg-slate-950 rounded-lg">
        <div className="w-64 h-64 overflow-hidden">
            <img className="w-full h-full object-cover" 
                src={url}
                alt="image of an owl" />
        </div>
        <h1 className="text-gray-50 pt-2">{name}</h1>
    </div>
  )
}