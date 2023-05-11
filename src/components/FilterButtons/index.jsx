import PropTypes from 'prop-types';
import React from 'react';

export function FilterButtons({ setFilteredDoneRecipes }) {
  const buttonName = ['Meals', 'Drinks'];

  function handleFilter(filter) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const filteredRecipes = doneRecipes.filter(({ recipeType }) => recipeType === filter);
    setFilteredDoneRecipes(filteredRecipes);
  }

  return (
    <div>
      {buttonName.map((name) => (
        <button
          key={ `${name}-filter` }
          id={ name.toLocaleLowerCase() }
          onClick={ ({ target }) => handleFilter(target.id) }
        >
          {name}
        </button>
      ))}
      <button onClick={ () => setFilteredDoneRecipes([]) }>All</button>
    </div>
  );
}

FilterButtons.propTypes = {
  setFilteredDoneRecipes: PropTypes.func.isRequired,
};
