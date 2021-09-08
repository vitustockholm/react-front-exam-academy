import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import '../assets/styles/home_page.css';
import { CARS_URI } from '../utils/endpoints';
import { Link } from 'react-router-dom';
//////////////////////
import { Container, Row, Col } from 'react-bootstrap';
import VotingCard from '../components/VotingCard';
import teamsJson from '../lib/teams.json';

import 'bootstrap/dist/css/bootstrap.css';
//////
// Created components import
import Like from '../components/Like';
// import VotesCard from '../components/VotingCard';

//logic
let sortas;
const HomeScreen = () => {
  const [carList, setCarList] = useState([]); // useState
  const carLoadFailed = useRef(false); //useRef

  const getCarList = async (URI) => {
    return await axios
      .get(URI)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        carLoadFailed.current = true;
        return [];
      });
  };

  useEffect(() => {
    (async () => {
      const carList = await getCarList(CARS_URI);
      setCarList(carList);
    })();
    // console.log(carList);
  }, []);

  ///////////////////

  let [teams, setTeams] = useState([]);
  useEffect(() => {
    setTeams(teamsJson);
  }, []);

  let [votes, setVotes] = useState([]);
  useEffect(() => {
    setVotes(teamsJson);
  }, []);

  function incrementVoteCount(teamId) {
    teams = teams.map((team) => {
      if (team._id === teamId) {
        team.votes = team.votes + 1;
      }
      return team;
    });
    setTeams(teams);
  }

  function decrementVoteCount(teamId) {
    teams = teams.map((team) => {
      if (team._id === teamId) {
        team.votes = team.votes - 1;
        sortas(team.votes);
      }
      return team;
    });
    setTeams(teams);
  }
  let sortas = function (a, b) {
    return b - a;
  };
  /////////////////////
  // Sort the numbers in descending order:
  // points.sort(function(a, b){return b-a});
  // points[0] = 100 (the highest value)
  ///////////////////////
  return (
    <>
      <main>
        <div className='container'>
          <section>
            <h1 className='headline-1'>
              Voting, Football - World online Vote Poll!
            </h1>
          </section>
          <section>
            <div id='latest-cars'>
              {carLoadFailed.current ? (
                <p className='form-message form-message-danger'>
                  Something went wrong. Can't get teams and votes from server!!!
                  Temporary error, contact support!!!
                </p>
              ) : carList.length ? (
                carList.map((car) => (
                  <div className='car card-shadow' key={car._id}>
                    {/* ///////////////////////////// */}
                    <h4>{console.log('car', car)}</h4>
                    {/* /////////////////////////////////// */}
                    {/* <p>Year: {car.cars[0].year}</p> */}
                    <p>Price: ${car.name}</p>
                    <p>id: ${car._id}</p>
                    <p>pass: ${car.password}</p>
                    <p>
                      Seller: {car.name} {car.surname}
                    </p>
                    <p>Email: {car.email}</p>
                    <Like />
                  </div>
                ))
              ) : (
                <p className='form-message form-message-danger'>
                  Loading cars...
                </p>
              )}
            </div>
            <Container>
              <Row>
                {teams.map((team) => {
                  return (
                    <Col md={4}>
                      <VotingCard
                        team={team}
                        vote={votes}
                        incrementVoteCount={(teamId) =>
                          incrementVoteCount(teamId)
                        }
                        decrementVoteCount={(teamId) =>
                          decrementVoteCount(teamId)
                        }
                      />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </section>
        </div>
      </main>
    </>
  );
};

export default HomeScreen;
