"use client";

export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li
      className="border border-gray-600 p-3 rounded-md cursor-pointer hover:bg-gray-700"
      onClick={() => onSelect({ name, quantity, category })}
    >
      <div className="font-semibold text-lg">{name}</div>
      <div className="text-sm text-gray-300">Buy {quantity} in {category}</div>
    </li>
  );
}