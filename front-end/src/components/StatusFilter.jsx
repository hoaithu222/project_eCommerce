import { statusOptions } from "../utils/statusOptions";

export default function StatusFilter({ selected, onSelect, statusCounts }) {
  const getCount = (key) => {
    if (key === "all") {
      return Object.values(statusCounts).reduce((a, b) => a + b, 0);
    }
    return statusCounts[key] || 0;
  };

  return (
    <div className="px-3 shadow-lg rounded-md flex justify-between overflow-x-auto ">
      {statusOptions.map(({ key, label, color, icon: Icon }) => (
        <button
          key={key}
          className={`flex p-2 items-center cursor-pointer border-b-4 transition-all min-w-fit
          ${color} 
          ${selected === key ? "font-bold border-sky-200" : ""}
          hover:bg-gray-50`}
          onClick={() => onSelect(key)}
        >
          <Icon className="text-xl font-semibold" />
          <span
            className={`p-2 text-sm lg:text-lg whitespace-nowrap flex items-center gap-1
            ${selected === key ? "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent" : ""}`}
          >
            {label}
            <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded-full text-sm">
              {getCount(key)}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
