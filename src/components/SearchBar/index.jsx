import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useFetch from '../../hooks/useFetch';
import { saveDrinks, saveMeals } from '../../redux/actions';

const firstLetter = 'first-letter';

function SearchBar({ dispatch }) {
  const [search, setSearch] = useState('ingredient');
  const { fetchData } = useFetch();
  const [filter, setFilter] = useState('');
  const handleSearch = ({ target }) => {
    const { name, value } = target;
    if (name === 'search') {
      setSearch(value);
    } else {
      setFilter(value);
    }
  };
  const { location } = useHistory();
  const history = useHistory();

  const handleMeals = async () => {
    let results = '';
    if (search === 'ingredient') {
      results = await fetchData(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter}`,
      );
    } else if (search === 'first-letter') {
      results = await fetchData(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${filter}`,
      );
    } else {
      results = await fetchData(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${filter}`,
      );
    }
    if (!results.meals) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    return results.meals;
  };

  const handleDrinks = async () => {
    let results = '';
    if (search === 'ingredient') {
      results = await fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter}`);
    } else if (search === firstLetter) {
      results = await fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filter}`);
    } else {
      results = await fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter}`);
    }
    if (!results.drinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    return results.drinks;
  };

  const handleFetchData = async () => {
    const { pathname } = location;
    if (search === firstLetter && filter.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    if (pathname === '/meals') {
      const filteredRecipes = await handleMeals();
      if (!filteredRecipes) {
        return;
      }
      if (filteredRecipes.length === 1) {
        const id = filteredRecipes[0].idMeal;
        history.push(`${pathname}/${id}`);
      }
      dispatch(saveMeals(filteredRecipes));
    } if (pathname === '/drinks') {
      const filteredRecipes = await handleDrinks();
      if (!filteredRecipes) {
        return;
      }
      if (filteredRecipes.length === 1) {
        const id = filteredRecipes[0].idDrink;
        history.push(`${pathname}/${id}`);
      }
      dispatch(saveDrinks(filteredRecipes));
    }
  };

  return (
    <div
      onChange={ handleSearch }
      className="flex flex-col items-center gap-3 w-5/6"
    >
      <input
        className="border border-zinc-400
        w-full outline-none
        placeholder-zinc-300 ml-2 p-2"
        type="text"
        data-testid="search-input"
        value={ filter }
        name="filter"
        placeholder="Search"
      />
      <div
        className="flex flex-col gap-3
        w-full py-2 px-3 items-center
        justify-center ml-2 bg-violet-900
        rounded-md
      "
      >
        <div className="flex gap-5 text-white text-xs">
          <label className="flex items-center gap-1 justify-center">
            <input
              defaultChecked
              type="radio"
              name="search"
              data-testid="ingredient-search-radio"
              value="ingredient"
              className="accent-yellow-400"
              onChange={ handleSearch }
            />
            Ingredient
          </label>
          <label>
            <input
              type="radio"
              name="search"
              data-testid="name-search-radio"
              value="name"
              className="accent-yellow-400"
              onChange={ handleSearch }
            />
            {' '}
            Name
          </label>
          <label>
            <input
              type="radio"
              name="search"
              data-testid="first-letter-search-radio"
              value="first-letter"
              className="accent-yellow-400"
              onChange={ handleSearch }
            />
            {' '}
            First letter
          </label>
        </div>
        <button
          data-testid="exec-search-btn"
          className="w-64 ml-2 bg-yellow-400 rounded-md text-white font-extrabold p-2
          disabled:bg-zinc-400"
          onClick={ handleFetchData }
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SearchBar);
