import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function Aside() {
  return (
    <aside className='aside'>
      <div className='aside-container'>
        <div className='aside-logo'>logo</div>
        <div className='aside-divider' />
        <ul className='aside-menu'>
          <li>
            <div className='aside-menu-item'>
              <Link to='/'>Home</Link>
            </div>
          </li>
          <li>
            <div className='aside-menu-item'>
              <Link to='/projects'>Projects</Link>
            </div>
          </li>
          <li>
            <div className='aside-menu-item'>
              <Link to='/posts'>Posts</Link>
            </div>
          </li>
          <li>
            <div className='aside-menu-item'>
              <Link to='/contact'>Posts</Link>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
