import React from 'react';

export default function Login() {
  return (
    <main>
      <form>
        <label htmlFor="email">
          Email
          <input type="email" name="email" id="email" />
        </label>
        <label htmlFor="password">
          Senha
          <input type="password" name="password" id="password" />
        </label>
        <button type="submit">
          Entrar
        </button>
      </form>
    </main>
  );
}
