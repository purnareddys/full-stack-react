import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
  return (
   
    <header class="header-login-signup">

            <div class="header-limiter">

              <h1><a href="/">Coding<span>Cafe</span></a></h1>

              <nav>
                <Link to="/">Home</Link>
                <a  class="selected"><Link to ="/">About App</Link></a>
                <a ><Link to="/">Contact Us</Link></a>
              </nav>

              <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </ul>

            </div>

            </header>
  );
}

export default Header;