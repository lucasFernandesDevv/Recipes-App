export const mockFetch = (data) => jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(data),
}));
