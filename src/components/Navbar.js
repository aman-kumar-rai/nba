const React = require("react");
const {Link} = require('react-router-dom');

function Navbar(props) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/teams">Teams</Link>
        </li>
        <li>
          <Link to="/players">Players</Link>
        </li>
      </ul>
    </nav>
  );
}

module.exports = Navbar;
