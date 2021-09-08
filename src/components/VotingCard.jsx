import React from 'react';
import { Card, Button } from 'react-bootstrap';

function VotingCard(props) {
  let { team, incrementVoteCount, decrementVoteCount } = props;

  ////////////--TESTS--///////////////////
  // - futbolo komandos array on screen log
  // console.log('team votingcardjsxe', team);
  // console.log(team._id);
  // console.log(team);
  /////////////////////////////////////////

  return (
    <>
      {/* {console.log(team.logo)} */}
      <div>
        <ul>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant='top' src={`${team.logo}`} />
            <Card.Body>
              <Card.Title>{team.name}</Card.Title>
              <Button
                variant='success'
                onClick={() => incrementVoteCount(team._id)}
                key={team._id}
              >
                Vote
              </Button>
              <Button
                variant='notsuccess'
                onClick={() => decrementVoteCount(team._id)}
                key={team._id + 1}
              >
                UNVote
              </Button>
            </Card.Body>
            <Card.Footer>
              Vote count:
              {team.votes}
            </Card.Footer>
          </Card>
        </ul>
      </div>
    </>
  );
}

export default VotingCard;
