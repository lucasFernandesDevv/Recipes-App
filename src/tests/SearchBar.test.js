import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/RenderWithRouter';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import { mockFetch } from './helpers/mockFetch';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import SearchBar from '../components/SearchBar';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import { initialState } from './helpers/initialState';
import oneMeal from '../../cypress/mocks/oneMeal';

const searchTopBtn = 'search-top-btn';
const searchInpt = 'search-input';

describe('Test SearchBar', () => {
  it('If Render in Meals', () => {
    mockFetch(meals);
    renderWithRouterAndRedux(<Meals />, { initialState }, '/meals');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const ingredients = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const name = screen.getByRole('radio', {
      name: /name/i,
    });
    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(ingredients);
    expect(ingredients).toBeChecked();
    expect(name).not.toBeChecked();
    expect(firstLetter).not.toBeChecked();

    userEvent.click(name);
    expect(name).toBeChecked();
    expect(ingredients).not.toBeChecked();
    expect(firstLetter).not.toBeChecked();

    userEvent.click(firstLetter);
    expect(firstLetter).toBeChecked();
    expect(ingredients).not.toBeChecked();
    expect(name).not.toBeChecked();
  });
  it('If Render in Drinks', () => {
    mockFetch(drinks);
    renderWithRouterAndRedux(<Drinks />, { initialState }, '/drinks');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const ingredients = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const name = screen.getByRole('radio', {
      name: /name/i,
    });
    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(ingredients);
    expect(ingredients).toBeChecked();
    expect(name).not.toBeChecked();
    expect(firstLetter).not.toBeChecked();

    userEvent.click(name);
    expect(name).toBeChecked();
    expect(ingredients).not.toBeChecked();
    expect(firstLetter).not.toBeChecked();

    userEvent.click(firstLetter);
    expect(firstLetter).toBeChecked();
    expect(ingredients).not.toBeChecked();
    expect(name).not.toBeChecked();
  });
});

describe('Test SearchBar in Meals', () => {
  it('If Render in Meals and search by name', () => {
    mockFetch(meals);
    renderWithRouterAndRedux(<Meals />, { initialState }, '/meals');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const name = screen.getByRole('radio', {
      name: /name/i,
    });

    userEvent.click(name);
    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'Spicy');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });

  it('If Render in Meals and search by first letter', () => {
    mockFetch(meals);
    renderWithRouterAndRedux(<Meals />, { initialState }, '/meals');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(firstLetter);

    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'S');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });
  it('If Render in Meals and search by first letter', () => {
    mockFetch(meals);
    renderWithRouterAndRedux(<Meals />, { initialState }, '/meals');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(firstLetter);

    const ingredients = screen.getByRole('radio', {
      name: /ingredient/i,
    });

    userEvent.click(ingredients);

    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'milk');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });
});

describe('Test SearchBar in Drinks', () => {
  it('If Render in Drinks and search by name', () => {
    mockFetch(drinks);
    renderWithRouterAndRedux(<Drinks />, { initialState }, '/drinks');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const name = screen.getByRole('radio', {
      name: /name/i,
    });

    userEvent.click(name);
    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'Gin');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });

  it('If Render in Drinks and search by first letter', () => {
    mockFetch(drinks);
    renderWithRouterAndRedux(<Drinks />, { initialState }, '/drinks');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(firstLetter);

    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'G');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });
  it('If Render in Drinks and search by ingredients', () => {
    mockFetch(drinks);
    renderWithRouterAndRedux(<Drinks />, { initialState }, '/drinks');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(firstLetter);

    const ingredients = screen.getByRole('radio', {
      name: /ingredient/i,
    });

    userEvent.click(ingredients);

    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'gin');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });
});

describe('Test SearchBar in Drinks', () => {
  beforeEach(() => {
    global.alert = jest.fn();
  });
  it('If Render in Drinks and return wrong message', () => {
    mockFetch(drinks);
    renderWithRouterAndRedux(<Drinks />, { initialState }, '/drinks');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const name = screen.getByRole('radio', {
      name: /name/i,
    });

    userEvent.click(name);
    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'Ginas');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });

  it('If Render in Drinks and return wrong message in first letter', () => {
    mockFetch(drinks);
    renderWithRouterAndRedux(<Drinks />, { initialState }, '/drinks');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(firstLetter);

    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, '8');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });
  it('If Render in Drinks and search by ingredients', () => {
    mockFetch(drinks);
    renderWithRouterAndRedux(<Drinks />, { initialState }, '/drinks');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(firstLetter);

    const ingredients = screen.getByRole('radio', {
      name: /ingredient/i,
    });

    userEvent.click(ingredients);

    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'Ginas');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });
});

describe('Test SearchBar in Meals', () => {
  beforeEach(() => {
    global.alert = jest.fn();
  });
  it('If Render in Meals and return wrong message', () => {
    mockFetch(meals);
    renderWithRouterAndRedux(<Meals />, { initialState }, '/meals');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const name = screen.getByRole('radio', {
      name: /name/i,
    });

    userEvent.click(name);
    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'Ginas');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });

  it('If Render in Meals and return wrong message in first letter', () => {
    mockFetch(meals);
    renderWithRouterAndRedux(<Meals />, { initialState }, '/meals');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(firstLetter);

    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, '8');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });
  it('If Render in Meals and search by ingredients', () => {
    mockFetch(meals);
    renderWithRouterAndRedux(<Meals />, { initialState }, '/meals');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(firstLetter);

    const ingredients = screen.getByRole('radio', {
      name: /ingredient/i,
    });

    userEvent.click(ingredients);

    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'Ginas');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });
});

describe('Test select\'s at SearchBar in Meals page', () => {
  beforeEach(() => {
    global.alert = jest.fn();
  });
  it('Test if can switch in select\'s elements 1', () => {
    mockFetch(drinks);
    renderWithRouterAndRedux(<SearchBar />, { initialState }, '/drinks');

    const inputRadio = screen.getByRole('radio', {
      name: /first letter/i,
    });

    act(() => {
      userEvent.click(inputRadio);
    });

    const searchInput = screen.getByTestId(searchInpt);
    userEvent.type(searchInput, 'Aa');
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(searchBtn);
    });
  });
  it('Test if can switch in select\'s elements 2', () => {
    mockFetch(emptyMeals);
    renderWithRouterAndRedux(<SearchBar />, { initialState }, '/meals');

    const inputRadio = screen.getByRole('radio', {
      name: /first letter/i,
    });

    act(() => {
      userEvent.click(inputRadio);
    });

    const searchInput = screen.getByTestId(searchInpt);
    userEvent.type(searchInput, 'Z');
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(searchBtn);
    });
  });
  it('Test if can switch in select\'s elements 3', () => {
    mockFetch(meals);
    renderWithRouterAndRedux(<SearchBar />, { initialState }, '/meals');

    const inputRadio = screen.getByRole('radio', {
      name: /name/i,
    });

    act(() => {
      userEvent.click(inputRadio);
    });

    const searchInput = screen.getByTestId(searchInpt);
    userEvent.type(searchInput, 'Zeca');
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(searchBtn);
    });
  });
  it('Test if can switch in select\'s elements', async () => {
    mockFetch(emptyMeals);
    renderWithRouterAndRedux(<Meals />, initialState, '/meals');

    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });

    const inputRadio = screen.getByRole('radio', {
      name: /ingredient/i,
    });

    act(() => {
      userEvent.click(inputRadio);
    });
    const searchInput = screen.getByTestId(searchInpt);
    userEvent.type(searchInput, 'milk');
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(searchBtn);
    });
    await waitFor(() => {
      expect(global.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });
  it('Test if can switch in select\'s elements', async () => {
    mockFetch(oneMeal);
    renderWithRouterAndRedux(<Meals />, initialState, '/meals');

    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });

    const inputRadio = screen.getByRole('radio', {
      name: /name/i,
    });

    act(() => {
      userEvent.click(inputRadio);
    });
    const searchInput = screen.getByTestId(searchInpt);
    userEvent.type(searchInput, 'milk');
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(searchBtn);
    });
    await waitFor(() => {
      expect(global.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });
});
