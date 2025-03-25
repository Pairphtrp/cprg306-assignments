"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState(itemsData);
  const [idCounter, setIdCounter] = useState(itemsData.length + 1);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Add a slight delay to simulate checking
    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user]);

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

  if (checkingAuth) {
    return (
      <main className="p-6 bg-black text-white min-h-screen flex items-center justify-center">
        <h2 className="text-2xl">Checking authentication...</h2>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="p-6 bg-black text-white min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl mb-4">You must be logged in to view this page.</h2>
        <button
          onClick={() => router.push("/week-9")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
        >
          Go to Login Page
        </button>
      </main>
    );
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
      <div className="mt-6">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded"
          onClick={firebaseSignOut}
        >
          Logout
        </button>
      </div>
    </main>
  );
}
