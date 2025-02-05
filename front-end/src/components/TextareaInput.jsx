import { MdDescription } from "react-icons/md";

const TextareaInput = ({ name, label, value, onChange, placeholder }) => {
  return (
    <div className="space-y-2">
      <label className="block text-lg font-medium text-gray-700 mb-3">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-start pt-3 pointer-events-none">
          <MdDescription className="h-6 w-6 text-pink-400 group-focus-within:text-pink-500 transition-colors duration-200" />
        </div>
        <textarea
          name={name}
          onChange={onChange}
          required
          rows={5}
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
          focus:ring-2 focus:ring-pink-100 focus:border-pink-400
          hover:border-pink-300 outline-none transition-all duration-200
          placeholder:text-gray-400 text-gray-700 resize-y min-h-[120px]"
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
};

export default TextareaInput;
