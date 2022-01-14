import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import GoogleLogin from 'react-google-login';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'

export const Header = (props) => {

    const location = useLocation();
    let navigate = useNavigate();

    const handleSelect = (selectedKey) => {
        console.log(selectedKey);
    }

    const handleLogin = (googleData) => {
        console.log('Try to login', googleData.tokenId);
        fetch("http://localhost:8080/oauth2?tokenID=" + googleData.tokenId, {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                // store returned user somehow
                console.log('Update the user', res)
                props.updateUser(res)
            })
            .catch(
                err => {
                    console.log(err);
                });

    }

    const routeToProfile = () => {
        navigate("/register", {
            replace:true, state: {userInfo: props.user}
        });
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Talk Freely</Navbar.Brand>
                    <Nav className="me-auto" onSelect={handleSelect} id="myNavBar" activeKey={location.pathname}>
                        <Nav.Link as={Link} to="/">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/mentors">Mentors</Nav.Link>
                        <Nav.Link as={Link} to="/testimonials">Testimonials</Nav.Link>
                        <Nav.Link as={Link} to="/contactUs">ContactUs</Nav.Link>
                        {
                        props.isLoggedIn ?
                            <DropdownButton id="dropdown-basic-button" title={"Hi " + props.user.name}>
                                <Dropdown.Item href="#/action-1">My Sessions</Dropdown.Item>
                                <Dropdown.Item onClick={routeToProfile}>My Profile</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Log Out</Dropdown.Item>
                            </DropdownButton> :
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_API_KEY}
                                buttonText="Log In"
                                onSuccess={handleLogin}
                                onFailure={handleLogin}
                                cookiePolicy={'single_host_origin'}
                            />
                    }
                    </Nav>

                </Container>
            </Navbar>
        </>
    )
}

