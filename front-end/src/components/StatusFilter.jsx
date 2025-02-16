import { statusOptions } from "../utils/statusOptions";

export default function StatusFilter({ selected, onSelect }) {
  return (
    <div className="px-5 shadow-lg rounded-md flex justify-between overflow-x-auto">
      {statusOptions.map(({ key, label, color, icon: Icon }) => (
        <button
          key={key}
          className={`flex p-2 items-center cursor-pointer border-b-4 border-transparent transition-all min-w-fit
          ${color} 
          ${selected === key ? "font-bold border-sky-200" : ""}
          hover:bg-gray-50`}
          onClick={() => onSelect(key)}
        >
          <Icon className="text-2xl font-semibold" />
          <span
            className={`p-2 text-sm lg:text-xl whitespace-nowrap
            ${selected === key ? "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent" : ""}`}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
