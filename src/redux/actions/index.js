import { SAVE_DRINKS, SAVE_MEALS } from '../helpers/variables';

// Coloque aqui suas actions
export const saveDrinks = (payload) => ({
  type: SAVE_DRINKS,
  payload,
});

export const saveMeals = (payload) => ({
  type: SAVE_MEALS,
  payload,
});

// export const addUser = (email) => ({
//   type: USER,
//   email,
// });

// export const addWallet = (payload) => ({
//   type: SAVE_EXPENSE,
//   payload,
// });

// export const editWallet = (payload) => ({
//   type: 'EDIT_WALLET',
//   payload,
// });

// export const succedRequest = (payload) => ({
//   type: 'SUCCEEDED_REQUEST',
//   payload,
// });

// export const updateWallet = (payload) => ({
//   type: 'UPDATE_WALLET',
//   payload,
// });

// export const saveWallet = (payload) => ({
//   type: 'SAVE_WALLET',
//   payload,
// });

// export const updateTotal = (payload) => ({
//   type: 'UPDATE_TOTAL',
//   payload,
// });

export const fetchApiThunk = () => async () => {
  // dispatch(getCurrencies());
};
