import PropTypes from 'prop-types';
import React from 'react';

export function FilterButtons({ setFilteredDoneRecipes }) {
  const buttonName = ['Meals', 'Drinks'];

  function handleFilter(filter) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const filteredRecipes = doneRecipes.filter(
      ({ type }) => type === filter,
    );
    setFilteredDoneRecipes(filteredRecipes);
  }

  const isMealButton = (name) => name === 'Meals';

  return (
    <div className="flex gap-4">
      {buttonName.map((name) => (
        <button
          key={ `${name}-filter` }
          className="bg-blue-500 border-blue-950"
          id={ isMealButton(name) ? 'meal' : 'drink' }
          onClick={ ({ target }) => handleFilter(target.id) }
          data-testid={
            isMealButton(name) ? 'filter-by-meal-btn' : 'filter-by-drink-btn'
          }
        >
          {' '}
          {name}
        </button>
      ))}
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setFilteredDoneRecipes([]) }
      >
        All
      </button>
    </div>
  );
}

FilterButtons.propTypes = {
  setFilteredDoneRecipes: PropTypes.func.isRequired,
};
