/**
 * @name Signup
 * @desc Displays signup screen/**
 */

import React, { useState } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { render } from 'react-dom';
import axios from 'axios';

function CreateUser(props) {
 const history = useHistory();
 const [state, setState] = useState({
      username: '',
      password: '',
 });

  // OnChange event handler that will update state whenever a key is pressed in an input field.
  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const onSubmit = (e) => {
    e.preventDefault();
    if (state.username.length && state.password.length) {
      const userData = {
        "username": state.username,
        "password": state.password
      };
 
      axios.post('/api/create', userData, { //do we need the /api???
        headers: { 'content-type': 'application/json' },
      }).then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            Authentication: 'true',
          }));
 
//need sesssionStorage stuff here...
          //sessionStorage.setItem('loggedInUser', state.username.toLowerCase());
          redirectToTicketForm();
        }
      });
    } else {
        console.log('err');
      }
  };

  const redirectToTicketForm = () => {
    history.push('/ticketform')
  };
  
    return (
      <div className="row justify-content-center mt-5">
        <div className="col-6">
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <label>
              USERNAME:
              <input
                className="form-control"
                onChange={onChange}
                type="text"
                name="username"
                value={state.username}
                required
              />
            </label>
            <label>
              PASSWORD:
              <input
                className="form-control"
                style={{ width: '100%' }}
                onChange={onChange}
                type="password"
                name="password"
                value={state.password}
                required
              />
            </label>
            <br/>
            <button className="btn btn-success" type="submit">
              LOGIN
            </button>
              <br/>
              <p style={{textAlign: 'center'}}>OR</p>

            <button className="btn btn-success" type="button">
            CREATE ACCOUNT
          </button>
          </form>
        </div>
      </div>
    );
  }


export default CreateUser;