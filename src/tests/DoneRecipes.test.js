import { screen } from '@testing-library/react';
import { mockedDoneRecipes } from './helpers/mockLocalStorage';
import { renderWithRouterAndRedux } from './helpers/RenderWithRouter';
import { initialState } from './helpers/initialState';
import App from '../App';

describe('Testa a tela de receitas feitas', () => {
  const mockedInitalState = { initialState };

  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockedDoneRecipes));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Renders the DoneRecipes page correctly', async () => {
    const expectedFilterButtons = ['Meals', 'Drinks', 'All'];
    renderWithRouterAndRedux(<App />, mockedInitalState, '/done-recipes');

    expectedFilterButtons.forEach((button) => {
      const filterButton = screen.getByRole('button', { name: button });
      expect(filterButton).toBeInTheDocument();
    });

    const recipeImage = screen.getByAltText(mockedDoneRecipes[0].name);
    expect(recipeImage).toHaveAttribute('src', mockedDoneRecipes[0].image);
    expect(recipeImage).toBeInTheDocument();

    const recipeName = screen.getByText(mockedDoneRecipes[0].name);
    expect(recipeName).toBeInTheDocument();

    const recipeCategory = await screen.findByText(/vegetarian/i);
    expect(recipeCategory).toBeInTheDocument();

    const recipeDoneDate = await screen.findAllByText(mockedDoneRecipes[0].doneDate);
    expect(recipeDoneDate).toHaveLength(2);

    const shareButtons = screen.getAllByAltText('share-btn');
    expect(shareButtons).toHaveLength(2);

    const recipeTags = screen.getByText(mockedDoneRecipes[0].tags[0]);
    expect(recipeTags).toBeInTheDocument();
  });
});
