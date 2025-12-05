

const colors = [
  "bg-teal-500", "bg-purple-500", "bg-orange-500", "bg-cyan-500", "bg-yellow-500", "bg-green-500",
  "bg-sky-500", "bg-blue-500", "bg-violet-500", "bg-fuchsia-500", "bg-red-500", "bg-gray-500"
];

export default function ColorSelector({ selectedColor, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => {
        const isSelected = selectedColor === color;

        return (
          <div
            
            key={color}
            className={`w-10 h-10 rounded-full cursor-pointer border-4 transition-all
              ${color} 
              ${isSelected ? "ring-1 ring-black" : "border-transparent"}
            `}
            onClick={() => onChange(color)}
            title={color}
          >
            
          </div>
        );
      })}
    </div>
  );
}
