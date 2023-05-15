import PropTypes from 'prop-types';
import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
// import favoriteIcon from '../../images/whiteHeartIcon.svg';
// import favoriteChecked from '../../images/blackHeartIcon.svg';

export function DoneRecipeCard({
  index = 0,
  name = '',
  doneDate = '',
  tags = [],
  nationality = '',
  category = '',
  alcoholicOrNot = '',
  type = '',
  id = '',
  image = '',
}) {
  console.log(category);
  const [isRecipeCopied, setIsRecipeCopied] = useState();
  const history = useHistory();
  const doneRecipesPath = 'done-recipes';
  console.log(alcoholicOrNot);
  function handleShareButton() {
    if (type === 'meal') {
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
    const redirectUrl = type === 'meal' ? `/meals/${id}` : `/drinks/${id}`;
    console.log(redirectUrl, type);
    history.push(redirectUrl);
  }

  return (
    <div>
      <button
        onClick={ redirectToDetails }
      >
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
            {alcoholicOrNot ? ' - Alcoholic' : null}
          </span>
        </div>
        <button
          onClick={ handleShareButton }
        >
          <img
            src={ shareIcon }
            alt="share-btn"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        {isRecipeCopied && 'Link copied!'}
      </div>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      <div>
        {tags.map((tag, i) => (
          <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
            {tag}
          </p>
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
  alcoholicOrNot: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
};
