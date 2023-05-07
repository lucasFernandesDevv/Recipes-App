import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import iconProfile from '../../images/profileIcon.svg';
import searchBtn from '../../images/searchIcon.svg';
import './Header.css';
import SearchBar from '../SearchBar';

function Header({ title }) {
  const [showBar, setShowBar] = useState(null);
  const history = useHistory();
  const handlePerfil = () => {
    history.push('/profile');
  };
  const changeBar = (e) => {
    e.preventDefault();
    if (showBar) {
      setShowBar(false);
      return;
    }
    setShowBar(true);
  };

  return (
    <div className="border-b border-gray-900/10 items-center pb-12">
      <div>
        <h1
          data-testid="page-title"
          className="bg-violet-900 text-white rounded-md px-3
       py-2 relative ml-0 items-center
       mt-0 text-center
      text-lg font-larger"
        >
          { title }
        </h1>
      </div>
      <div className="space-y-12">
        <img
          onClickCapture={ handlePerfil }
          data-testid="profile-top-btn"
          src={ iconProfile }
          alt="profile-icon"
        />
        <div>
          { (title === 'Drinks' || title === 'Meals')
        && (
          <button
            onClick={ (e) => changeBar(e) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchBtn }
              alt="search-top-btn"
            />
          </button>
        )}
        </div>
        { showBar && <SearchBar /> }
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
