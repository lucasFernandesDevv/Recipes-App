export const doneRecipes = (recipe, location) => {
  const dataAtual = new Date();
  const dia = dataAtual.getDate().toString().padStart(2, '0');
  const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
  const ano = dataAtual.getFullYear().toString();
  const dataFormatada = `${dia}/${mes}/${ano}`;
  const params = {
    id: location.pathname.includes('meals') ? recipe.idMeal : recipe.idDrink,
    type: location.pathname.includes('meals') ? 'meal' : 'drink',
    nationality: location.pathname.includes('meals') ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: location.pathname.includes('meals') ? '' : recipe.strAlcoholic,
    name: location.pathname.includes('meals') ? recipe.strMeal : recipe.strDrink,
    image: location.pathname.includes('meals') ? recipe.strMealThumb
      : recipe.strDrinkThumb,
    doneDate: dataFormatada,
    tags: location.pathname.includes('meals') ? [recipe.strTags] || [] : [],
  };
  const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const newDone = [...getDoneRecipes, params];
  localStorage.setItem('doneRecipes', JSON.stringify(newDone));
};

// const params = {
//   id: location.pathname.includes('meals') ? 'idMeal' : 'idDrink',
//   type: location.pathname.includes('meals') ? 'meals' : 'drinks',
//   nationality: location.pathname.includes('meals') ? 'strArea' : '',
//   category: location.pathname.includes('meals') ? 'strCategory' : 'strAlcoholic',
//   alcoholicOrNot: location.pathname.includes('meals') ? '' : 'strAlcoholic',
//   name: location.pathname.includes('meals') ? 'strMeal' : 'strDrink',
//   img: location.pathname.includes('meals') ? 'strMealThumb' : 'strDrinkThumb',
//   doneDate: dataFormatada,
//   tags: location.pathname.includes('meals') ? 'strTags' : [],
// };

// const obj = [
//   {
//     id: '52771',
//     type: 'meal',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image:
//       'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image:
//       'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];
// localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
