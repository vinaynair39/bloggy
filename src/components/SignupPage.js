import React, {useState} from 'react';
import { connect } from 'react-redux';
import {startSignUp } from '../actions/auth';
import isEmail from 'validator/lib/isEmail';
export const LoginPage = ({ startSignUp, error, setUIErrors}) => {

    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');
    const [userHandle, getUserHandle] = useState('');
    const [confirmPassword, getConfirmPassword] = useState('');
    const [name, getName] = useState('');

    const credentials = {};
    let errors;
    const onStartSignUp = (e) => {
        e.preventDefault(); 
        console.log('yolo')
        if(isEmail(email)){
            credentials.email = email;
        }
        else{
            errors = 'invalid Email';
        }
        if(password === confirmPassword){
            credentials.password = password;
            credentials.confirmPassword = confirmPassword;
        }
        else{
            errors = 'password and confirm password does not match';
        }
        if((name.length !== 0)){
            credentials.name = name;
        }
        else{
            errors = 'Please provide a name';
        }
        if((userHandle.length !== 0)){
            credentials.userHandle = userHandle;
        }
        else{
            errors = 'Please provide a User Handle';
        }
        if(!!errors)
        {   
            console.log(errors);
            setUIErrors(errors)

        }  
        else
            startSignUp(credentials);


}
    return(
          <div>
            <div >
                <h1>Blogacy</h1>
                <p>Read, Write and Grow</p>
                <span >
			        Member Login
		        </span>
                <form onSubmit={onStartSignUp}>
                    <label>User Handle:</label><input type="text" value={userHandle}  
                    onChange={e => (getUserHandle(e.target.value))}/>
                    <label>Email:</label><input  type="email" value={email}
                    onChange={e => (getEmail(e.target.value))}/>
                    <label>Password:</label><input type="password" value={password}  
                    onChange={e => (getPassword(e.target.value))}/>
                    <label>Confirm Password:</label><input type="password" value={confirmPassword}  
                    onChange={e => (getConfirmPassword(e.target.value))}/>
                    <label>Password:</label><input type="text" value={name}  
                    onChange={e => (getName(e.target.value))}/>
                    <button className="button">Sign Up</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startSignUp: (credentials)=> dispatch(startSignUp(credentials)),
    setUIErrors: (error) => dispatch({
        type: 'SET_ERRORS',
        error: error
    })
});

const mapStateToProps = (state) => ({
    error: state.auth.error? state.auth.error : [],
   
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);