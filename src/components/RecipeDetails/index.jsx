import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';

const URL_API_MEALS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const URL_API_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export default function RecipeDetails() {
  const { fetchData } = useFetch();
  const { id } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const [urlVideo, setUrlVideo] = useState('');

  let params = {};
  if (location.pathname.includes('meals')) {
    params = {
      type: 'meals',
      id: 'idMeal',
      video: 'strYoutube',
      name: 'strMeal',
      img: 'strMealThumb',
      category: 'strCategory',
      instructions: 'strInstructions',
    };
  } else {
    params = {
      type: 'drinks',
      id: 'idDrink',
      video: 'strVideo',
      name: 'strDrink',
      img: 'strDrinkThumb',
      category: 'strAlcoholic',
      instructions: 'strInstructions',
    };
  }

  useEffect(() => {
    let result = [];
    const handleFetchData = async () => {
      if (location.pathname === `/meals/${id}`) {
        result = await fetchData(`${URL_API_MEALS}${id}`);
      } else {
        result = await fetchData(`${URL_API_DRINKS}${id}`);
      }
      const keys = Object.keys(result[params.type][0]);
      const ingredientsAll = keys.filter((key) => key.includes('strIngredient'));
      const measuresAll = keys.filter((key) => key.includes('strMeasure'));
      const ingredientsList = [];
      ingredientsAll.forEach((ingredient, index) => {
        if (result[params.type][0][ingredient] !== ''
          && result[params.type][0][ingredient] !== null) {
          ingredientsList.push({
            ingredient: result[params.type][0][ingredient],
            measure: result[params.type][0][measuresAll[index]],
          });
        }
      });
      setRecipe(result[params.type][0]);
      setIngredients(ingredientsList);
    };
    handleFetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (recipe[params.video]) {
      setUrlVideo(recipe[params.video].replace('watch?v=', 'embed/'));
    }
  }, [params.video, recipe]);
  console.log(recipe);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        className="max-h-20 max-w-20"
        src={ recipe[params.img] }
        alt={ recipe[params.name] }
      />
      <h2
        data-testid="recipe-title"
        className="text-red-800 text-4xl"
      >
        { recipe[params.name] }
      </h2>
      <p
        data-testid="recipe-category"
      >
        { `Categoria: ${recipe[params.category]}` }
      </p>
      <p>Ingredientes:</p>
      {
        ingredients.map((ingredient, index) => (
          <li
            key={ ingredient.ingredient + ingredient.measure }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${ingredient.ingredient}: ${ingredient.measure}` }
          </li>
        ))
      }
      <p>Instruções:</p>
      <p data-testid="instructions">{ recipe[params.instructions] }</p>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ urlVideo }
        title={ recipe[params.name] }
        frameBorder="20"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
