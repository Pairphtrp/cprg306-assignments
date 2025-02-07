"use client";

import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  // Function to increase quantity (max 20)
  const increment = () => {
    if (quantity < 20) {
      setQuantity((prev) => prev + 1);
    }
  };

  // Function to decrease quantity (min 1)
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-blue-200 shadow-md rounded-lg p-6 w-80 text-center">
      <h2 className="text-lg font-semibold mb-4"></h2>
      <div className="flex items-center justify-center space-x-4">
        <button
          className="px-4 py-2 bg-gray-500 rounded-lg disabled:opacity-50"
          onClick={decrement}
          disabled={quantity === 1}
        >
          -
        </button>
        <span className="text-xl font-bold text-gray-800 ">{quantity}</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          onClick={increment}
          disabled={quantity === 20}
        >
          +
        </button>
      </div>
    </div>
  );
}
