import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  // const doneRecipes = [{
  //   id: 'id - da - receita',
  //   type: 'meal - ou - drink',
  //   nationality: 'nacionalidade - da - receita - ou - texto - vazio',
  //   category: 'categoria - da - receita - ou - texto - vazio',
  //   alcoholicOrNot: 'alcoholic - ou - non - alcoholic - ou - texto - vazio',
  //   name: 'nome - da - receita',
  //   image: 'imagem - da - receita',
  //   doneDate: 'quando - a - receita - foi - concluida',
  //   tags: 'array - de - tags - da - receita - ou - array - vazio',
  // }];

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

  return (
    <>
      <Header title="Profile" />
      <div>
        <span data-testid="profile-email">
          {user.email}
        </span>
        <section>
          <button data-testid="profile-done-btn">
            <span>Done Recipes</span>
          </button>
          <hr />
          <button data-testid="profile-favorite-btn">
            <span>Favorite Recipes</span>
          </button>
          <hr />
          <button data-testid="profile-logout-btn">
            <span>Logout</span>
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
