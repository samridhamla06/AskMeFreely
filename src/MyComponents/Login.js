import React, { useEffect, useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, GOOGLE_AUTH_URL, LOGGED_IN_NAME, LOGGED_IN_EMAIL } from '../constants/url';
import GoogleLogin from 'react-google-login';
import { useMediaQuery } from 'react-responsive';
import { handleLogin, handleLoginFailure, validateTokenAndLogin, handleLogout } from '../utils/UserLoginUtils';

export const Login = () => {

    const responseGoogle = (response) => {
        console.log(response);
      }
    return (
        <div className='container center log'>
            <form>
                <h3 className='fw-bolder'>Log In</h3>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="Password" className="form-control" placeholder="Password" />
                </div>
                <div className="d-flex justify-content-center">
                    <div className="mt-1 pt-2">
                        <input className="btn-md btn-primary bt" type="submit" value="Login" />
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    {/* <button className="navbar-button googlef" ><i class="bi bi-google"></i> Authentication with Google</button> */}
                    <GoogleLogin
                        clientId="https://accounts.google.com/"
                        render={renderProps => (
                            <button className='navbar-button googlef' onClick={renderProps.onClick} disabled={renderProps.disabled}>Authentication with Google</button>
                        )}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>

            </form>
        </div>
    )
}