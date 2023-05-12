import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function RecipesInProgress() {
  return (
    <>
      <Header />
      <main>
        <img
          data-testid="recipe-photo"
          src=""
          alt=""
        />
        <h2
          data-testid="recipe-title"
        >
          Recipes title
        </h2>
        <button
          data-testid="share-btn"
        >
          Share
        </button>
        <button
          data-testid="favorite-btn"
        >
          Favorite
        </button>
        <h3
          data-testid="recipe-category"
        >
          category
        </h3>
        <h3
          data-testid="instructions"
        >
          instructions
        </h3>
        <button
          data-testid="finish-recipe-btn"
        >
          Finish Recipe
        </button>
      </main>
      <Footer />
    </>
  );
}

export default RecipesInProgress;
