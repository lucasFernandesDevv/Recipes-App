function addLocalStorage(location, recipe) {
  const DATA = new Date();

  const doneRecipes = {
    id: recipe.idMeal || recipe.idDrink,
    type: location.pathname.includes('meals') ? 'meals' : 'drinks',
    nationality: location.pathname.includes('meals') ? recipe.strArea : '',
    category: location.pathname.includes('meals') ? recipe.strCategory : '',
    alcoholicOrNot: location.pathname.includes('meals') ? '' : recipe.strAlcoholic,
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
    doneDate: `${DATA.getDate()}/${DATA.getMonth() + 1}/${DATA.getFullYear()}`,
    tags: recipe.strTags,
  };

  const getLocal = JSON.parse(localStorage.getItem('doneRecipes'));

  localStorage.setItem('doneRecipes', JSON.stringify([...getLocal, doneRecipes]));
}

export default addLocalStorage;
