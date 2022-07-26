import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMediaQuery } from 'react-responsive';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';



export const Owl = ({ mentorListObj }) => {
    
    var newList = [];

    mentorListObj.map((mentorObj1, index) => {
        newList.push(mentorObj1);
    })

    mentorListObj.map((mentorObj1, index) => {
        newList.push(mentorObj1);
    })

    mentorListObj = newList;
    
    return (
        <div className='container-fluid mt-5'>
            <OwlCarousel
                className='owl-theme owl-prev owl-next'
                // loop 
                margin={10}
                items={mentorListObj.length >= 4 ? 4 : mentorListObj.length}             
                // autoplay
                nav>
                {mentorListObj.map((mentorObj1, index) => {
                    return (
                        <div className='item'>
                            <div className='image'>
                                <img src={mentorObj1.imageURL} className='olc' alt="..." />
                                <div className='image_overlay bg-light'>
                                    <div className='image_title'>{mentorObj1.name}</div>
                                    <p className='image_description'>{mentorObj1.tagLine}</p>
                                </div>
                            </div>
                            <Link to={"/mentor/" + mentorObj1.name} state={{ mentorObj: mentorObj1, replace: false }} style={{ textDecoration: 'none' }}>
                                <div className="ment_link ms-3 pt-2 mt-4 myButton">Book a session with me!</div>
                            </Link>
                        </div>
                    )
                })}
            </OwlCarousel>
        </div>
    )
}