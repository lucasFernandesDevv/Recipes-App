import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import logoRecipesApp from '../../images/logoRecipesApp.png';
import tomate from '../../images/tomate.png';

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
    default:
      setUserPassword(value);
      break;
    }
  }

  const validateEmail = useCallback(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(userEmail);
  }, [userEmail]);

  const validatePassword = useCallback(() => {
    const passwordRegex = /\S{7}/;
    return passwordRegex.test(userPassword);
  }, [userPassword]);

  function handleLogin(e) {
    e.preventDefault();
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
    <main className="flex flex-col justify-start items-center h-screen pb-4">
      <div className="bg-[#41197f] w-full h-[21rem] flex flex-col items-center mb-10">
        <img src={ logoRecipesApp } alt="" className="w-40 h-36 mt-12" />
        <img src={ tomate } alt="" className="w-full h-64" />
      </div>
      <form
        onSubmit={ handleLogin }
        className="flex flex-col justify-center gap-4 mt-12 pb-2 items-center"
      >
        <h1 className="text-xl text-violet-700 font-bold italic">LOGIN</h1>
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
              text-violet-700
              w-64
              p-2
              rounded
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
            text-violet-700
            ml-2
            w-64
            p-2
            rounded
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
