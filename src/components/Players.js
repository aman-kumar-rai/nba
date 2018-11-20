const React = require("react");
const { Route, Link } = require("react-router-dom");
const Sidebar = require("./Sidebar.js");
const { getPlayers } = require("../api.js");
const slug = require("slug");
const { parse } = require("query-string");
const Teams = require('./Teams.js');

class Players extends React.Component {
  constructor(props) {
    super(props);
    state = {
      players: [],
      loading: true
    };
  }

  componentDidMount() {
    const { location } = this.props;

    // checking if the url has a query parameter and rendering based on that...
    location.search
      ? // making a request for players of a particular team and getting the team name by parsing the query parameter...
        this.fetchPlayers(parse(location.search).teamName)
      : // making a request for all the players
        this.fetchPlayers();
  }

  // this method fetches the players and when the Promise is resolved, it changes the state by making players the array of players received and loading as false an thus causing a re-render...

  fetchPlayers(teamName) {
    getPlayers(teamName).then(players => {
      this.setState({
        loading: false,
        players: players
      });
    });
  }

  render() {
    // this again is a workaround and we will fix it later...
    if (!this.state) {
      return <h3>Please wait...</h3>;
    }

    const { players, loading } = this.state;
    const { match, location } = this.props;

    // {...props} is required cause this Players component is rendered by a Route which passes it match, location and history and we want to pass those to Sidebar as props...
    return (
      <div id='players'>
        
        {
          // displaying this component if the user has not selected any player
          (loading === false && location.pathname==='/players')?
          <p>Please select a player</p>:
          null
        }
        
        <Route
          path={`${match.url}/:playerId`} 
          
          // this match is different, it is props.match which is passed to this component by the Route component...
          render={({match}) => {
            if(loading === true){
              return null;
            }

            // destructuring the details of the player...
            const {
              name, position, teamId, number, avatar, apg, ppg, rpg, spg
            } = players.find(function(player){
              return slug(player.name) === match.params.playerId;
            })

            return (
              <div>
                <img className='avatar' src={avatar} alt={`${name}'s avatar`} />
                <h1>{name}</h1>
                <h3>#{number}</h3>
                <div>
                  <ul>
                    <li>
                      Team
                      <div>
                        <Link style={{color: '#68809a'}} to={`/${teamId}`}>
                          {teamId[0].toUpperCase() + teamId.slice(1)}
                        </Link>
                      </div>
                    </li>
                    <li>Position<div>{position}</div></li>
                    <li>PPG<div>{ppg}</div></li>
                  </ul>
                  <ul>
                    <li>APG<div>{apg}</div></li>
                    <li>SPG<div>{spg}</div></li>
                    <li>RPG<div>{rpg}</div></li>
                  </ul>
                </div>
              </div>
            );

          }}
        >
        </Route>

        <Sidebar
          loading={loading}
          title="Players"
          list={players.map(function(player) {
            return player.name;
          })}
          {...this.props}
        />
      </div>
    );
  }
}

module.exports = Players;
