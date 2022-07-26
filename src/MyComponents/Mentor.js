import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMediaQuery } from 'react-responsive';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import photo2 from '../assets/img/BookNow.png';
import photo4 from "../assets/img/Swirl1.png";
import photo5 from "../assets/img/image1.png";
import { Owl } from "./Owl";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { STAMMERING_STATUS_MAP } from '../constants/map';
import landingPagePhoto from '../assets/img/landingPage3.png';
import mentorPhoto from '../assets/img/mentorPhoto2.png';
import teachingPhoto from '../assets/img/teachingPhoto4.png';
import parentsPhoto from '../assets/img/parents3.png';
import stammerersPhoto from '../assets/img/stammerersPhoto1.png'
import changeMakers from '../assets/img/allies.png'
import yellowCheck from '../assets/img/YellowCheck.svg'


export const Mentor = ({ mentorListObj, updateUser }) => {

    // const [showDropdown, setShowDropDown] = useState(4);
    const isMobile = useMediaQuery({ query: `(max-width: 600px)` });

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    // useEffect(() => {
    //     setShowDropDown(1);
    // }, [OwlCarousel]);

    // let navigate = useNavigate();

    // const handleBooking = (e) => {
    //     navigate("/mentor/" + props.mentorObj.name, {
    //         replace: false, state: { mentorObj: props.mentorObj }
    //     });
    // }

    return (
        <div className='container-fluid mt-5'>
            <div className="container-fluid text-center t1">
                <h3 className="fw-bolder">Meet Our Mentors</h3>
                <div className="text-ceneter fw-normal mt-4">
                    <p className='fw_p_1'>Book 1:1 Mentoring Sessions with our Industry-best Speech Therapists/Experts. <br /> Connect Freely with Fellow Stammerers for<br /> Motivation and Career Counseling.</p>
                </div>
                <button type="button " className="bt_ment">I want to become a mentor!</button>
            </div>
            <div className='container-fluid text-center pt-5'>
                <h3 className="fw-bolder">Certified Experts</h3>
            </div>
            {
            (!mentorListObj.length)
                    ?
            <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className='d-flex flex-column justify-content-center'>
                            <div class="spinner-border text-primary mt-4" role="status" aria-hidden="true"></div>
                        </div>
                    </div>
                    :
                 (    
            <div className='container'>        
            { (isMobile) ? (
                <div className='container mt-4 m_r'>
                    <OwlCarousel
                        className='owl-theme owl-nav owl-prev owl-next owl-dot'
                        loop margin={10}
                        items="1"
                        autoplay
                        dots
                        nav>
                        {mentorListObj.map((mentorObj, index) => {
                            return (
                                <Link to={"/mentor/" + mentorObj.name} state={{ mentorObj: mentorObj, replace: false }} style={{ textDecoration: 'none' }}>
                                <div className='item'>
                                    <div className='image'>
                                        <img src={mentorObj.imageURL} className='olc image_img' alt="..." />
                                        <div className='image_overlay'>
                                            <div className='image_title'>{mentorObj.name}</div>
                                            <p className='image_description'>{mentorObj.tagLine}</p>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            )
                        })}
                    </OwlCarousel>
                </div>) : <Owl mentorListObj={mentorListObj} />}
            <div className='container-fluid text-center mt-5'>
                <h3 className="fw-bolder">Fellow Stammerers</h3>
            </div>

            { (isMobile) ? (
                <div className='container mt-3 m_r'>
                    <OwlCarousel
                        className='owl-theme owl-nav owl-prev owl-next owl-dot'
                        loop margin={10}
                        items="1"
                        autoplay
                        dots
                        nav>
                        {
                        mentorListObj.map((mentorObj, index) => {
                            return (
                                <div className='item'>
                                    <div className='image'>
                                        <img src={mentorObj.imageURL} className='olc' alt="..." />
                                        <div className='image_overlay'>
                                            <div className='image_title'>{mentorObj.name}</div>
                                            <p className='image_description'>{mentorObj.tagLine}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </OwlCarousel>
                </div>) : <Owl mentorListObj={mentorListObj} />}
            </div>  
                 
                 ) 
                }
        </div>

    )
}