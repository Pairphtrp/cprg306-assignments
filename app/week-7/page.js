"use client";
import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [idCounter, setIdCounter] = useState(itemsData.length + 1);

  const handleAddItem = (newItem) => {
    newItem.id = idCounter.toString();
    setItems([...items, newItem]);
    setIdCounter(idCounter + 1);
  };

  return (
    <main className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <NewItem onAddItem={handleAddItem} />
      </div>
      <div className="mt-6">
        <ItemList items={items} />
      </div>
    </main>
  );
}