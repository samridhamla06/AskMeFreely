import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, GOOGLE_AUTH_URL, LOGGED_IN_NAME, LOGGED_IN_EMAIL } from '../constants/url';
import GoogleLogin from 'react-google-login';
import { useMediaQuery } from 'react-responsive';
import { handleLogin, handleLoginFailure, validateTokenAndLogin,handleLogout } from '../utils/UserLoginUtils';

export const Header = (props) => {
    const ref = useRef()
    const isMobile = useMediaQuery({ query: `(max-width: 900px)` });
    const [showDropdown, setShowDropDown] = useState(false);
    const [showNestedDropdown, setShowNestedDropDown] = useState(false);
 

    const closeDropDown = () => {
        setShowNestedDropDown(false);
        setShowDropDown(false);
    }

    const toggleNestedDropDown = () => {
        setShowNestedDropDown((oldValue) => {
            return !oldValue;
        })
    }

    const toggleDropDown = () => {
        setShowDropDown((oldValue) => {
            return !oldValue;
        })
    }

    const handleLoginWithProps = (googleData) => {
        handleLogin(googleData, props.updateUser);
    }


    //TODO: Move this part to App.js
    useEffect(() => {
        let access_token = localStorage.getItem(ACCESS_TOKEN);

        //if token is present, then maybe we should try to validate the token and log in
        if (!props.isLoggedIn && access_token) {
            validateTokenAndLogin(access_token, props.updateUser);
        }
    }, []);


    useEffect(() => {
        console.log("showDropdown changed");
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            console.log("ref.current", ref.current);
            console.log("e.target", e.target);
            if (showDropdown && ref.current && !ref.current.contains(e.target)) {
               console.log("call the dropdown");
              closeDropDown();
            }
          }
      
          document.addEventListener("mousedown", checkIfClickedOutside)
      
          return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
          }
    }, [showDropdown]);

    const newLocation = { pathname: "/register", state: { fromDashboard: true } };
    //console.log("**** The google API key is" + process.env.REACT_APP_GOOGLE_API_KEY);
    return (
        <>
            <div id="header" className="header fixed-top">
                <div className='navbar-container'>
                    <div>
                        <Link to="/">
                            {/* <img src={logo} className="logo-image img-fluid" alt="Stammerers Connect" /> */}
                            <div className='navbar-caption'>STAMMERERS CONNECT</div>
                        </Link>
                    </div>
                    {(!isMobile || showDropdown)
                        &&
                        <div id="navbar" className="navbar" ref={ref}>
                            <ul>
                                <li><Link to="/" className='navbar-caption-text'onClick={closeDropDown}>About</Link></li>
                                <li><Link to="/mentors" className='navbar-caption-text' onClick={closeDropDown}>Mentors</Link></li>
                                <li><Link to="/events" className='navbar-caption-text' onClick={closeDropDown}>Events</Link></li>
                                <li><Link to="/contactUs" className='navbar-caption-text' onClick={closeDropDown}>Contact</Link></li>
                                <li>
                                    <div>
                                        {
                                            (props.isLoggedIn && props.user)
                                                ?
                                                <>
                                                    <button className="myButton scrollto" onClick={toggleNestedDropDown} ><i class="fa fa-user" aria-hidden="true"></i> {props.user && props.user.name ? "Hi, " + props.user.name.split(' ')[0] : 'Hi, User'}</button>    
                                                    {
                                                    showNestedDropdown 
                                                    ? 
                                                        <ul className="navbar-submenu">
                                                            <li><Link to={newLocation} className='navbar-caption-text' onClick={closeDropDown}>My Profile</Link></li>
                                                            <li><Link to={{ pathname: "/sessions" }} className='navbar-caption-text' onClick={closeDropDown}>My Sessions</Link></li>
                                                            <li><Link to="/" onClick={() => {
                                                                handleLogout(props.updateUser);
                                                                closeDropDown();
                                                            }
                                                                } className='navbar-caption-text'>Log Out</Link></li>
                                                        </ul>
                                                    :
                                                    <></>
                                                    }   
                                                </>
                                                :
                                                <>
                                                    <GoogleLogin
                                                        render={
                                                            renderProps => (
                                                                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="navbar-button" ><i class="bi bi-google"></i> Log In</button>
                                                            )}
                                                        clientId={process.env.REACT_APP_GOOGLE_API_KEY}
                                                        buttonText="Log In"
                                                        onSuccess={handleLoginWithProps}
                                                        onFailure={handleLoginFailure}
                                                        cookiePolicy={'single_host_origin'} />
                                                </>
                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>}

                    {isMobile && <button className='myButton' onClick={toggleDropDown}><i class="fa fa-bars" aria-hidden="true"></i> Menu</button>}
                </div>
            </div>
        </>
    )
}

