import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Login() {
  const history = useHistory();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [validLoginFields, setValidLoginFields] = useState();

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

  const validateEmail = useCallback(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(userEmail);
  }, [userEmail]);

  const validatePassword = useCallback(() => {
    const passwordRegex = /\S{6}/;
    return passwordRegex.test(userPassword);
  }, [userPassword]);

  function handleLogin() {
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
    history.push('/meals');
  }

  useEffect(() => {
    if (validateEmail() && validatePassword()) {
      setValidLoginFields(true);
    } else {
      setValidLoginFields(false);
    }
  }, [userEmail, userPassword, validateEmail, validatePassword]);

  return (
    <main className="flex justify-center items-center h-screen">
      <form
        onSubmit={ handleLogin }
        className="flex flex-col justify-center gap-4 items-center"
      >
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
          disabled={ !validLoginFields }
          className="
            w-64
            ml-2
            bg-yellow-400
            rounded-md
            text-white
            font-extrabold
            p-2
            disabled:bg-zinc-400"
        >
          ENTER
        </button>
      </form>
    </main>
  );
}
