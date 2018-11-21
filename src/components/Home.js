const React = require("react");
const { Link} = require("react-router-dom");
const TeamLogo = require("./TeamLogo.js");
const { getTeamNames } = require("../api.js");

class Home extends React.Component {
  constructor(props) {
    super(props);
    state = {
      teamNames: []
    };
  }

  // getting the name of teams when the Home component mounts
  componentDidMount() {
    // console.log("Home mounted");
    getTeamNames().then(teamNames => {
      this.setState(function(previousState){
        return {
          teamNames: teamNames
        }
      });

    });
  }

  componentWillUnmount() {
    // console.log("Home unmounted");
  }

  render() {
    // this is a way around an error which is that the render is getting invoked twice when it is be supposed to be called only once, lets see if this fixes the issue...
    // we are returning an erro cause otherwise it will cause an error cause render is supposed to return some UI...
    // i will replace this with the loading component but that does not fix the problem, i will have to think about the error...
    // console.log(this.state);
    if (this.state === null) {
      return <h3>Please wait</h3>;
    }

    const { teamNames } = this.state;

    return (
      <div id="home">
        <h1>National Basketball Academy</h1>
        <h3>Select a Team</h3>

        <div id="team-logos">
          {this.state.teamNames.map(function(teamName) {
            return (
              <Link to={`/${teamName}`} key={teamName}>
                <TeamLogo id={teamName} />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

module.exports = Home;
