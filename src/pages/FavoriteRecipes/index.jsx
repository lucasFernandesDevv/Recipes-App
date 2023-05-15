import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterButtons from '../../components/FilterButtons';
import FavoriteRecipeCard from '../../components/FavoriteRecipeCard';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')),
  );

  return (
    <>
      <Header title="Favorite Recipes" />
      <FilterButtons />
      {favoriteRecipes.map(
        ({ name, nationality, category, type, id, image }, i) => (
          <FavoriteRecipeCard
            key={ name }
            name={ name }
            nationality={ nationality }
            category={ category }
            type={ type }
            index={ i }
            id={ id }
            image={ image }
            handleUnfavorite={ setFavoriteRecipes }
          />
        ),
      )}
      <Footer />
    </>
  );
}

export default FavoriteRecipes;
