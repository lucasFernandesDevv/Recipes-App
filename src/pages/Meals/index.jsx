import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

export default function Meals() {
  return (
    <div>
      <Header title="Meals" />
      <Link to="/drinks/123">Drink 123</Link>
    </div>
  );
}
