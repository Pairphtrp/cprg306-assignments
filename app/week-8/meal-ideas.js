// meal-ideas.js
"use client";

import { useState, useEffect } from "react";

// Fetch meal ideas list
async function fetchMealIdeas(ingredient) {
  if (!ingredient) return [];
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

// Fetch meal details (ingredients and instructions)
async function fetchMealDetails(mealId) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error("Error fetching meal details:", error);
    return null;
  }
}

// MealIdeas Component
export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  async function loadMealIdeas() {
    const ideas = await fetchMealIdeas(ingredient);
    setMeals(ideas);
    setSelectedMeal(null);
  }

  async function handleMealClick(mealId) {
    const details = await fetchMealDetails(mealId);
    setSelectedMeal(details);
  }

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Meal Ideas</h2>
      {ingredient && <p className="mb-2">Here are some meal ideas using <strong>{ingredient}</strong>:</p>}
      <ul className="divide-y divide-gray-700 mb-4">
        {meals.map((meal) => (
          <li
            key={meal.idMeal}
            className="py-2 hover:bg-gray-700 px-2 rounded cursor-pointer"
            onClick={() => handleMealClick(meal.idMeal)}
          >
            {meal.strMeal}
          </li>
        ))}
        {meals.length === 0 && (
          <li className="py-2 text-gray-400">No meal ideas found for "{ingredient}"</li>
        )}
      </ul>
      {selectedMeal && (
        <div className="bg-gray-700 p-4 rounded mt-4">
          <h3 className="text-lg font-bold mb-2">{selectedMeal.strMeal} Ingredients:</h3>
          <ul className="list-disc pl-5">
            {Array.from({ length: 20 }, (_, i) => i + 1)
              .map((num) => ({
                ingredient: selectedMeal[`strIngredient${num}`],
                measure: selectedMeal[`strMeasure${num}`],
              }))
              .filter((item) => item.ingredient && item.ingredient.trim() !== "")
              .map((item, index) => (
                <li key={index}>{item.ingredient} - {item.measure}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}