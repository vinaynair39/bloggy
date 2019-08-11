import React, {useState} from 'react';
import { connect } from 'react-redux';
import { startLoginUsingGoogle, startLogin } from '../actions/auth';
import isEmail from 'validator/lib/isEmail';
import {history} from '../routers/AppRouter';
export const LoginPage = ({ startLogin, startLoginUsingGoogle, error}) => {

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
                history.push('/dashboard');
            }).catch(() => {
                console.error('hello');
            });
        }
    }
    return(
          <div>
            <div >
                <h1>Blogacy</h1>
                <p>Read, Write and Grow</p>
                <span >
			        Member Login
		        </span>
                <form onSubmit={onStartLogin}>
                    <label>Email:</label><input  type="email" value={email}
                    onChange={e => (getEmail(e.target.value))}/>
                    <label>Password:</label><input type="password" value={password}  
                    onChange={e => (getPassword(e.target.value))}/>
                    <button>Login</button>
                    {error && <p>{error}</p>}
                </form>
                <button className="button" onClick={startLoginUsingGoogle}>Login with Google</button>
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