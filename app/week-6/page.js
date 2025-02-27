import React from "react";
import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4 text-green-600">Shopping List</h1>
      <ItemList />
    </main>
  );
}
