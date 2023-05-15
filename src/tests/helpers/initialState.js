export const initialState = {
  recipes: {
    meals: [],
    drinks: [],
    mealsCategories: [
      // { strCategory: 'Beef' },
      // { strCategory: 'Breakfast' },
      // { strCategory: 'Chicken' },
      // { strCategory: 'Dessert' },
      // { strCategory: 'Goat' },
    ],
    drinksCategories: [
      // {
      //   strCategory: 'Ordinary Drink',
      // },
      // {
      //   strCategory: 'Cocktail',
      // },
      // {
      //   strCategory: 'Shake',
      // },
      // {
      //   strCategory: 'Other/Unknown',
      // },
      // {
      //   strCategory: 'Cocoa',
      // },
      // {
      //   strCategory: 'Shot' },
    ],
    filteredMealsByCategory: [],
    filteredDrinksByCategory: [],
  },
};

export const myHistory = { push: jest.fn() };
