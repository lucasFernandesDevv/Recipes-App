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
        {(hasAnyFilter ? filteredDoneRecipes : doneRecipes)?.map((item, i) => (
          <DoneRecipeCard
            index={ i }
            key={ item.id }
            name={ item.name }
            doneDate={ item.doneDate }
            tags={ item.tags }
            nationality={ item.nationality }
            category={ item.category }
            alcoholicOrNot={ item.alcoholicOrNot }
            type={ item.type }
            id={ item.id }
            image={ item.image }
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default DoneRecipes;
