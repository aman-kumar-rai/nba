const React = require("react");
const {Link} = require('react-router-dom');

function Navbar(props) {
  return (
    <nav id='header-nav'>
      <ul>
        <li className='nav-item'>
          <Link to="/">Home</Link>
        </li>
        <li className='nav-item'>
          <Link to="/teams">Teams</Link>
        </li>
        <li className='nav-item'>
          <Link to="/players">Players</Link>
        </li>
      </ul>
    </nav>
  );
}

module.exports = Navbar;
