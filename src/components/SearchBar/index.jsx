import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const firstLetter = 'first-letter';

function SearchBar() {
  const [search, setSearch] = useState('ingredient');
  const { fetchData } = useFetch();
  const [filter, setFilter] = useState();
  const handleSearch = ({ target }) => {
    const { name, value } = target;
    if (name === 'search') {
      setSearch(value);
    } else {
      setFilter(value);
    }
  };

  const { location } = useHistory();

  const handleMeals = async () => {
    let results = '';
    if (search === firstLetter && filter.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    if (search === 'ingredient') {
      results = await fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter}`);
    } else if (search === firstLetter) {
      results = await fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${filter}`);
    } else {
      results = await fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${filter}`);
    }
    return results;
  };

  const handleDrinks = async () => {
    let results = '';
    if (search === firstLetter && filter.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    if (search === 'ingredient') {
      results = await fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter}`);
    } else if (search === firstLetter) {
      results = await fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filter}`);
    } else {
      results = await fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter}`);
    }
    return results;
  };

  const handleFetchData = async () => {
    const { pathname } = location;
    let results = '';
    if (pathname === '/meals') {
      results = await handleMeals();
    } if (pathname === '/drinks') {
      results = await handleDrinks();
    }
    console.log(results);
  };

  return (
    <div onChange={ handleSearch }>
      <input
        className="border-2 border-violet-300 outline-none placeholder-violet-300
              ml-2 w-64 p-2"
        type="text"
        data-testid="search-input"
        value={ filter }
        name="filter"
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

export default SearchBar;
