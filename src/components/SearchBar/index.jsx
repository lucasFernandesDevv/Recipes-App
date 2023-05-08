import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useFetch from '../../hooks/useFetch';
import { addRecipes } from '../../redux/actions';

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
      results = await fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter}`);
    } else if (search === firstLetter) {
      results = await fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${filter}`);
    } else {
      results = await fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${filter}`);
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
    let recipe = '';
    let id = '';
    if (pathname === '/meals') {
      recipe = await handleMeals();
      if (!recipe) {
        return;
      }
      id = recipe[0].idMeal;
    } if (pathname === '/drinks') {
      recipe = await handleDrinks();
      if (!recipe) {
        return;
      }
      id = recipe[0].idDrink;
    }
    dispatch(addRecipes(recipe));
    if (recipe && recipe.length === 1) history.push(`${pathname}/${id}`);
  };

  return (
    <div>
      <input
        className="border-2 border-violet-300 outline-none placeholder-violet-300
              ml-2 w-64 p-2"
        type="text"
        data-testid="search-input"
        value={ filter }
        name="filter"
        onChange={ handleSearch }
      />
      <label>
        Ingredient:
        {' '}
        <input
          defaultChecked
          type="radio"
          name="search"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ handleSearch }
        />
        {' '}
      </label>
      <label>
        Name :
        {' '}
        <input
          type="radio"
          name="search"
          data-testid="name-search-radio"
          value="name"
          onChange={ handleSearch }
        />
        {' '}
      </label>
      <label>
        First letter:
        {' '}
        <input
          type="radio"
          name="search"
          data-testid="first-letter-search-radio"
          value="first-letter"
          onChange={ handleSearch }
        />
        {' '}
      </label>
      <button
        data-testid="exec-search-btn"
        className="w-64 ml-2 bg-yellow-400 rounded-md text-white font-extrabold p-2
          disabled:bg-zinc-400"
        onClick={ handleFetchData }
      >
        Pesquisar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SearchBar);
