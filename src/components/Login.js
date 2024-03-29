import axios from "axios";
import React, { useState } from "react";

const initialFormValues = {
  username: '',
  password: ''
}

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formValues, setFormValues] = useState(initialFormValues)

  const [error, setError] = useState('')
  //replace with error state

  const handleChange = (e) => {
    setFormValues({...formValues,[e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/login', formValues)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubbles')
        setError('')
      })
      .catch(err => {
        setError(` ${err}: Please give a correct username and/or password`)
      })
  }


  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            id='username'
            value={formValues.username}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            id='password'
            value={formValues.password}
            onChange={handleChange}
          />
          <button id='submit'>Log in</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"