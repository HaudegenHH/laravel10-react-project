import { useRef } from "react";
import { Link } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const {setUser, setToken} = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    // console.log(payload);
    
    axiosClient.post('/login', payload)
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
          <h1 className="title">Login into your account</h1>
          <input ref={emailRef} type="email" placeholder="Email.." />
          <input ref={passwordRef} type="password" placeholder="Password.." />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>        
        </form>
      </div>
    </div>
  )
}
