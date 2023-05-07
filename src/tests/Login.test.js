import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/RenderWithRouter';

describe('Testes da tela de login', () => {
  it('Deve renderizar a tela de login corretamente', () => {
    renderWithRouter(<App />);

    const titleElement = screen.getByRole('heading', { level: 1, name: /login/i });
    const emailInputElement = screen.getByPlaceholderText(/email/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const loginButtonElement = screen.getByRole('button', { name: /enter/i });

    expect(titleElement).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(loginButtonElement).toBeInTheDocument();
  });

  it('É possível escrever o email e a senha', () => {
    const userTestEmail = 'test@tryber.com';
    const userTestPassword = '1234567';

    renderWithRouter(<App />);

    const emailInputElement = screen.getByPlaceholderText(/email/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);

    userEvent.type(emailInputElement, userTestEmail);
    userEvent.type(passwordInputElement, userTestPassword);

    expect(emailInputElement).toHaveValue(userTestEmail);
    expect(passwordInputElement).toHaveValue(userTestPassword);
  });
  it('Habilita o botão de login apenas se a validação do formulário for verdadeira', () => {
    const userTestEmail = 'test@tryber.com';
    const userTestPassword = '1234567';

    renderWithRouter(<App />);

    const emailInputElement = screen.getByPlaceholderText(/email/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const loginButtonElement = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInputElement, 'wrongEmail');
    userEvent.type(passwordInputElement, 'small');

    expect(loginButtonElement).toBeDisabled();

    userEvent.clear(emailInputElement);
    userEvent.clear(passwordInputElement);
    userEvent.type(emailInputElement, userTestEmail);
    userEvent.type(passwordInputElement, userTestPassword);

    expect(loginButtonElement).toBeEnabled();
  });
  it('Salva o email do usuário na localStorage após o login', () => {
    const userTestEmail = 'test@trybe.com';

    renderWithRouter(<App />);

    const emailInputElement = screen.getByPlaceholderText(/email/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const loginButtonElement = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInputElement, userTestEmail);
    userEvent.type(passwordInputElement, '1234567');
    userEvent.click(loginButtonElement);

    const user = JSON.parse(localStorage.getItem('user'));

    expect(user.email).toBe(userTestEmail);
  });
  it('Redireciona a pessoa usuária para a tela de receitas de comidas após o login', () => {
    const userTestEmail = 'test@tryber.com';
    const userTestPassword = '1234567';

    const { history } = renderWithRouter(<App />);

    const emailInputElement = screen.getByPlaceholderText(/email/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const loginButtonElement = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInputElement, userTestEmail);
    userEvent.type(passwordInputElement, userTestPassword);

    act(() => {
      userEvent.click(loginButtonElement);
    });

    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });
});
