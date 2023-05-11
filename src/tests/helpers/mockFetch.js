// export const mockFetch = (data) => jest.fn(() => Promise.resolve({
//   ok: true,
//   json: () => Promise.resolve(data),
// }));

import fetch from '../../../cypress/mocks/fetch';

export const mockFetch = () => {
  jest.spyOn(global, 'fetch').mockImplementation(fetch);
};
