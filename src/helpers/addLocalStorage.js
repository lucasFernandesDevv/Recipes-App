export function addRecipeInLocalStorage(key, location, recipe) {
  // const DATA = new Date();

  const recipeToLS = {
    id: recipe.idMeal || recipe.idDrink,
    type: location.pathname.includes('meals') ? 'meals' : 'drinks',
    nationality: location.pathname.includes('meals') ? recipe.strArea : '',
    category: location.pathname.includes('meals') ? recipe.strCategory : '',
    alcoholicOrNot: location.pathname.includes('meals') ? '' : recipe.strAlcoholic,
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
    // doneDate: `${DATA.getDate()}/${DATA.getMonth() + 1}/${DATA.getFullYear()}`,
    doneDate: new Date(),
    tags: recipe.strTags,
  };

  const getLS = JSON.parse(localStorage.getItem(key)) || [];
  if (!getLS.some(({ id }) => id === recipeToLS.id)) {
    localStorage.setItem(key, JSON.stringify([...getLS, recipeToLS]));
  }
}

export function addFavoriteRecipeInLocalStorage(key, location, recipe) {
  const recipeToLS = {
    id: recipe.idMeal || recipe.idDrink,
    type: location.pathname.includes('meals') ? 'meal' : 'drink',
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
  };

  const getLS = JSON.parse(localStorage.getItem(key)) || [];
  if (!getLS.some(({ id }) => id === recipeToLS.id)) {
    localStorage.setItem(key, JSON.stringify([...getLS, recipeToLS]));
  }
}

export function addLocalStorageInProgressRecipes(key, location, id) {
  const getLS = JSON.parse(localStorage.getItem(key));
  const type = location.pathname.includes('meals') ? 'meals' : 'drinks';
  let newLS = { };
  if (getLS && getLS[type]) {
    newLS = {
      ...getLS,
      [type]: {
        ...getLS[type],
        [id]: [],
      },
    };
  } else {
    newLS = {
      ...getLS,
      [type]: {
        [id]: [],
      },
    };
  }
  localStorage.setItem(key, JSON.stringify(newLS));
}
