import PropTypes from 'prop-types';
import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';

export function DoneRecipeCard({
  index = 0,
  name = '',
  doneDate = '',
  tags = [],
  nationality = '',
  category = '',
  isAlcoholic = false,
  recipeType = '',
  id = '',
}) {
  const [isRecipeCopied, setIsRecipeCopied] = useState();
  const history = useHistory();
  const doneRecipesPath = 'done-recipes';

  function handleShareButton() {
    if (recipeType === 'meals') {
      const url = window.location.href.replace(doneRecipesPath, `meals/${id}`);
      clipboardCopy(url);
      console.log(url);
    } else {
      const url = window.location.href.replace(doneRecipesPath, `drinks/${id}`);
      clipboardCopy(url);
      console.log(url);
    }
    setIsRecipeCopied(true);
  }

  function redirectToDetails() {
    const actualUrl = window.location.href;
    const redirectUrl = recipeType === 'meals' ? `/meals/${id}` : `/drinks/${id}`;
    const newUrl = actualUrl.replace(doneRecipesPath, redirectUrl);
    history.push(newUrl);
  }

  return (
    <div>
      <img
        src=""
        alt=""
        data-testid={ `${index}-horizontal-image` }
        onClickCapture={ redirectToDetails }
      />
      <div>
        <div>
          <button
            data-testid={ `${index}-horizontal-name` }
            onClickCapture={ redirectToDetails }
          >
            {name}
          </button>
          <span data-testid={ `${index}-horizontal-top-text` }>
            {`${nationality} - ${category}`}
            {isAlcoholic ? 'Alcoholic' : ''}
          </span>
        </div>
        <button
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ handleShareButton }
        >
          {isRecipeCopied ? 'Link copied!' : 'Share'}
        </button>
      </div>
      <span data-testid={ `${index}-horizontal-done-date` }>{doneDate}</span>
      <div>
        {tags.map((tag, i) => (
          <span key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  category: PropTypes.string,
  doneDate: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  nationality: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  isAlcoholic: PropTypes.bool,
  recipeType: PropTypes.string,
  id: PropTypes.string,
};
