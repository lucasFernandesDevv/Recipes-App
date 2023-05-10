import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/RenderWithRouter';
import SearchBar from '../components/SearchBar';
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
  it('If Render in Meals and search by name', () => {
    renderWithRouterAndRedux(<App />, initialState, '/meals');
    const searchImg = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchImg);
    });
    const name = screen.getByRole('radio', {
      name: /name/i,
    });

    userEvent.click(name);
    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'Corba');

    const search = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    act(() => {
      userEvent.click(search);
    });
  });

  it('If Render in Meals and search by first letter', () => {
    renderWithRouterAndRedux(<App />, initialState, '/meals');
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
    renderWithRouterAndRedux(<App />, initialState, '/meals');
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
  beforeEach(() => {
    mockFetch();
  });
  it('If Render in Drinks and search by name', () => {
    renderWithRouterAndRedux(<App />, initialState, '/drinks');
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
    renderWithRouterAndRedux(<App />, initialState, '/drinks');
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
    renderWithRouterAndRedux(<App />, initialState, '/drinks');
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
    mockFetch();
    global.alert = jest.fn();
  });
  it('If Render in Drinks and return wrong message', () => {
    renderWithRouterAndRedux(<App />, initialState, '/drinks');
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
    renderWithRouterAndRedux(<App />, initialState, '/drinks');
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
    renderWithRouterAndRedux(<App />, initialState, '/drinks');
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
    mockFetch();
  });
  it('If Render in Meals and return wrong message', () => {
    renderWithRouterAndRedux(<App />, initialState, '/meals');
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
    renderWithRouterAndRedux(<App />, initialState, '/meals');
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
    renderWithRouterAndRedux(<App />, initialState, '/meals');
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
    mockFetch();
  });
  it('Test if can switch in select\'s elements 1', () => {
    renderWithRouterAndRedux(<SearchBar />, initialState, '/drinks');

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
    renderWithRouterAndRedux(<SearchBar />, initialState, '/meals');

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
    renderWithRouterAndRedux(<SearchBar />, initialState, '/meals');

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

  // it('Test if can switch in select\'s elements 4', async () => {
  //   renderWithRouterAndRedux(<App />, initialState, '/meals');

  //   const searchImg = screen.getByTestId(searchTopBtn);
  //   userEvent.click(searchImg);

  //   const inputRadio = screen.getByRole('radio', {
  //     name: /ingredient/i,
  //   });

  //   userEvent.click(inputRadio);

  //   const searchInput = screen.getByTestId(searchInpt);
  //   userEvent.type(searchInput, 'xablau');
  //   const searchBtn = screen.getByRole('button', {
  //     name: /pesquisar/i,
  //   });
  //   userEvent.click(searchBtn);

  //   await waitFor(() => {
  //     expect(global.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  //   });
  // });
  xit('Test if can switch in select\'s elements 5', async () => {
    const { store } = renderWithRouterAndRedux(<App />, initialState, '/meals');

    const searchImg = await screen.findByTestId(searchTopBtn);

    userEvent.click(searchImg);

    const inputRadio = screen.getByRole('radio', {
      name: /name/i,
    });

    act(() => {
      userEvent.click(inputRadio);
    });
    const searchInput = screen.getByTestId(searchInpt);
    userEvent.type(searchInput, 'xablau');
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });

    userEvent.click(searchBtn);
    const myStore = store.getState();
    console.log(myStore);
    await waitFor(async () => {
      expect(await global.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });
});
