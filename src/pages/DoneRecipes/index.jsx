import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { DoneRecipeCard } from '../../components/DoneRecipeCard';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <>
      <Header title="Done Recipes" />
      {doneRecipes.map(
        ({ name, doneDate, tags, nationality, category, isAlcoholic }, i) => (
          <DoneRecipeCard
            key={ name }
            doneDate={ doneDate }
            tags={ tags }
            nationality={ nationality }
            category={ category }
            isAlcoholic={ isAlcoholic }
          />
        ),
      )}
      <Footer />
    </>
  );
}

export default DoneRecipes;
