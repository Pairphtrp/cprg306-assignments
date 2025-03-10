"use client";
import { useState } from "react";
import Item from "./item";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <div className="mt-4">
      <div className="flex gap-2 mb-4">
        <span>Sort by:</span>
        <button
          className={`px-4 py-2 text-white rounded ${sortBy === "name" ? "bg-orange-500" : "bg-gray-700"}`}
          onClick={() => setSortBy("name")}
        >
          Name
        </button>
        <button
          className={`px-4 py-2 text-white rounded ${sortBy === "category" ? "bg-orange-500" : "bg-gray-700"}`}
          onClick={() => setSortBy("category")}
        >
          Category
        </button>
      </div>
      <ul className="space-y-4">
        {sortedItems.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}
