import { Link, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import clipboardCopy from 'clipboard-copy';
import useFetch from '../../hooks/useFetch';
import Carousel from '../Carousel';
import { addFavoriteRecipeInLocalStorage,
  addLocalStorageInProgressRecipes } from '../../helpers/addLocalStorage';
import './RecipeDetail.css';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import favoriteChecked from '../../images/blackHeartIcon.svg';

const URL_API_MEALS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const URL_API_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const IN_PROGRESS_RECIPES = 'inProgressRecipes';
const FAVORITE_RECIPES = 'favoriteRecipes';

export default function RecipeDetails() {
  const history = useHistory();
  const { fetchData } = useFetch();
  const { id } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const [urlVideo, setUrlVideo] = useState('');
  const [hasCopyLink, setHasCopyLink] = useState(false);
  const [idFavorite, setIdFavorite] = useState(false);

  const params = {
    type: location.pathname.includes('meals') ? 'meals' : 'drinks',
    id: location.pathname.includes('meals') ? 'idMeal' : 'idDrink',
    video: location.pathname.includes('meals') ? 'strYoutube' : 'strVideo',
    name: location.pathname.includes('meals') ? 'strMeal' : 'strDrink',
    img: location.pathname.includes('meals') ? 'strMealThumb' : 'strDrinkThumb',
    category: location.pathname.includes('meals') ? 'strCategory' : 'strAlcoholic',
    instructions: location.pathname.includes('meals')
      ? 'strInstructions' : 'strInstructions',
  };

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
    const favoritesLS = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
    const hasFavorite = favoritesLS.some((favorite) => favorite.id === id);
    if (hasFavorite) {
      setIdFavorite(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const verifyInProgressRecipe = JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES));
    if (verifyInProgressRecipe
      && verifyInProgressRecipe[params.type]
      && verifyInProgressRecipe[params.type][id]) {
      setRecipeInProgress(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  useEffect(() => {
    if (recipe[params.video]) {
      setUrlVideo(recipe[params.video].replace('watch?v=', 'embed/'));
    }
  }, [params.video, recipe]);
  const handleClick = () => {
    if (location.pathname.includes('meals') === true) {
      history.push(`/meals/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const startRecipe = () => {
    setRecipeInProgress(!recipeInProgress);
    addLocalStorageInProgressRecipes(IN_PROGRESS_RECIPES, location, recipe[params.id]);
    handleClick();
  };

  const btnStartRecipe = (
    <button
      className="bg-green-500 py-2 px-2 mb-2 ml-2 border-2 rounded-md fixed
      text-white  border-green-300 shadow-2xl
      shadow-black bottom-0 right-2
      start-recipe-btn"
      type="submit"
      data-testid="start-recipe-btn"
      // className="start-recipe-btn"
      onClick={ () => startRecipe() }
    >
      Start Recipe
    </button>
  );

  const btnContinueRecipe = (
    <Link to={ `/${params.type}/${id}/in-progress` }>
      <button
        className="bg-yellow-500 py-2 px-2 mb-2 ml-2 border-4 text-violet-700 italic"
        data-testid="start-recipe-btn"
      >
        Continue Recipe
      </button>
    </Link>
  );

  const onShare = () => {
    const TIME_COPY = 5000;
    clipboardCopy(window.location.href);
    setHasCopyLink(true);
    setTimeout(() => {
      setHasCopyLink(false);
    }, TIME_COPY);
  };

  const onFavorite = () => {
    if (idFavorite) {
      const favoritesLS = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
      const newFavoritesLS = favoritesLS.filter((fav) => fav.id !== id);
      localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(newFavoritesLS));
    } else {
      addFavoriteRecipeInLocalStorage(FAVORITE_RECIPES, location, recipe);
    }
    setIdFavorite(!idFavorite);
  };

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
      { urlVideo && (
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
      ) }
      <Carousel />
      {
        hasCopyLink && <p>Link copied!</p>
      }
      {/* {
        recipeInProgress
          ? btnContinueRecipe
          : btnStartRecipe
      } */}
      <div className="flex justify-start gap-4">
        <button
          onClick={ handleClick }
          className="bg-blue-500 py-2 px-2 mb-2 ml-2 border-2 rounded-md
           text-white  border-blue-300 shadow-2xl
             shadow-blue-500/50"
        >
          In progress
        </button>
        {' '}
        <button
          onClick={ onFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ idFavorite ? favoriteChecked : favoriteIcon }
            alt="favorite-btn"
          />
        </button>
        {' '}
        <button
          data-testid="share-btn"
          onClick={ onShare }
        >
          <img src={ shareIcon } alt="share-btn" />
        </button>
        {
          recipeInProgress
            ? btnContinueRecipe
            : btnStartRecipe
        }
      </div>
    </div>
  );
}
