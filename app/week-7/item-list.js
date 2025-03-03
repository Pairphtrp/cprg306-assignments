"use client";
import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");
  const [grouped, setGrouped] = useState(false);

  const sortedItems = [...itemsData].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  const groupedItems = sortedItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 border ${sortBy === "name" ? "bg-blue-500" : "bg-gray-900"}`}
          onClick={() => {
            setSortBy("name");
            setGrouped(false);
          }}
        >
          Sort by Name
        </button>
        <button
          className={`mr-2 px-4 py-2 border ${sortBy === "category" ? "bg-blue-500" : "bg-gray-900"}`}
          onClick={() => {
            setSortBy("category");
            setGrouped(false);
          }}
        >
          Sort by Category
        </button>
        <button
          className={`px-4 py-2 border ${grouped ? "bg-blue-500" : "bg-gray-900"}`}
          onClick={() => setGrouped(true)}
        >
          Group by Category
        </button>
      </div>
      <ul>
        {grouped
          ? Object.keys(groupedItems).map((category) => (
              <div key={category}>
                <h2 className="text-lg font-semibold capitalize mt-4 text-black">{category}</h2>
                {groupedItems[category].map((item) => (
                  <Item key={item.id} {...item} />
                ))}
              </div>
            ))
          : sortedItems.map((item) => <Item key={item.id} {...item} />)}
      </ul>
    </div>
  );
}
