import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, GOOGLE_AUTH_URL, LOGGED_IN_NAME, LOGGED_IN_EMAIL } from '../constants/url';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router';

export const Header = (props) => {


    const location = useLocation();
    let navigate = useNavigate();

    function validateTokenAndLogin(tokenId) {
        fetch(GOOGLE_AUTH_URL, {
            method: "POST",
            body: JSON.stringify({
                token: tokenId
            }),
            headers: {
                "Content-Type": "application/json",
                "authorization": tokenId
            }
        })
            .then((res) => res.json())
            .then((res) => {
                // store returned user somehow
                console.log('Update the user', res);
                //update user state
                props.updateUser(res, true);
                //add token to local storage
                localStorage.setItem(ACCESS_TOKEN, tokenId);
                localStorage.setItem(LOGGED_IN_NAME, res.name);
                localStorage.setItem(LOGGED_IN_EMAIL, res.email);
                //refreshTokenSetup(googleData.tokenObj.expires_in,googleData.reloadAuthResponse);
            })
            .catch(
                err => {
                    console.log(err);
                });
    }

    //TODO: Move this part to App.js
    useEffect(() => {

        let access_token = localStorage.getItem(ACCESS_TOKEN);

        //if token is present, then maybe we should try to validate the token and log in
        if (!props.isLoggedIn && access_token) {
            validateTokenAndLogin(access_token);
        }

    });

    const handleSelect = (selectedKey) => {
        console.log(selectedKey);
    }

    const handleLogout = () => {
        console.log('logout is called');
        props.updateUser(null, false);
        //delete the access token as well
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(LOGGED_IN_EMAIL);
        localStorage.removeItem(LOGGED_IN_NAME);
    }

    const handleLoginFailure = (result) =>{
        alert(result);
    }

    const handleLogin = (googleData) => {
        console.log('Try to login', googleData);

        if (!googleData.tokenId) {
            console.log('Token looks invalid');
            return;
        }

        console.log('local stprage is', localStorage);

        validateTokenAndLogin(googleData.tokenId);
    }

    const newLocation = { pathname: "/register", state: { fromDashboard: true } };
    //console.log("**** The google API key is" + process.env.REACT_APP_GOOGLE_API_KEY);
    return (
        <>
            <div id="header" className="header fixed-top m-1">
                <div className="d-flex flex-wrap align-items-center justify-content-xs-center  justify-content-between">
                    <Link to="/" className="logo d-flex align-items-center m-3 p-1">
                        {/* <img src={logoImage} alt="" /> */}
                        <span>Stammerers Connect</span>
                    </Link>
                    <nav id="navbar" className="navbar m-2 p-1">
                        <ul className='d-flex align-items-center justify-content-between'>
                            <li><Link to="/" className='navbar-caption-text'>About</Link></li>
                            <li><Link to="/mentors" className='navbar-caption-text'>Stammerers</Link></li>
                            <li><Link to="/events" className='navbar-caption-text'>Events</Link></li>
                            <li><Link to="/contactUs" className='navbar-caption-text'>Contact</Link></li>
                            <li>
                                {
                                    (props.isLoggedIn && props.user)
                                        ?
                                            <div className="dropdown"><span className='navbar-caption-text'>{"Hi, " + props.user.name.split(' ')[0]}</span>
                                                <ul className="dropdown-content">
                                                    <li><Link to={newLocation} className='navbar-caption-text'>My Profile</Link></li> 
                                                    <li><Link to="/" onClick={handleLogout} className='navbar-caption-text'>Log Out</Link></li>
                                                </ul>
                                            </div>
                                        :
                                        <>
                                            <GoogleLogin
                                                render={
                                                    renderProps => (
                                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="myButton scrollto" >Log In</button>
                                                    )}
                                                clientId={process.env.REACT_APP_GOOGLE_API_KEY}
                                                buttonText="Log In"
                                                onSuccess={handleLogin}
                                                onFailure={handleLoginFailure}
                                                cookiePolicy={'single_host_origin'} />
                                        </>
                                }
                            </li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                </div>
            </div>
        </>
    )
}

