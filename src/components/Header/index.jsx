import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import iconProfile from '../../images/profileIcon.svg';
import searchBtn from '../../images/searchIcon.svg';
import './Header.css';

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
    <>
      <h1 data-testid="page-title">{ title }</h1>
      <div className="header">
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
          {
            showBar
          && <input
            className="border-2 border-violet-300 outline-none placeholder-violet-300
              ml-2 w-64 p-2"
            type="text"
            data-testid="search-input"
          />
          }
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
