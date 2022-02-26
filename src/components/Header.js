import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <header className='header bg-white my-3'>
      <ul className='nav flex justify-content-center py-4'>
        <li className='nav-item mr-3'>
          <Link className='text-dark' to='/box-shadow'>
            Box shadow
          </Link>
        </li>
        <li className='nav-item mr-3'>
          <Link className='text-dark' to='/text-shadow'>
            Text shadow
          </Link>
        </li>
        <li className='nav-item mr-3'>
          <Link className='text-dark' to='/border'>
            Border
          </Link>
        </li>
        <li className='nav-item mr-3'>
          <Link className='text-dark' to='/transform'>
            Transform
          </Link>
        </li>
        <li className='nav-item mr-3'>
          <Link className='text-dark' to='/gradient'>
            Gradient
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
