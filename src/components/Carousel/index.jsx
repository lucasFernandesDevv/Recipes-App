import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import RecipeCard from '../RecipeCard';

function Carousel({
  meals,
  drinks,
  filteredMealsByCategory,
  filteredDrinksByCategory,
}) {
  const {
    location: { pathname },
  } = useHistory();

  const currentCategory = pathname === '/drinks'
    ? filteredDrinksByCategory : filteredMealsByCategory;

  const [hasFilterByCategory, setHasFilterByCategory] = useState(false);

  useEffect(() => {
    setHasFilterByCategory(currentCategory.length > 0);
  }, [currentCategory]);

  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {pathname.includes('meals')
        ? (hasFilterByCategory ? filteredMealsByCategory : drinks).map(
          ({ idMeal, strMeal, strMealThumb }, i) => (
            <RecipeCard
              key={ idMeal }
              id={ idMeal }
              name={ strMeal }
              thumb={ strMealThumb }
              index={ i }
            />
          ),
        )
        : (hasFilterByCategory ? filteredDrinksByCategory : meals).map(
          ({ idDrink, strDrink, strDrinkThumb }, i) => (
            <RecipeCard
              key={ idDrink }
              id={ idDrink }
              name={ strDrink }
              thumb={ strDrinkThumb }
              index={ i }
            />
          ),
        )}
    </div>
  );
}

const mapStateToProps = ({
  recipes: { meals, drinks, filteredMealsByCategory, filteredDrinksByCategory },
}) => ({
  meals,
  drinks,
  filteredMealsByCategory,
  filteredDrinksByCategory,
});

Carousel.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filteredDrinksByCategory: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filteredMealsByCategory: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Carousel);
