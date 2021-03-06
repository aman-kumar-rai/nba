const React = require("react");
const {
  BrowserRouter: Router,
  Route,
  Switch,
  Link
} = require("react-router-dom");
const ScrollToTop = require("./ScrollToTop.js");

const Home = require("./Home.js");
const Players = require("./Players.js");
const Teams = require("./Teams.js");
const Navbar = require("./Navbar.js");

function App(props) {
  return (
    <Router>
      <ScrollToTop>
        <div>
          <header>
            <Navbar />
          </header>

          <main>
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/players" component={Players} />
              <Route path="/teams" component={Teams} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </main>
        </div>
      </ScrollToTop>
    </Router>
  );
}

module.exports = App;
