import fetch from './fetch';

export const mockFirst = () => {
  jest.spyOn(global, 'fetch').mockImplementation(fetch);
};
