import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const {setUser, setToken} = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    console.log(payload);
    
    axiosClient.post('/signup', payload)
    .then(({data}) => {
      setToken(data.token)
      setUser(data.user)
    })
    .catch(err => {
      const response = err.response;
      // 422 - validation error
      if(response && response.status === 422) {
        console.log(response.data.errors);
      }
    })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Register for free</h1>
          <input ref={nameRef} type="text" placeholder="Full name.." />
          <input ref={emailRef} type="email" placeholder="Email.." />
          <input ref={passwordRef} type="password" placeholder="Password.." />
          <input ref={passwordConfirmationRef} type="password" placeholder="Password confirmation.." />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already registered? <Link to="/login">Sign in</Link>
          </p>        
        </form>
      </div>
    </div>
  )
}