import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, GOOGLE_AUTH_URL, LOGGED_IN_NAME, LOGGED_IN_EMAIL } from '../constants/url';
import logoImage from '../assets/img/logo.png'
import GoogleLogin from 'react-google-login';

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
        props.updateUser(null, false);
        //delete the access token as well
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(LOGGED_IN_EMAIL);
        localStorage.removeItem(LOGGED_IN_NAME);
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

    const routeToProfile = () => {
        navigate("/register", {
            replace: true, state: { userInfo: props.user }
        });
    }


    //Validate Token if user not logged in yet.
    // return (
    //     <>
    //         <Navbar bg="dark" variant="dark">
    //             <Container>
    //                 <Navbar.Brand>Talk Freely</Navbar.Brand>
    //                 <Nav className="me-auto" onSelect={handleSelect} id="myNavBar" activeKey={location.pathname}>
    //                     <Nav.Link as={Link} to="/">About Us</Nav.Link>
    //                     <Nav.Link as={Link} to="/mentors">Mentors</Nav.Link>
    //                     <Nav.Link as={Link} to="/events">Group Sessions</Nav.Link>
    //                     <Nav.Link as={Link} to="/testimonials">Testimonials</Nav.Link>
    //                     <Nav.Link as={Link} to="/contactUs">ContactUs</Nav.Link>
    //                     {
    //                     props.isLoggedIn ?
    //                         <DropdownButton id="dropdown-basic-button" title={"Hi " + props.user.name}>
    //                             <Dropdown.Item href="#/action-1">My Sessions</Dropdown.Item>
    //                             <Dropdown.Item onClick={routeToProfile}>My Profile</Dropdown.Item>
    //                             <Dropdown.Item onClick = {handleLogout}> <Link to="/" style = {{"text-decoration":"none", "color":"black"}} >Log Out</Link></Dropdown.Item>
    //                         </DropdownButton> :
    //                         <GoogleLogin
    //                             clientId={process.env.REACT_APP_GOOGLE_API_KEY}
    //                             buttonText="Log In"
    //                             onSuccess={handleLogin}
    //                             onFailure={handleLogin}
    //                             cookiePolicy={'single_host_origin'}
    //                         />
    //                 }
    //                 </Nav>

    //             </Container>
    //         </Navbar>
    //     </>
    // )

    return (
        <>
            <div id="header" className="header fixed-top m-1">
                <div className="d-flex flex-wrap align-items-center justify-content-xs-center  justify-content-between">
                    <a href="index.html" className="logo d-flex align-items-center m-auto m-1 p-1">
                        <img src={logoImage} alt="" />
                        <span>TalkFreely</span>
                    </a>
                    <nav id="navbar" className="navbar">
                        <ul className='d-flex align-items-center justify-content-between'>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/mentors">Mentors</Link></li>
                            <li><Link to="/events">Events</Link></li>
                            {/* <li><Link to="/testimonials">Testimonials</Link></li> */}
                            <li><Link to="/contactUs">Contact</Link></li>
                            <li>
                                {
                                    props.isLoggedIn
                                        ?
                                            <div className="dropdown"><span>{"Hi " + props.user.name}</span>
                                                <ul className="dropdown-content">
                                                    <li><Link to={{ pathname: "/register", state: { userInfo: props.user } }}>My Profile</Link></li>
                                                    <li><Link to="#" onClick={handleLogout}>Log Out</Link></li>
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
                                                onFailure={handleLogin}
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

