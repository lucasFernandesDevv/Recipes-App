import fetchFirstLetter from './fetchFirstLetter';

export const mockFirst = () => {
  jest.spyOn(global, 'fetch').mockImplementation(fetchFirstLetter);
};
