"use client";
import React from "react";

const Item = ({ name, quantity, category }) => {
  return (
    <li className="border p-3 rounded-lg shadow-sm bg-white flex justify-between items-start">
    <div>
      <span className="font-semibold text-green-600 block">{name}</span>
      <span className="text-gray-600"> buy {quantity} in {category}</span>
    </div>
    
  </li>
);
};
export default Item;



