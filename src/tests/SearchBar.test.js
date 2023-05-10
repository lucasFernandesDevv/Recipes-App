import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from './helpers/RenderWithRouter';
import Meals from '../pages/Meals';

const searchTopBtn = 'search-top-btn';
const mySearchInput = 'search-input';

describe('Test if render SearchBar', () => {
  it('Test Header show the SearchBar', () => {
    renderWithRouterAndRedux(<Header title="Meals" />);

    const searchTopButton = screen.getByTestId(searchTopBtn);

    act(() => {
      userEvent.click(searchTopButton);
    });

    const searchInput = screen.getByTestId(mySearchInput);
    userEvent.type(searchInput, 'milk');
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    expect(searchBtn).toBeInTheDocument();
    act(() => {
      userEvent.click(searchBtn);
    });
  });
});
describe('Test select\'s at SearchBar', () => {
  it('Test if can switch in select\'s elements', () => {
    renderWithRouterAndRedux(<Header title="Meals" />);

    const searchTopButton = screen.getByTestId(searchTopBtn);

    act(() => {
      userEvent.click(searchTopButton);
    });

    const name = screen.getByRole('radio', {
      name: /name/i,
    });

    act(() => {
      userEvent.click(name);
    });

    const searchInput = screen.getByTestId(mySearchInput);
    userEvent.type(searchInput, 'milk');
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    expect(searchBtn).toBeInTheDocument();
    act(() => {
      userEvent.click(searchBtn);
    });
  });
});

describe('Test select\'s at SearchBar in Meals page', () => {
  it('Test if can switch in select\'s elements', () => {
    renderWithRouterAndRedux(<Meals />);

    const searchTopButton = screen.getByTestId(searchTopBtn);

    act(() => {
      userEvent.click(searchTopButton);
    });

    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    act(() => {
      userEvent.click(firstLetter);
    });

    const searchInput = screen.getByTestId(mySearchInput);
    userEvent.type(searchInput, 'm');
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    expect(searchBtn).toBeInTheDocument();
    act(() => {
      userEvent.click(searchBtn);
    });
  });
});

describe('Test select\'s at SearchBar in Meals page', () => {
  it('Test if can switch in select\'s elements', () => {
    renderWithRouterAndRedux(<Meals />);

    const searchTopButton = screen.getByTestId(searchTopBtn);

    act(() => {
      userEvent.click(searchTopButton);
    });

    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    act(() => {
      userEvent.click(firstLetter);
    });

    const searchInput = screen.getByTestId(mySearchInput);
    userEvent.type(searchInput, 'aaaa');
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(searchBtn);
    });
  });
});

describe('Test select\'s at SearchBar in Meals page', () => {
  it('Test if can switch in select\'s elements', () => {
    renderWithRouterAndRedux(<Meals />);

    const searchTopButton = screen.getByTestId(searchTopBtn);

    act(() => {
      userEvent.click(searchTopButton);
    });

    const byName = screen.getByRole('radio', {
      name: /name/i,
    });

    act(() => {
      userEvent.click(byName);
    });

    const searchInput = screen.getByTestId(mySearchInput);
    userEvent.type(searchInput, '');
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(searchBtn);
    });
  });
});
