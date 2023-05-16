import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/RenderWithRouter';
import { initialState } from './helpers/initialState';
import App from '../App';

const pathMeals = '/meals/52771/in-progress';
const pathDrinks = '/drinks/14610/in-progress';

describe('Testes da tela de in-progress', () => {
  const mockedInitialState = { initialState };
  it('Deve renderizar a tela meals corretamente', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      mockedInitialState,
      pathMeals,
    );
    const title = screen.getByRole('heading', {
      name: /recipes in progress/i,
    });
    const recipeImg = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const finishButton = screen.getByRole('button', {
      name: /finish recipe/i,
    });
    const favoriteButton = screen.getByRole('img', {
      name: /favorite-btn/i,
    });
    const shareButton = screen.getByRole('img', {
      name: /share-btn/i,
    });
    const { location: { pathname } } = history;
    expect(title).toBeInTheDocument();
    expect(recipeImg).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(pathname).toBe(pathMeals);
  });
  it('testa se a imagem do fv button muda', () => {
    renderWithRouterAndRedux(
      <App />,
      mockedInitialState,
      pathMeals,
    );
    const favoriteButton = screen.getByAltText('favorite-btn');
    expect(favoriteButton.src).toEqual('http://localhost/whiteHeartIcon.svg');
    userEvent.click(favoriteButton);
    expect(favoriteButton.src).toEqual('http://localhost/blackHeartIcon.svg');
  });
  it('testa se a imagem do fv button muda', async () => {
    renderWithRouterAndRedux(
      <App />,
      mockedInitialState,
      pathMeals,
    );
    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes).toHaveLength(8);
  });
  it('Deve renderizar a tela drinks corretamente', async () => {
    renderWithRouterAndRedux(
      <App />,
      mockedInitialState,
      pathDrinks,
    );
    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);
    userEvent.click(checkboxes[0]);
    window.location.reload();
    const checkboxes2 = await screen.findAllByRole('checkbox');
    console.log(checkboxes2.value);
  });
});
