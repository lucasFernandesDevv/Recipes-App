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
  const [params, setParams] = useState({
    id: '',
    video: '',
    name: '',
    img: '',
    category: '',
    instructions: '',
  });
  const [urlVideo, setUrlVideo] = useState('');

  useEffect(() => {
    let result = [];
    const handleFetchData = async () => {
      if (location.pathname === `/meals/${id}`) {
        result = await fetchData(`${URL_API_MEALS}${id}`);
      } else {
        result = await fetchData(`${URL_API_DRINKS}${id}`);
      }
      const keys = Object.keys(result.meals[0]);
      const ingredientsAll = keys.filter((key) => key.includes('strIngredient'));
      const measuresAll = keys.filter((key) => key.includes('strMeasure'));
      const ingredientsList = [];
      ingredientsAll.forEach((ingredient, index) => {
        if (result.meals[0][ingredient] !== '' && result.meals[0][ingredient]) {
          ingredientsList.push({
            ingredient: result.meals[0][ingredient],
            measure: result.meals[0][measuresAll[index]],
          });
        }
      });
      if (location.pathname === `/meals/${id}`) {
        setParams({
          id: 'idMeal',
          video: 'strYoutube',
          name: 'strMeal',
          img: 'strMealThumb',
          category: 'strCategory',
          instructions: 'strInstructions',
        });
      } else {
        setParams({
          id: 'idDrink',
          video: 'strVideo',
          name: 'strDrink',
          img: 'strDrinkThumb',
          category: 'strCategory',
          instructions: 'strInstructions',
        });
      }
      setRecipe(result.meals[0]);
      setIngredients(ingredientsList);
    };
    handleFetchData();
  }, []);

  useEffect(() => {
    if (recipe[params.video]) {
      setUrlVideo(recipe[params.video].replace('watch?v=', 'embed/'));
    }
  }, [recipe]);

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
