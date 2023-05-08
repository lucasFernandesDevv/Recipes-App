import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="bg-violet-900 text-white rounded-md px-3 py-2
        relative ml-0 items-center mt-0 text-center text-lg font-larger
        footer-bar"
    >
      <Link to="/drinks">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Página de drinks" />
      </Link>
      <Link to="/meals">
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="Página de comidas" />
      </Link>
    </footer>
  );
}
