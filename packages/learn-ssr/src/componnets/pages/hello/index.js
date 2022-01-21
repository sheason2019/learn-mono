import React from 'react';
import { Link } from 'react-router-dom';

const HelloWorld = () => {
  return (
    <div>
      <div>Hello World</div>
      <Link to="/">To Counter</Link>
    </div>
  );
};

export default HelloWorld;
