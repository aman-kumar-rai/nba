const React = require("react");
const Sidebar = require('./Sidebar.js');
const {getTeamNames} = require('../api.js');
const {Link, Route} = require('react-router-dom');
const TeamLogo = require('./TeamLogo.js');

class Teams extends React.Component {

  constructor(props){
    super(props);
    state = {
      teamNames: [],
      loading: true
    }
  }

  // gettingt the name of teams when the component mounts and changing the state with the new data and thus causing a re-render...
  componentDidMount(){
    getTeamNames().
      then((teamNames) => {
        this.setState({
          loading: false,
          teamNames: teamNames
        });
      });
  }

  render() {

    // another workaround and we will fix this one later as well...
    if(!this.state){
      return null;
    }

    const {loading, teamNames} = this.state;
    const {location, match} = this.props;

    return (
      <div id='teams'>

        {
          // rendering the message to select a team if none is selected...
          loading === false && location.pathname === '/teams'?
          <p>Please Select a Team</p>:
          null
        }

        <Sidebar 
          loading={loading}
          list={teamNames}
          title='Teams'
          {...this.props}
        />
      </div>
    );
  }
}

module.exports = Teams;
