import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AboutUs = () => {
    useEffect(() => {
        //document.getElementById('aboutUs-nav').classNameName = "nav-link text-secondary";
    }
    )

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h1 className='text-success'>Welcome!</h1>
                    <h2>Know More About Us</h2>
                    <hr />
                    <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore etae magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <button type="button" className="btn btn-success">Let's Know More</button>

                </div>
                <div className="col-md-6">
                    <img src="http://themebubble.com/demo/marketingpro/wp-content/uploads/2016/10/seo-slide.png " alt="" />
                </div>
            </div>
        </div>
    )
}
