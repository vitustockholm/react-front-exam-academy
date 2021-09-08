import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

import { UserContext } from '../App';
import { CARS_URI } from '../utils/endpoints';

import { DELETE_CAR_URI, ADD_CAR_URI, USERS_URI } from '../utils/endpoints';

// import Like from '../components/Like';
import '../assets/styles/my_account_page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const MyAccountScreen = () => {
  const { dispatch, state } = useContext(UserContext);
  const history = useHistory();

  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userCars, setUserCars] = useState([]);

  const [addCarMessage, setAddCarMessage] = useState('');
  const addCarMessageElemRef = useRef();

  const [removeCarMessage, setRemoveCarMessage] = useState('');
  const removeCarMessageElemRef = useRef();

  const carMakeInputRef = useRef();
  const carModelInputRef = useRef();
  const carYearInputRef = useRef();
  const carPriceInputRef = useRef();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      // if not emtpty []
      (async () => {
        // for every time to manage
        if (!userID) {
          const userID = localStorage.getItem('user');
          const userData = await getUserData(USERS_URI, userID); // grab data

          setUserName(userData.name); //set values from input
          setUserSurname(userData.surname);
          setUserEmail(userData.email);
          setUserID(userData._id);
          setUserCars(userData.cars);
          ////////---test------////
          // console.log('userdata', userData.cars.length); //test
          ////////---test----///
        }
      })();
    } else history.push('/login'); // ban ->back to begining
  });

  /////////////////////////////////////
  // const [carListas, setCarListas] = useState([]);
  // const carLoadFailed = useRef(false);
  // const getCarListas = async (URI) => {
  //   return await axios
  //     .get(URI)
  //     .then((res) => res.data)
  //     .catch((err) => {
  //       console.log(err);
  //       carLoadFailed.current = true;
  //       return [];
  //     });
  // };

  // useEffect(() => {
  //   (async () => {
  //     const carListas = await getCarListas(CARS_URI);
  //     setCarListas(carListas);
  //   })();
  // }, []);

  ///////////////////////////
  const displayAddCarMessage = (message, result = false) => {
    // if 1team ok => seting up response message throw classes
    const elem = addCarMessageElemRef.current;
    if (result) {
      elem.className = '';
      elem.classList.add('form-message-success', 'form-message');
    } else {
      elem.className = '';
      elem.classList.add('form-message-danger', 'form-message');
    }
    setAddCarMessage(message);
  };

  const displayRemoveTeamMessage = (message, result = false) => {
    // if deleting team => seting up response message throw classes
    const elem = removeCarMessageElemRef.current;
    if (result) {
      elem.className = '';
      elem.classList.add('form-message-success', 'form-message');
    } else {
      elem.className = '';
      elem.classList.add('form-message-danger', 'form-message');
    }
    setRemoveCarMessage(message); // set message for input  data check response
  };

  const getUserData = async (URI, userID) => {
    return await axios
      .get(URI + userID)
      .then((res) => res.data)
      .catch((err) => err);
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  };

  const deleteCar = (carID) => {
    axios
      .delete(DELETE_CAR_URI + carID)
      .then((res) => {
        setUserCars(res.data.cars);
        displayRemoveTeamMessage(
          'Team deleted, goodluck for next time!!!',
          true
        );
      })
      .catch((err) => displayRemoveTeamMessage(err, false)); //catch err !important
  };
  ////////
  // console.log('userCars-124', userCars); // user carsr list arr
  ////////
  const addCar = (e) => {
    e.preventDefault();
    const carMakeValue = carMakeInputRef.current.value;
    const carModelValue = carModelInputRef.current.value;
    const carYearValue = carYearInputRef.current.value;
    const carPriceValue = carPriceInputRef.current.value;
    if (userCars.length) {
      displayAddCarMessage('You already have 1 team!!!', false);
      ///////////---TEST----////
      // console.log('addCarTesting', userCars.length);
      ////////////
      return; //-- if You have team enought for you
    }

    if (!carMakeValue || !carModelValue || !carYearValue || !carPriceValue) {
      displayAddCarMessage('Please fill out all form inputs!!!', false);
      return; //error if not all inputs filled
    }
    // carPriceValue.replaceAll(',', '.'); //for parsing and managing logic
    if (isNaN(carYearValue) || isNaN(carPriceValue)) {
      displayAddCarMessage('Goals must be a number!!!', false);
      return;
    }
    ///////////////////////////////////

    let car = {
      make: carMakeValue,
      model: carModelValue,
      year: carYearValue,
      price: carPriceValue,
    };

    axios
      .put(ADD_CAR_URI + userID, car)
      .then((res) => {
        setUserCars(res.data.cars);
        ///////---TEST-----//////////
        // console.log('test101', res.data);
        // console.log('test1099991', res.data.cars);
        ////////----TEST-----///////
        displayAddCarMessage(
          `${car.make} ${car.model} successfully added`,
          true
        );
      })
      .catch((err) => displayAddCarMessage(err, false));
  };
  return (
    <main>
      <div className='container'>
        <section>
          <h1 className='headline-1'>
            Hello, <span id='user-name'>{userName}</span>
          </h1>
        </section>
        <section id='user'>
          <div id='user__info' className='card-shadow'>
            <div>
              <FontAwesomeIcon icon={faUser} size='1x' />
              <br />
              <br />
            </div>

            <h3>
              {userName} {userSurname}
            </h3>
            <p key={userEmail}>Email: {userEmail}</p>
            {userCars.map((car) => (
              <>
                <p key={car.make}>Team name: {car.make}</p>{' '}
                <p key={userSurname}>Origin: {car.model}</p>
                <p key={userName}>Votes: {car.year}</p>
                <p key={car.price}>Goals: {car.price}</p>
              </>
            ))}
          </div>
          <div id='user__cars'>
            <div id='user__cars-list'>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Origin</th>
                    <th>Goals</th>
                    <th>Created</th>
                    <th>Votes: 0</th>
                  </tr>
                </thead>
                <tbody>
                  {userCars.map((car) => (
                    <tr key={car._id}>
                      <td>{car.make}</td>
                      <td>{car.model}</td>
                      <td>{car.year}</td>
                      <td>{car.price}</td>
                      <td>
                        <button
                          className='btn-primary btn-delete-car'
                          onClick={() => deleteCar(car._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div id='user__cars-add-new' className='card-shadow'>
              <h6>Want to add Your favourite football team in votin poll?</h6>
              <h2>Enter info!</h2>
              <p
                className='hidden form-message'
                ref={removeCarMessageElemRef}
                key={removeCarMessage}
              >
                {removeCarMessage}
              </p>
              <form id='addNewCarForm' className='form'>
                <p className='hidden form-message' ref={addCarMessageElemRef}>
                  {addCarMessage}
                </p>
                <div className='form-control'>
                  <label className='form-label' htmlFor='carMake'>
                    Make
                  </label>
                  <input
                    className='form-input'
                    type='text'
                    id='carMake'
                    ref={carMakeInputRef}
                  />
                </div>

                <div className='form-control'>
                  <label className='form-label' htmlFor='carModel'>
                    Model
                  </label>
                  <input
                    className='form-input'
                    type='text'
                    id='carModel'
                    ref={carModelInputRef}
                  />
                </div>

                <div className='form-control'>
                  <label className='form-label' htmlFor='carYear'>
                    Year
                  </label>
                  <input
                    className='form-input'
                    type='text'
                    id='carYear'
                    ref={carYearInputRef}
                  />
                </div>

                <div className='form-control'>
                  <label className='form-label' htmlFor='carPrice'>
                    Price
                  </label>
                  <input
                    className='form-input'
                    type='text'
                    id='carPrice'
                    ref={carPriceInputRef}
                  />
                </div>

                <div className='form-control'>
                  <input
                    type='submit'
                    value='Add Car'
                    className='btn-primary btn-primary-submit'
                    onClick={(e) => addCar(e)}
                  />
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MyAccountScreen;
