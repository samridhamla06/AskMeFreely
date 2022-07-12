import React, { useEffect, useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, GOOGLE_AUTH_URL, LOGGED_IN_NAME, LOGGED_IN_EMAIL } from '../constants/url';
import GoogleLogin from 'react-google-login';
import { useMediaQuery } from 'react-responsive';
import { handleLogin, handleLoginFailure, validateTokenAndLogin, handleLogout } from '../utils/UserLoginUtils';


export const SignUp = () => {

    return (
        <div className='container sign'>
            <form>
                <h3 className='fw-bolder'>Sign Up</h3>
                <div className="mb-3">
                    <label>Full name</label>
                    <input
                        type="text"
                        className="form-control mdq_i1"
                        placeholder="First name"
                    />
                </div>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control mdq_i1"
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="Password" className="form-control mdq_i1" placeholder="Password" />
                </div>
                
                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="form-control mdq_i1"
                        placeholder="Confirm password"
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <div className="mt-1 pt-2">
                      <input className="btn-md btn-primary btn-lg bt" type="submit" value="Submit"/>
                    </div>
                    <div className="mt-1 pt-2 ms-3">
                      
                    <Link to="/Login"><input className="btn-md btn-primary btn-lg mb-2 bt" type="submit" value="Log in"/></Link>
                    
                    </div>
                  </div>
               
            </form>
        </div>
    )
}