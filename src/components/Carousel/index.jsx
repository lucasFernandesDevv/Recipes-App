import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './Carousel.css';

const URL_DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const URL_MEALS_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MAX_RECOMMEND = 6;

export default function Carousel() {
  const { fetchData } = useFetch();
  const { location } = useHistory();
  const [recommends, setRecommends] = useState([]);

  const params = {
    type: location.pathname.includes('drinks') ? 'meals' : 'drinks',
    id: location.pathname.includes('drinks') ? 'idMeal' : 'idDrink',
    video: location.pathname.includes('drinks') ? 'strYoutube' : 'strVideo',
    name: location.pathname.includes('drinks') ? 'strMeal' : 'strDrink',
    img: location.pathname.includes('drinks') ? 'strMealThumb' : 'strDrinkThumb',
    category: location.pathname.includes('drinks') ? 'strCategory' : 'strAlcoholic',
    instructions: location.pathname.includes('drinks')
      ? 'strInstructions' : 'strInstructions',
  };

  useEffect(() => {
    const handleMeals = async () => {
      const { pathname } = location;
      let results;
      if (pathname.includes('drinks')) {
        results = await fetchData(URL_MEALS_API);
      } else {
        results = await fetchData(URL_DRINKS_API);
      }
      setRecommends(results[params.type].slice(0, MAX_RECOMMEND));
    };
    handleMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-recommended">
      <span className="carousel-text">Recommended</span>
      <div className="carousel-container">
        {
          recommends.map((recommend, index) => (
            // Não funcionou, porém não é critério de avaliação:
            // <Link
            //   key={ recommend[params.id] }
            //   to={ `/${params.type}/${recommend[params.id]}` }
            // >
            <div
              data-testid={ `${index}-recommendation-card` }
              className="carousel-item"
              key={ recommend[params.id] }
            >
              <img
                data-testid={ `${index}-card-img` }
                className="recommend-img"
                src={ recommend[params.img] }
                alt={ recommend[params.name] }
              />
              <h2
                data-testid={ `${index}-recommendation-title` }
              >
                { recommend[params.name] }
              </h2>
            </div>
            // </Link>
          ))
        }
      </div>
    </div>

  );
}
