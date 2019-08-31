import React, {useState} from 'react';
import { connect } from 'react-redux';
import { startLoginUsingGoogle, startLogin } from '../actions/auth';
import isEmail from 'validator/lib/isEmail';
import Link from 'react-router-dom/Link';
import Tilt from 'react-tilt';
export const LoginPage = ({ startLogin, error}) => {

    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');
    const onStartLogin = (e) => {
        e.preventDefault(); 
        if(isEmail(email)){
            const credentials = {
                email,
                password
            };
            
            startLogin(credentials).then(() => {
            })
        }
    }
    return(
          <div className="box-layout">
            <div className="box-layout__box animated fadeInDown delay-1s">
                <Tilt className="Tilt" options={{ max : 25 }} >
                    <h1 className="box-layout__title animated flash delay-2s">Blogacy</h1>
                </Tilt>
                <h2 className="box-layout__subtitle">Read, Write and Grow</h2>
                <div className="box-layout__form">
                    <form onSubmit={onStartLogin}>
                        <input  type="email" value={email}
                        onChange={e => (getEmail(e.target.value))}
                        placeholder="email"
                        className="animated fadeInLeft delay-2s"
                        />
                        <input type="password" value={password}  
                        onChange={e => (getPassword(e.target.value))}
                        placeholder={error ? <p>{error}</p> : "password"}
                        className="animated fadeInRight delay-2s"
                        />
                        <button className="button-primary button-primary__login ">Login</button>
                    </form>
                    {error && alert(error)}
                    <h6 className="box-layout__question animated infinite pulse">Not Registered?</h6> <Link to='/signup'><button className="button-secondary">Sign Up</button></Link>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLoginUsingGoogle: () => dispatch(startLoginUsingGoogle()),
    startLogin: (credentials)=> dispatch(startLogin(credentials))
});

const mapStateToProps = (state) => ({
    error: state.auth.error
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);