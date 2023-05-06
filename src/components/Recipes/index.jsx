import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function Recipes() {
  const { id } = useParams();
  return (
    <div>{ id }</div>
  );
}

export default Recipes;
