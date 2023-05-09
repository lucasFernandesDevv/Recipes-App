import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter, { renderWithRouterAndRedux } from './helpers/RenderWithRouter';

describe('Test if Header render with Title\'s', () => {
  it('Test Header render\'s with Title Meals', () => {
    renderWithRouter(<Header title="Meals" />);
    const title = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(title).toBeInTheDocument();
  });
  it('Test Header render\'s Drink', () => {
    renderWithRouter(<Header title="Drinks" />);
    const title = screen.getByRole('heading', {
      name: /Drinks/i,
    });
    expect(title).toBeInTheDocument();
  });
});

describe('Test if Header render and redirect', () => {
  it('Test Header render\'s redirect to Profile', () => {
    const { history } = renderWithRouterAndRedux(<Header title="Meals" />);

    const profileButton = screen.getByTestId('profile-top-btn');

    act(() => {
      userEvent.click(profileButton);
    });

    const { pathname } = history.location;

    expect(pathname).toBe('/profile');
  });
});

describe('Test if Header render searchBar', () => {
  it('Test Header show the SearchBar', () => {
    renderWithRouterAndRedux(<Header title="Meals" />);

    const profileButton = screen.getByTestId('search-top-btn');

    act(() => {
      userEvent.click(profileButton);
    });

    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    expect(searchBtn).toBeInTheDocument();
    act(() => {
      userEvent.click(profileButton);
    });
    expect(searchBtn).not.toBeInTheDocument();
  });
});
