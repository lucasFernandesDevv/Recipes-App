import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { DoneRecipeCard } from '../../components/DoneRecipeCard';
import { FilterButtons } from '../../components/FilterButtons';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);

  const hasAnyFilter = filteredDoneRecipes.length > 0;

  return (
    <>
      <Header title="Done Recipes" />
      <FilterButtons setFilteredDoneRecipes={ setFilteredDoneRecipes } />
      <div>
        {(hasAnyFilter ? filteredDoneRecipes : doneRecipes).map(
          (
            {
              name,
              doneDate,
              tags,
              nationality,
              category,
              alcoholicOrNot,
              type,
              id,
              img,
            },
            i,
          ) => (
            <DoneRecipeCard
              key={ name }
              name={ name }
              doneDate={ doneDate }
              tags={ tags }
              nationality={ nationality }
              category={ category }
              isAlcoholic={ alcoholicOrNot }
              recipeType={ type }
              index={ i }
              id={ id }
              recipeImg={ img }
            />
          ),
        )}
      </div>
      <Footer />
    </>
  );
}

export default DoneRecipes;
