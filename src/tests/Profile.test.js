import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import { renderWithRouterAndRedux } from './helpers/RenderWithRouter';

describe('Tests in Profile page', () => {
  it('Profiles render with localStorage', () => {
    renderWithRouterAndRedux(<Profile />);
  });
  it('Profiles render without localStorage', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'teste@trybe.com' }));
    renderWithRouterAndRedux(<Profile />);
    const logout = screen.getByTestId('profile-logout-btn');

    userEvent.click(logout);
  });
});
