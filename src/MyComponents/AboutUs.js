import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/img/hero-img.png';

export const AboutUs = () => {
    return (
        <>
            <div id="myHome" className="d-flex myHome flex-nowrap align-items-center mx-1">
                <div className="flex-1 bg-primary">
                    {/* Change font based on width */}
                    <div className="d-flex flex-column justify-content-center">
                        <div><h1 data-aos="fade-up">Platform to Ignite stammerers to Talk Freely</h1></div>
                        <div><h2 data-aos="fade-up" data-aos-delay="400">We connect you with fellow stammerers who could overcome it and didn't let it impact their goals</h2></div>
                        <div>
                            <div className="align-self-center text-center">
                                <a href="#about" className="myHome-get-started align-self-center">
                                    <span>Get Started</span>
                                </a>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="flex-2">
                    <div className="myHome-logoflex-2 mx-1" data-aos="zoom-out" data-aos-delay="200">
                        <img src={logo} className="img-thumbnail" alt="" />
                        {/* className="img-fluid" */}
                    </div>
                </div>
            </div>
        </>
    )
}
