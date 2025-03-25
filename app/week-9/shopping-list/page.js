"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [idCounter, setIdCounter] = useState(itemsData.length + 1);
  const [selectedItemName, setSelectedItemName] = useState("");

  function handleAddItem(newItem) {
    newItem.id = idCounter.toString();
    setItems([...items, newItem]);
    setIdCounter(idCounter + 1);
  }

  function handleItemSelect(item) {
    const cleanedName = item.name
      .split(",")[0]
      .replace(/[^\p{L}\p{N}\s]/gu, "")
      .trim();
    setSelectedItemName(cleanedName);
  }

  return (
    <main className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Shopping List</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-6">
          <div className="bg-gray-900 p-6 rounded-xl shadow-xl">
            <NewItem onAddItem={handleAddItem} />
          </div>
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="flex-1 bg-gray-800 p-6 rounded-xl shadow-xl">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
