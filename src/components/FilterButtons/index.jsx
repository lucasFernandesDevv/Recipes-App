import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function FilterButtons({
  setFilteredDoneRecipes = () => {},
  setFilteredFavoriteRecipes = () => {},
}) {
  const buttonName = ['Meals', 'Drinks'];
  const {
    location: { pathname },
  } = useHistory();

  function handleFilter(filter) {
    if (pathname === '/done-recipes') {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const filteredRecipes = doneRecipes.filter(({ type }) => type === filter);
      setFilteredDoneRecipes(filteredRecipes);
    } else {
      const favoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );
      const filteredRecipes = favoriteRecipes.filter(
        ({ type }) => type === filter,
      );
      setFilteredFavoriteRecipes(filteredRecipes);
    }
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
        onClick={ () => {
          if (pathname === '/done-recipes') {
            setFilteredDoneRecipes([]);
          } else {
            setFilteredFavoriteRecipes([]);
          }
        } }
      >
        All
      </button>
    </div>
  );
}

FilterButtons.propTypes = {
  setFilteredDoneRecipes: PropTypes.func,
  setFilteredFavoriteRecipes: PropTypes.func,
};
