import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, GOOGLE_AUTH_URL, LOGGED_IN_NAME, LOGGED_IN_EMAIL } from '../constants/url';
import GoogleLogin from 'react-google-login';
import { useMediaQuery } from 'react-responsive';
import swal from 'sweetalert';

export const Header = (props) => {
    const ref = useRef()
    const isMobile = useMediaQuery({ query: `(max-width: 800px)` });
    const [showDropdown, setShowDropDown] = useState(false);
    const [showNestedDropdown, setShowNestedDropDown] = useState(false);
    const location = useLocation();
    let navigate = useNavigate();

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

    const handleLogout = () => {
        console.log('logout is called');
        props.updateUser(null, false);
        //delete the access token as well
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(LOGGED_IN_EMAIL);
        localStorage.removeItem(LOGGED_IN_NAME);
    }

    const handleLoginFailure = (result) => {
        swal("Google Login Failed", "error");
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
            <div id="header" className="header fixed-top">
                <div className='navbar-container'>
                    <div>
                        <Link to="/">
                            <div className='navbar-caption'>Stammerers Connect</div>
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
                                                    <button className="myButton scrollto" onClick={toggleNestedDropDown} ><i class="fa fa-user" aria-hidden="true"></i> | {"Hi, " + props.user.name.split(' ')[0]} <i class="fa fa-arrow-down" aria-hidden="true"></i></button>    
                                                    {
                                                    showNestedDropdown 
                                                    ? 
                                                        <ul className="navbar-submenu">
                                                            <li><Link to={newLocation} className='navbar-caption-text' onClick={closeDropDown}>My Profile</Link></li>
                                                            <li><Link to="/" onClick={() => {
                                                                handleLogout();
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
                                                                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="navbar-button" ><i class="fa fa-sign-in" aria-hidden="true"></i> | Log In</button>
                                                            )}
                                                        clientId={process.env.REACT_APP_GOOGLE_API_KEY}
                                                        buttonText="Log In"
                                                        onSuccess={handleLogin}
                                                        onFailure={handleLoginFailure}
                                                        cookiePolicy={'single_host_origin'} />
                                                </>
                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>}

                    {isMobile && <button className='myButton' onClick={toggleDropDown}><i class="fa fa-bars" aria-hidden="true"></i> | Menu</button>}
                </div>
            </div>
        </>
    )
}

