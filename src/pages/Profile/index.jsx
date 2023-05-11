import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <Header title="Profile" />
      <div>
        <span data-testid="profile-email">
          {user.email}
        </span>
        <section>
          <Link to="/done-recipes">
            <button data-testid="profile-done-btn">
              Done Recipes
            </button>
          </Link>
          <hr />
          <Link to="/favorite-recipes">
            <button data-testid="profile-favorite-btn">
              Favorite Recipes
            </button>
          </Link>
          <hr />
          <Link to="/">
            <button data-testid="profile-logout-btn" onClick={ () => handleLogout() }>
              Logout
            </button>
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
