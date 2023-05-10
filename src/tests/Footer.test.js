import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/RenderWithRouter';
import Footer from '../components/Footer';

describe('Test if Header render', () => {
  it('Test Header render\'s render wit Title Meals', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByRole('img', {
      name: /página de drinks/i,
    });
    expect(footer).toBeInTheDocument();
  });
});
