import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/RenderWithRouter';
import { initialState } from './helpers/initialState';
import { mockFetch } from './helpers/mockFetch';
import App from '../App';

const searchTopBtn = 'search-top-btn';
const searchInpt = 'search-input';

describe('Test SearchBar', () => {
  beforeEach(() => {
    mockFetch();
  });
  it('If Render in Meals', () => {
    renderWithRouterAndRedux(<App />, initialState, '/meals');
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
    renderWithRouterAndRedux(<App />, initialState, '/drinks');
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
  beforeEach(() => {
    mockFetch();
  });
  it('If Render in Meals and search by name', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/meals');
    const searchImg = await screen.findByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const ingredients = await screen.findByRole('radio', {
      name: /ingredient/i,
    });

    userEvent.click(ingredients);
    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'Chicken');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });
  it('If Render in Meals with name with no existes render correctly', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/meals');
    const searchImg = await screen.findByTestId(searchTopBtn);
    userEvent.click(searchImg);
    const ingredients = screen.getByRole('radio', {
      name: /name/i,
    });

    userEvent.click(ingredients);

    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'xablau');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    userEvent.click(search);
  });

  it('If Render in Drinks with name with no existes render correctly', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/drinks');
    const searchImg = await screen.findByTestId(searchTopBtn);
    userEvent.click(searchImg);
    const ingredients = screen.getByRole('radio', {
      name: /name/i,
    });

    userEvent.click(ingredients);

    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'xablau');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    userEvent.click(search);
  });
});
describe('Test SearchBar in Drinks', () => {
  beforeEach(() => {
    global.alert = jest.fn();
    mockFetch();
  });
  it('If Render in Drinks and search by name', () => {
    renderWithRouterAndRedux(<App />, initialState, '/drinks');
    const searchImg = screen.getByTestId(searchTopBtn);

    userEvent.click(searchImg);

    const name = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(name);
    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'Shake');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    userEvent.click(search);
    expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character');
  });
});
describe('Render first letter', () => {
  beforeEach(() => {
    mockFetch();
  });
  it('If Render in Meal by first Letter', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/meals');
    const searchImg = screen.getByTestId(searchTopBtn);

    userEvent.click(searchImg);

    const name = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(name);
    const textBox = screen.getByTestId(searchInpt);
    userEvent.type(textBox, 'k');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    userEvent.click(search);
  });
  it('If Render in Drinks by first Letter', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/drinks');
    const searchImg = screen.getByTestId(searchTopBtn);

    userEvent.click(searchImg);

    const name = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(name);
    const textBox = screen.getByTestId(searchInpt);
    userEvent.type(textBox, 'g');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    userEvent.click(search);
  });
});
