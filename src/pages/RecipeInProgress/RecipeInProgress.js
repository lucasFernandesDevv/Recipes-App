import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useFetch from '../../hooks/useFetch';

const URL_API_MEALS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const URL_API_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

window.addEventListener('beforeunload', () => {
  // localStorage.clear(); COMENTADO POR RESETAR LOCALSTORAGE DA APLICAÇÃO INTEIRA
  // FAZENDO NÃO FUNCIONAR OUTAS PÁGINAS, FAVOR REFATORAR (Ass, Gabriel Rodrigues)
});

function RecipeInProgress() {
  const location = useLocation();
  const { id } = useParams();
  const { fetchData } = useFetch();
  const [infos, setInfos] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const params = {
    type: location.pathname.includes('meals') ? 'meals' : 'drinks',
  };
  useEffect(() => {
    let result = [];
    const handleFetchData = async () => {
      if (location.pathname === `/meals/${id}/in-progress`) {
        result = await fetchData(`${URL_API_MEALS}${id}`);
        setInfos({
          ...infos,
          imgLink: result.meals[0].strMealThumb,
          title: result.meals[0].strMeal,
          category: result.meals[0].strCategory,
          instructions: result.meals[0].strinstructions,
        });
      } else {
        result = await fetchData(`${URL_API_DRINKS}${id}`);
        console.log(result);
        setInfos({
          ...infos,
          imgLink: result.drinks[0].strDrinkThumb,
          title: result.drinks[0].strDrink,
          category: result.drinks[0].strAlcoholic,
          instructions: result.drinks[0].strInstructions,
        });
      }
      const keys = Object.keys(result[params.type][0]);
      const ingredientsAll = keys.filter((key) => key.includes('strIngredient'));
      const ingredientsList = [];
      ingredientsAll.forEach((ingredient) => {
        if (result[params.type][0][ingredient] !== ''
          && result[params.type][0][ingredient] !== null) {
          ingredientsList.push({
            ingredient: result[params.type][0][ingredient],
          });
        }
        setIngredients(ingredientsList);
      });
    };
    handleFetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header title="Recipes in Progress" />
      <main>
        <img
          className="max-h-40 max-w-40"
          data-testid="recipe-photo"
          src={ infos.imgLink }
          alt={ infos.title }
        />
        <h2
          data-testid="recipe-title"
        >
          { infos.title }
        </h2>
        <button
          data-testid="share-btn"
        >
          Share
        </button>
        <button
          data-testid="favorite-btn"
        >
          Favorite
        </button>
        <h3
          data-testid="recipe-category"
        >
          {infos.category}
        </h3>
        <h3
          data-testid="instructions"
        >
          {infos.instructions}
        </h3>
        {
          ingredients.map((map, index) => (
            <label key={ index } data-testid={ `${index}-ingredient-step` }>
              {`${map.ingredient}`}
              <input type="checkbox" />
            </label>
          ))
        }
        <button
          data-testid="finish-recipe-btn"
        >
          Finish Recipe
        </button>
      </main>
      <Footer />
    </>
  );
}
export default RecipeInProgress;
