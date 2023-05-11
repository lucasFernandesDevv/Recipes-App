import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/RenderWithRouter';
import App from '../App';
import { mockedStore } from './mocks/mockedStore';
import { mockFetch } from './helpers/mockFetch';
import { initialState } from './helpers/initialState';

describe('Recipes screen tests', () => {
  const allCategoriesTestid = 'All-category-filter';
  it('Renders the screen with the correct elements for meals route', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        meals: mockedStore.recipes.meals,
        mealsCategories: mockedStore.recipes.mealsCategories,
      }),
    }));
    const mockedInitialState = { initialState };

    const { history } = renderWithRouterAndRedux(
      <App />,
      mockedInitialState,
      '/meals',
    );

    const profileButton = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchButton = screen.getByTestId('search-top-btn');

    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(profileButton).toHaveAttribute('src', 'profileIcon');
    expect(pageTitle).toHaveTextContent(/meals/i);
    expect(searchButton).toHaveAttribute('src', 'searchIcon');
    expect(global.fetch).toHaveBeenCalled();

    const corbaRecipe = await screen.findByText(/corba/i);
    const categoryButton = screen.getByTestId(allCategoriesTestid);

    expect(corbaRecipe).toBeInTheDocument();
    expect(categoryButton).toBeInTheDocument();

    userEvent.click(corbaRecipe);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/meals/52977');
  });
  it('Renders the screen with the correct elements for drinks route', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        drinks: mockedStore.recipes.drinks,
        drinksCategories: mockedStore.recipes.drinksCategories,
      }),
    }));
    const mockedInitialState = { initialState };

    const { history } = renderWithRouterAndRedux(
      <App />,
      mockedInitialState,
      '/drinks',
    );

    const profileButton = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchButton = screen.getByTestId('search-top-btn');

    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(profileButton).toHaveAttribute('src', 'profileIcon');
    expect(pageTitle).toHaveTextContent(/drinks/i);
    expect(searchButton).toHaveAttribute('src', 'searchIcon');
    expect(global.fetch).toHaveBeenCalled();

    const ggRecipe = await screen.findByText(/gg/i);
    const categoryButton = screen.getByTestId(allCategoriesTestid);

    expect(ggRecipe).toBeInTheDocument();
    expect(categoryButton).toBeInTheDocument();

    userEvent.click(ggRecipe);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/drinks/15997');
  });
  it('Renders the correct elements when has a category filter applied, meals', async () => {
    mockFetch();
    renderWithRouterAndRedux(
      <App />,
      initialState,
      '/meals',
    );

    const chickenCategoryButton = await screen.findByTestId('Chicken-category-filter');
    const categoryButtonAll = screen.getByTestId(allCategoriesTestid);

    expect(categoryButtonAll).toBeInTheDocument();
    expect(chickenCategoryButton).toBeInTheDocument();

    act(() => {
      userEvent.click(chickenCategoryButton);
    });

    const chickenRecipe = await screen.findByText(/brown/i);

    expect(chickenRecipe).toBeInTheDocument();

    act(() => {
      userEvent.click(categoryButtonAll);
    });

    const corbaRecipe = await screen.findByText(/corba/i);
    expect(corbaRecipe).toBeInTheDocument();
  });

  it('Renders the correct elements when has a category filter applied, drinks', async () => {
    mockFetch();
    renderWithRouterAndRedux(
      <App />,
      initialState,
      '/drinks',
    );

    const cocktailCategoryButton = await screen.findByTestId('Cocktail-category-filter');
    const categoryButtonAll = screen.getByTestId(allCategoriesTestid);

    expect(categoryButtonAll).toBeInTheDocument();
    expect(cocktailCategoryButton).toBeInTheDocument();

    act(() => {
      userEvent.click(cocktailCategoryButton);
    });

    const cocktailRecipe = await screen.findByText(/155/i);

    expect(cocktailRecipe).toBeInTheDocument();

    act(() => {
      userEvent.click(categoryButtonAll);
    });

    const ggRecipe = await screen.findByText(/gg/i);
    expect(ggRecipe).toBeInTheDocument();
  });
});
