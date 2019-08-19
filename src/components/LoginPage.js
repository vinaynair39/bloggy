import React, {useState} from 'react';
import {connect} from 'react-redux';
import { startLoginUsingGoogle, startLogin } from '../actions/auth';
import isEmail from 'validator/lib/isEmail';
import Link from 'react-router-dom/Link';
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
                console.log('bitch')
            })
        }
    }
    return(   
        <div className="container mx-auto flex">
            <h1 className="items-center">Blogacy</h1>
            <p>Read, Write and Grow</p>
            <span >
                Member Login
            </span>
            <form onSubmit={onStartLogin}>
                <label>Email:</label>
                <input type="email" value={email}
                onChange={e => (getEmail(e.target.value))}
                placeholder="  your email"
                className=""
                />
                <label>Password:</label><input type="password" value={password}  
                onChange={e => (getPassword(e.target.value))}/>
                <button className=' bg-red text-cream font-bold focus:bg-blue rounded py-2 px-5'>Login</button>
                {error && <p>{error}</p>}
            </form>
            <h6>Not Registered?</h6> <Link to='/signup'><button 
            className="bg-blue text-cream font-bold focus:bg-blue rounded py-2 px-5">
            Sign Up</button></Link>
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