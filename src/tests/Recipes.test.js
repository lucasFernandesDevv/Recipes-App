import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/RenderWithRouter';
import App from '../App';
import { mockedStore } from './mocks/mockedStore';
import { recipes } from './helpers/initialState';

describe('Recipes screen tests', () => {
  it('Renders the screen with the correct elements for meals route', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        meals: mockedStore.recipes.meals,
        mealsCategories: mockedStore.recipes.mealsCategories,
      }),
    }));
    const mockedInitialState = { recipes };

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
    const categoryButton = screen.getByTestId('All-category-filter');

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
    const mockedInitialState = { recipes };

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
    const categoryButton = screen.getByTestId('All-category-filter');

    expect(ggRecipe).toBeInTheDocument();
    expect(categoryButton).toBeInTheDocument();

    userEvent.click(ggRecipe);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/drinks/15997');
  });
  it('Renders the correct elements when has a category filter applied', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        meals: mockedStore.recipes.meals,
        mealsCategories: mockedStore.recipes.mealsCategories,
        filteredMealsByCategory: mockedStore.recipes.filteredMealsByCategory,
      }),
    }));
    const mockedInitialState = { recipes };

    const { history } = renderWithRouterAndRedux(
      <App />,
      mockedInitialState,
      '/meals',
    );

    const corbaRecipe = await screen.findByText(/corba/i);
    expect(corbaRecipe).toBeInTheDocument();

    const beefCategoryButton = await screen.findByTestId('Beef-category-filter');
    const categoryButtonAll = screen.getByTestId('All-category-filter');

    expect(categoryButtonAll).toBeInTheDocument();
    expect(beefCategoryButton).toBeInTheDocument();

    act(() => {
      userEvent.click(beefCategoryButton);
    });

    expect(global.fetch).toHaveBeenCalled();
  });
});
