import fetch from './fetch';

export const mockFirst = () => {
  console.log('oi');
  jest.spyOn(global, 'fetch').mockImplementation(fetch);
};
