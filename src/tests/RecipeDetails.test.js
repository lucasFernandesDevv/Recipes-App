import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockFetch } from './helpers/mockFetch';
import { initialState } from './helpers/initialState';
import { renderWithRouterAndRedux } from './helpers/RenderWithRouter';

const ID_MEALS = '52771';
const ID_DRINKS = '178319';
const URL_MEALS = `/meals/${ID_MEALS}`;
const URL_DRINKS = `/drinks/${ID_DRINKS}`;

describe('Test RecipeDetails', () => {
  beforeEach(() => {
    mockFetch();
  });

  it('Testing if when clicking on the "Share" button, the link is copied to the clipboard.', async () => {
    jest.setTimeout(10000);
    jest.useFakeTimers();
    window.navigator.clipboard = { writeText: jest.fn() };
    window.document.execCommand = jest.fn();
    renderWithRouterAndRedux(<App />, initialState, URL_MEALS);
    const btnShare = await screen.findByRole('button', { name: /share-btn/i });
    userEvent.click(btnShare);
    const linkCopied = screen.getByText(/link copied!/i);
    expect(linkCopied).toBeInTheDocument();
    jest.advanceTimersByTime(5000);
    await waitForElementToBeRemoved(screen.getByText(/link copied!/i));
  });

  it('Testing if food recipe is already in favorites, if it is removed and added back to favorites.', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: ID_MEALS }]));
    renderWithRouterAndRedux(<App />, initialState, URL_MEALS);
    await screen.findByRole('heading', { name: /spicy arrabiata penne/i });
    const btnFavorite = screen.getByRole('button', { name: /favorite-btn/i });
    userEvent.click(btnFavorite);
    const favoriteLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteLS).toHaveLength(0);
    userEvent.click(btnFavorite);
    const newFavoriteLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(newFavoriteLS[0].id).toBe(ID_MEALS);
  });

  it('Testing if there is a "Start Recipe" button and after starting the recipe if the button changes to "Continue Recipe"', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, URL_MEALS);
    await screen.findByRole('heading', { name: /spicy arrabiata penne/i });
    const btnStart = screen.getByRole('button', { name: /start recipe/i });
    userEvent.click(btnStart);
    await waitFor(() => {
      expect(history.location.pathname).toBe(`${URL_MEALS}/in-progress`);
    });
    history.push(URL_MEALS);
    await screen.findByRole('heading', { name: /spicy arrabiata penne/i });
    expect(screen.queryByRole('button', { name: /start recipe/i })).not.toBeInTheDocument();
    const btnContinue = await screen.findByRole('button', { name: /continue recipe/i });
    expect(btnContinue).toBeInTheDocument();
  });

  it('Testing if the drink recipe is already in the favorites, if it is removed and added again to the favorites.', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, URL_DRINKS);
    await screen.findByRole('heading', { name: /aquamarine/i });
    const btnStart = screen.getByRole('button', { name: /start recipe/i });
    userEvent.click(btnStart);
    await waitFor(() => {
      expect(history.location.pathname).toBe(`${URL_DRINKS}/in-progress`);
    });
    history.push(URL_DRINKS);
    await screen.findByRole('heading', { name: /aquamarine/i });
    expect(screen.queryByRole('button', { name: /start recipe/i })).not.toBeInTheDocument();
    const btnContinue = await screen.findByRole('button', { name: /continue recipe/i });
    expect(btnContinue).toBeInTheDocument();
  });
});
