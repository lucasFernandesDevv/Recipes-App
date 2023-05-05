import React, { useState } from 'react';

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  function handleInput({ target: { name, value } }) {
    switch (name) {
    case 'email':
      setUserEmail(value);
      break;
    case 'password':
      setUserPassword(value);
      break;
    default:
      break;
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <form className="flex flex-col justify-center gap-4 items-center">
        <h1 className="text-xl text-violet-700 italic">LOGIN</h1>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            data-testid="email-input"
            onChange={ (e) => handleInput(e) }
            className="
              border-2
              border-violet-300
              outline-none
              placeholder-violet-300
              ml-2
              w-64
              p-2
              "
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            data-testid="password-input"
            onChange={ (e) => handleInput(e) }
            className="
            border-2
            border-violet-300
            outline-none
            placeholder-violet-300
            ml-2
            w-64
            p-2
            "
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          className="w-64 ml-2 bg-yellow-400 rounded-md text-white font-extrabold p-2"
        >
          ENTER
        </button>
      </form>
    </main>
  );
}
