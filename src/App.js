import React, { useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
/////votecard-votecard.jsxe/homescreen----//////
// import { Container, Row, Col } from 'react-bootstrap';
// import VotingCard from './components/VotingCard';
// import teamsJson from './lib/teams.json';
import './assets/scss/styles.scss';
import 'bootstrap/dist/css/bootstrap.css';
////////////////////////////

// Screens (pages)
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProtectedRoute from './ProtectedRoute';

// Components
import Header from './components/Header';
//Styles-resets/css/designing
import './assets/styles/resets.css';
import './assets/styles/utilities.css';

// CONTEXT
export const UserContext = React.createContext();

// STATE MANAGEMENT
// -- global
const initialState = { user: '' };
const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      return { user: action.payload };
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: '' };
    default:
      return state;
  }
};

function App() {
  // Hooks

  // -- state
  const [state, dispatch] = useReducer(reducer, initialState);
  ///////////////////////////
  // let [teams, setTeams] = useState([]);
  // useEffect(() => {
  //   setTeams(teamsJson);
  // }, []);

  // let [votes, setVotes] = useState([]);
  // useEffect(() => {
  //   setVotes(teamsJson);
  // }, []);
  // ///////////////////////
  // console.log('teamsArr____fromJSON__APPJS-', teamsJson);
  // ////////////////////////

  // function incrementVoteCount(teamId) {
  //   teams = teams.map((team) => {
  //     if (team._id === teamId) {
  //       team.votes = team.votes + 1;
  //     }
  //     return team;
  //   });
  //   setTeams(teams);
  // }

  // function decrementVoteCount(teamId) {
  //   teams = teams.map((team) => {
  //     if (team._id === teamId) {
  //       team.votes = team.votes - 1;
  //     }
  //     return team;
  //   });
  //   setTeams(teams);
  // }

  ///////////////////////////

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/my-account' component={ProtectedRoute} />
          </Switch>
        </Router>
        {/* <Container>
          <Row>
            {teams.map((team) => {
              return (
                <Col md={4}>
                  <VotingCard
                    team={team}
                    vote={votes}
                    incrementVoteCount={(teamId) => incrementVoteCount(teamId)}
                    decrementVoteCount={(teamId) => decrementVoteCount(teamId)}
                  />
                </Col>
              );
            })}
          </Row>
        </Container> */}
      </UserContext.Provider>
    </>
  );
}

export default App;
