import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/img/hero-img.png';
import { useNavigate, Link } from 'react-router-dom';

export const AboutUs = () => {
    return (
            <div id="myHome" className="d-flex myHome flex-wrap align-items-center justify-content-center mx-1">
                <i class="fa fa-book"></i>
                <i class="fa fa-star-o fa-2x"></i>
                <i class="fa fa-star fa-2x"></i>
                <i class="fa fa-book"></i>
            <div className="flex-2">
                    <div className="image-fluid mx-1" data-aos="zoom-out" data-aos-delay="200">
                        <img src={logo} className="img-thumbnail" alt="" />
                        {/* className="img-fluid" */}
                    </div>
                </div>
            <div className="flex-1">
                    {/* Change font based on width */}
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div><h1 data-aos="fade-up">Platform to Connect with Fellow Stammerers</h1></div>
                        <div><h2 data-aos="fade-up" data-aos-delay="400">We connect you with fellow stammerers who could overcome it and didn't let it impact their goals</h2></div>
                        <Link to="/mentors"><button type="submit" className="myButton m-2 p-3">Find Mentors</button></Link>
                    </div>
            </div>
            </div>
    )
}
