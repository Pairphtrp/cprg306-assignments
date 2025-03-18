"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <div className="mt-4">
      <div className="flex gap-2 mb-4 items-center">
        <span className="text-white">Sort by:</span>
        <button
          className={`px-4 py-2 rounded ${sortBy === "name" ? "bg-orange-500" : "bg-gray-700"}`}
          onClick={() => setSortBy("name")}
        >
          Name
        </button>
        <button
          className={`px-4 py-2 rounded ${sortBy === "category" ? "bg-orange-500" : "bg-gray-700"}`}
          onClick={() => setSortBy("category")}
        >
          Category
        </button>
      </div>
      <ul className="space-y-3">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            onSelect={onItemSelect}
          />
        ))}
      </ul>
    </div>
  );
}