import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import iconProfile from '../../images/profileIcon.svg';
import searchBtn from '../../images/searchIcon.svg';

function Header({ title }) {
  const history = useHistory();
  const handlePerfil = () => {
    history.push('/profile');
  };

  return (
    <>
      <h1 data-testid="page-title">{ title }</h1>
      <div className="header">
        <div>
          <img
            onClickCapture={ handlePerfil }
            data-testid="profile-top-btn"
            src={ iconProfile }
            alt="profile-icon"
          />
        </div>
        { (title === 'Drinks' || title === 'Meals')
        && <img
          data-testid="search-top-btn"
          src={ searchBtn }
          alt="profile-icon"
        />}
      </div>
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
