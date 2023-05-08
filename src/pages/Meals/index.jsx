import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Recipes from '../../components/Recipes';

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // fetch the recipe from the API
    const maxMeals = 12;
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((data) => setMeals(data.meals.map((meal, i) => i < maxMeals && meal)));
  }, []);

  return (
    <div>
      <Header title="Meals" />
      <Recipes recipes={ meals } />
    </div>
  );
}
