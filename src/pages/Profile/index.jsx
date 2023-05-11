import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Profile() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
    } else {
      setUser({ email: '' });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <Header title="Profile" />
      <div>
        <span data-testid="profile-email">
          {user?.email}
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
