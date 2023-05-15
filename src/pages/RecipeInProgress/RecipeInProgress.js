/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { useHistory,
  useLocation,
  useParams } from 'react-router-dom/cjs/react-router-dom.min';
import clipboardCopy from 'clipboard-copy';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useFetch from '../../hooks/useFetch';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import favoriteChecked from '../../images/blackHeartIcon.svg';
import { addFavoriteRecipeInLocalStorage } from '../../helpers/addLocalStorage';
import { doneRecipes } from '../../helpers/doneRecipes';

const URL_API_MEALS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const URL_API_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const btnEnabled = 'bg-green-500 py-2 px-2 mb-2 ml-2 border-2 rounded-md'
+ 'text-white border-green-300 shadow-2xl shadow-blue-500/50';
const btnDisabled = 'bg-green-200 py-2 px-2 mb-2 ml-2 border-2'
+ 'rounded-md text-white border-green-300 shadow-2xl shadow-blue-500/50';

const FAVORITE_RECIPES = 'favoriteRecipes';

window.addEventListener('beforeunload', () => {
  // localStorage.clear(); COMENTADO POR RESETAR LOCALSTORAGE DA APLICAÇÃO INTEIRA
  // FAZENDO NÃO FUNCIONAR OUTAS PÁGINAS, FAVOR REFATORAR (Ass, Gabriel Rodrigues)
});

function RecipeInProgress() {
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const { fetchData } = useFetch();
  const [infos, setInfos] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [controlCheck, setControlCheck] = useState({});
  const [allCheckeds, setAllCheckeds] = useState(false);
  const [idFavorite, setIdFavorite] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [checkboxes, setCheckboxes] = useState(['false']);

  const params = {
    type: location.pathname.includes('meals') ? 'meals' : 'drinks',
  };

  const createLS = () => {
    const recipeInLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!recipeInLS) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        [params.type]: { [id]: [] },
      }));
    }
  };

  useEffect(() => {
    let result = [];
    createLS();
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
        setInfos({
          ...infos,
          imgLink: result.drinks[0].strDrinkThumb,
          title: result.drinks[0].strDrink,
          category: result.drinks[0].strAlcoholic,
          instructions: result.drinks[0].strInstructions,
        });
      }
      setRecipe(result[params.type][0]);
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
    const favoritesLS = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
    const hasFavorite = favoritesLS.some((favorite) => favorite.id === id);
    if (hasFavorite) {
      setIdFavorite(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFavorite = () => {
    if (idFavorite) {
      const favoritesLS = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
      console.log(favoritesLS);
      const newFavoritesLS = favoritesLS.filter((fav) => fav.id !== id);
      localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(newFavoritesLS));
    } else {
      addFavoriteRecipeInLocalStorage(FAVORITE_RECIPES, location, recipe);
    }
    setIdFavorite(!idFavorite);
  };

  useEffect(() => {
    const recipeInLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!recipeInLS[params.type]) {
      ingredients.forEach(({ ingredient }) => {
        setControlCheck((prev) => ({ ...prev, [ingredient]: false }));
      });
    } else {
      recipeInLS[params.type][id]?.forEach((status) => {
        setControlCheck((prev) => ({ ...prev, ...status }));
      });
    }
  }, [id, ingredients, params.type]);

  const handleShare = () => {
    const TIME_COPY = 5000;
    const link = window.location.href;
    const linkReplace = link.replace(/\/in-progress$/, '');
    clipboardCopy(linkReplace);
    setCopyLink(true);
    setTimeout(() => {
      setCopyLink(false);
    }, TIME_COPY);
  };

  const handleChange = ({ target }) => {
    const { name, checked } = target;
    const arrayCheckboxes = [];
    const check = document.querySelectorAll('.ingredient-checkbox');
    check.forEach((box) => {
      arrayCheckboxes.push(box.checked);
    });
    setCheckboxes(arrayCheckboxes);
    setControlCheck({
      ...controlCheck,
      [name]: checked,
    });
    const recipeInLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const recip = recipeInLS[params.type][id];
    let doneRecipe = [];
    if (recip.find((element) => Object.prototype
      .hasOwnProperty.call(element, [name]))) {
      const ind = recip.findIndex((obj) => Object.prototype
        .hasOwnProperty.call(obj, [name]));
      recip[ind] = { [name]: checked };
      doneRecipe = [...recip];
    } else {
      doneRecipe = [...recip, { [name]: checked }];
    }
    const pag = [params.type];
    const newObj = {
      ...recipeInLS,
      [pag]: {
        [id]: doneRecipe,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...newObj }));
  };

  useEffect(() => {
    const verifyCheckbox = Object.values(controlCheck).every((val) => val !== false);
    setAllCheckeds(verifyCheckbox);
  }, [controlCheck]);
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
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className={ controlCheck[map.ingredient]
                ? ('line-through border-black border-solid')
                : '' }
            >
              {' '}
              {`${map.ingredient}`}
              <input
                type="checkbox"
                className="ingredient-checkbox"
                name={ map.ingredient }
                onChange={ handleChange }
                checked={ controlCheck[map.ingredient] }
              />
            </label>
          ))
        }
        <button
          className={ allCheckeds ? btnEnabled : btnDisabled }
          data-testid="finish-recipe-btn"
          disabled={ !checkboxes.every((checked) => checked === true) }
          onClick={ () => {
            doneRecipes(recipe, location);
            history.push('/done-recipes');
          } }
        >
          Finish Recipe
        </button>
        <div className="flex justify-center gap-4">
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
            onClick={ handleShare }
          >
            <img src={ shareIcon } alt="share-btn" />
          </button>
        </div>
        <div className="flex justify-center gap-4">
          {
            copyLink && <p>Link copied!</p>
          }
        </div>
      </main>
      <Footer />
    </>
  );
}
export default RecipeInProgress;
