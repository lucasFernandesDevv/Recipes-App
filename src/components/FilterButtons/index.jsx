import PropTypes from "prop-types"
import React from 'react';

export function FilterButtons({ setFilteredDoneRecipes }) {
  const buttonName = ['Meals', 'Drinks', 'All'];

  function handleFilter(filter) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const filteredRecipes = doneRecipes.filter(({ type }) => type === filter);
    setFilteredDoneRecipes(filteredRecipes);
  }

  return (
    <div>
      {buttonName.map((name, index) => (
        <button
          key={ `${index}-${name}` }
          data-testid={ `${name}-filter` }
          id={ name }
          onClick={ ({ target }) => handleFilter(target.id) }
        >
          {name}
        </button>
      ))}
    </div>
  );
}

FilterButtons.propTypes = {
  setFilteredDoneRecipes: PropTypes.func,
};
