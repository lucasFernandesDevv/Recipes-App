import { act, screen } from '@testing-library/react';
import { mockedDoneRecipes } from './helpers/mockLocalStorage';
import { renderWithRouterAndRedux } from './helpers/RenderWithRouter';
import { initialState } from './helpers/initialState';
import App from '../App';

describe('Testa a tela de receitas feitas', () => {
  const mockedInitalState = initialState;
  const initialPath = '/done-recipes';
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockedDoneRecipes));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Renders the DoneRecipes page correctly', async () => {
    const expectedFilterButtons = ['Meals', 'Drinks', 'All'];
    renderWithRouterAndRedux(<App />, mockedInitalState, initialPath);

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

  it('Copies the link to the clipboard when the share button is clicked', async () => {
    window.navigator.clipboard = { writeText: jest.fn() };
    window.document.execCommand = jest.fn();
    renderWithRouterAndRedux(<App />, mockedInitalState, initialPath);

    const shareButton = screen.getAllByAltText('share-btn')[0];
    expect(shareButton).toBeInTheDocument();

    const expectedAlertMessage = 'Link copied!';
    expect(screen.queryByText(expectedAlertMessage)).toBeNull();

    act(() => {
      shareButton.click();
    });

    expect(screen.getByText(expectedAlertMessage)).toBeInTheDocument();
  });
  it('Filters the recipes by type', async () => {
    const expectedFilterButtons = ['Meals', 'Drinks', 'All'];
    renderWithRouterAndRedux(<App />, mockedInitalState, initialPath);

    const mealsButton = screen.getByRole('button', { name: expectedFilterButtons[0] });
    const drinksButton = screen.getByRole('button', { name: expectedFilterButtons[1] });
    const allButton = screen.getByRole('button', { name: expectedFilterButtons[2] });

    const recipeImageMeal = screen.getByAltText(mockedDoneRecipes[0].name);
    const recipeImageDrink = screen.getByAltText(mockedDoneRecipes[1].name);

    expect(recipeImageMeal).toBeInTheDocument();
    expect(recipeImageDrink).toBeInTheDocument();

    act(() => {
      drinksButton.click();
    });

    expect(recipeImageMeal).not.toBeInTheDocument();
    expect(recipeImageDrink).toBeInTheDocument();

    act(() => {
      mealsButton.click();
    });

    expect(screen.getByAltText(mockedDoneRecipes[0].name)).toBeInTheDocument();
    expect(recipeImageDrink).not.toBeInTheDocument();

    act(() => {
      allButton.click();
    });

    expect(screen.getByAltText(mockedDoneRecipes[0].name)).toBeInTheDocument();
    expect(screen.getByAltText(mockedDoneRecipes[1].name)).toBeInTheDocument();
  });
});
