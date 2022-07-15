import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import {
  ACCESS_TOKEN,
  GOOGLE_AUTH_URL,
  LOGGED_IN_NAME,
  LOGGED_IN_EMAIL,
} from "../constants/url";
import GoogleLogin from "react-google-login";
import { useMediaQuery } from "react-responsive";
import logo from "../assets/img/logo.png";
import {
  handleLogin,
  handleLoginFailure,
  validateTokenAndLogin,
  handleLogout,
} from "../utils/UserLoginUtils";

export const Header = (props) => {
  const ref = useRef();
  const isMobile = useMediaQuery({ query: `(max-width: 600px)` });
  const [showDropdown, setShowDropDown] = useState(false);
  const [showNestedDropdown, setShowNestedDropDown] = useState(false);

  const closeDropDown = () => {
    setShowNestedDropDown(false);
    setShowDropDown(false);
  };

  const toggleNestedDropDown = () => {
    setShowNestedDropDown((oldValue) => {
      return !oldValue;
    });
    
  };

  const toggleDropDown = () => {
    setShowDropDown((oldValue) => {
      return !oldValue;
    });
  };

  const handleLoginWithProps = (googleData) => {
    handleLogin(googleData, props.updateUser);
  };

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
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      console.log("ref.current", ref.current);
      console.log("e.target", e.target);
      if (showDropdown && ref.current && !ref.current.contains(e.target)) {
        console.log("call the dropdown");
        closeDropDown();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showDropdown]);

  const newLocation = { pathname: "/register", state: { fromDashboard: true } };
  //console.log("**** The google API key is" + process.env.REACT_APP_GOOGLE_API_KEY);
  return (
    <>
      <nav
        id="header"
        className="navbar navbar-expand-lg fixed-top navbar-light bg-white border-bottom border-secondary"
      >
        <div className="container-fluid">
          <Link to="/">
            <img src={logo} className="navbar-brand" alt="Stammerers Connect" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
          {/* <div className="collapse navbar-collapse justify-content-end me-5" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className='navbar-caption-text text-dark' onClick={closeDropDown}>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/mentors" className='navbar-caption-text text-dark' onClick={closeDropDown}>Mentors</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/events" className='navbar-caption-text text-dark' onClick={closeDropDown}>Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contactUs" className='navbar-caption-text text-dark' onClick={closeDropDown}>Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/SignUp" className='navbar-caption-text text-dark' onClick={closeDropDown}>Sign Up</Link>
                            </li>
                        </ul>
                    </div> */}

          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div class="offcanvas-header">
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body justify-content-end nav-margin">
              <ul className="navbar-nav">
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <Link
                    to="/"
                    className="navbar-caption-text text-dark"
                    onClick={closeDropDown}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <Link
                    to="/mentors"
                    className="navbar-caption-text text-dark"
                    onClick={closeDropDown}
                  >
                    Mentors
                  </Link>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <Link
                    to="/events"
                    className="navbar-caption-text text-dark"
                    onClick={closeDropDown}
                  >
                    Events
                  </Link>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <Link
                    to="/contactUs"
                    className="navbar-caption-text text-dark"
                    onClick={closeDropDown}
                  >
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  {/* <Link to="/SignUp" className='navbar-caption-text text-dark' onClick={closeDropDown}>Sign Up</Link> */}
                  <div style={{ position: "relative" }}>
                    {props.isLoggedIn && props.user ? (
                      <>
                        <button
                          className="myButton scrollto"
                          onClick={toggleNestedDropDown}
                        >
                          <i class="fa fa-user" aria-hidden="true"></i>{" "}
                          {props.user && props.user.name
                            ? "Hi, " + props.user.name.split(" ")[0]
                            : "Hi, User"}
                        </button>
                        {showNestedDropdown ? (
                          <ul className="navbar-submenu">
                            <li data-bs-dismiss="offcanvas">
                              <Link
                                to={newLocation}
                                className="navbar-caption-text"
                                onClick={closeDropDown}
                              >
                                My Profile
                              </Link>
                            </li>
                            <li data-bs-dismiss="offcanvas">
                              <Link
                                to={{ pathname: "/sessions" }}
                                className="navbar-caption-text"
                                onClick={closeDropDown}
                              >
                                My Sessions
                              </Link>
                            </li>
                            <li data-bs-dismiss="offcanvas">
                              <Link
                                to="/"
                                onClick={() => {
                                  handleLogout(props.updateUser);
                                  closeDropDown();
                                }}
                                className="navbar-caption-text"
                              >
                                Log Out
                              </Link>
                            </li>
                          </ul>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <>
                        <GoogleLogin
                          render={(renderProps) => (
                            <button
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                              className="myButton"
                            >
                              <i class="bi bi-google"></i> Log In
                            </button>
                          )}
                          clientId={process.env.REACT_APP_GOOGLE_API_KEY}
                          buttonText="Log In"
                          onSuccess={handleLoginWithProps}
                          onFailure={handleLoginFailure}
                          cookiePolicy={"single_host_origin"}
                        />
                      </>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
