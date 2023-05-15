import PropTypes from 'prop-types';
import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
// import favoriteIcon from '../../images/whiteHeartIcon.svg';
import favoriteChecked from '../../images/blackHeartIcon.svg';

export default function FavoriteRecipeCard({
  index = 0,
  name = '',
  nationality = '',
  category = '',
  type = '',
  id = '',
  image = '',
  handleUnfavorite = () => {},
}) {
  const [isRecipeCopied, setIsRecipeCopied] = useState();
  const history = useHistory();
  const favoriteRecipesPath = 'favorite-recipes';

  function handleShareButton() {
    if (type === 'meal') {
      const url = window.location.href.replace(
        favoriteRecipesPath,
        `meals/${id}`,
      );
      clipboardCopy(url);
    } else {
      const url = window.location.href.replace(
        favoriteRecipesPath,
        `drinks/${id}`,
      );
      clipboardCopy(url);
    }
    setIsRecipeCopied(true);
  }

  function redirectToDetails() {
    const redirectUrl = type === 'meal' ? `/meals/${id}` : `/drinks/${id}`;
    history.push(redirectUrl);
  }

  function handleUnfavoriteButton() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipes = favoriteRecipes.filter(
      (recipe) => recipe.id !== id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    handleUnfavorite(newFavoriteRecipes);
  }

  return (
    <div>
      <button onClick={ redirectToDetails }>
        <img
          className="h-40 w-40"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </button>
      <div>
        <div>
          <button
            data-testid={ `${index}-horizontal-name` }
            onClickCapture={ redirectToDetails }
          >
            {name}
          </button>
          <span data-testid={ `${index}-horizontal-top-text` }>
            {`- ${nationality} - ${category}`}
          </span>
        </div>
        <button onClick={ handleShareButton } src="shareIcon">
          <img
            src={ shareIcon }
            alt="share-btn"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <button
          onClick={ handleUnfavoriteButton }
          data-testid={ `${index}-horizontal-favorite-btn` }
        >
          <img src={ favoriteChecked } alt="filled heart icon" />
        </button>
        {isRecipeCopied && 'Link copied!'}
      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  category: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  nationality: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  handleUnfavorite: PropTypes.func,
};
