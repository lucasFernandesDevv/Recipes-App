import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MAGIC_SLICE = 12;

function Recipes({ recipes }) {
  const { location } = useHistory();
  const [actRecipes, setActRecipes] = useState([]);
  const [params, setParams] = useState({
    img: '',
    name: '',
    id: '',
  });

  useEffect(() => {
    if (location.pathname === '/meals') {
      setParams({
        id: 'idMeal',
        img: 'strMealThumb',
        name: 'strMeal',
      });
    } else {
      setParams({
        id: 'idDrink',
        img: 'strDrinkThumb',
        name: 'strDrink',
      });
    }
    setActRecipes(recipes.slice(0, MAGIC_SLICE));
  }, [location.pathname, recipes]);

  return (
    <div>
      { actRecipes?.map((recipe, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ recipe[params.id] }>
          <img
            className="max-h-16 max-w-16"
            data-testid={ `${index}-card-img` }
            src={ recipe[params.img] }
            alt={ recipe[params.img] }
          />
          <p
            data-testid={ `${index}-card-name` }
            className="text-red-800 text-4xl"
          >
            {recipe[params.name]}
          </p>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = ({ recipes }) => ({
  recipes: recipes.recipes,
});

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Recipes);
