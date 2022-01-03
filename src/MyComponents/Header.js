import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router';
import Button from 'react-bootstrap/Button';

export const Header = (props) => {

    const location = useLocation();

    const handleSelect = (selectedKey) => {
        console.log(selectedKey);
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Talk Freely</Navbar.Brand>
                    <Nav className="me-auto" onSelect={handleSelect} id = "myNavBar" activeKey={location.pathname}>
                        <Nav.Link as = {Link} to="/">About Us</Nav.Link>
                        <Nav.Link as = {Link} to = "/mentors">Mentors</Nav.Link>
                        <Nav.Link as = {Link} to="/testimonials">Testimonials</Nav.Link>
                        <Nav.Link as = {Link} to="/contactUs">ContactUs</Nav.Link>
                    </Nav>
                    <Button variant="light">Login</Button> 
                    <Button variant="primary">Sign-up</Button> 
                </Container>
            </Navbar>
        </>
    )
}