import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import GoogleLogin from 'react-google-login';
import { handleLogin, handleLoginFailure } from '../utils/UserLoginUtils';
import swal from 'sweetalert';
import landingPagePhoto from '../assets/img/landingPage3.png';
import mentorPhoto from '../assets/img/mentorPhoto2.png';
import teachingPhoto from '../assets/img/teachingPhoto4.png';
import parentsPhoto from '../assets/img/parents3.png';
import stammerersPhoto from '../assets/img/stammerersPhoto1.png'
import changeMakers from '../assets/img/allies.png'
import yellowCheck from '../assets/img/YellowCheck.svg'
import { Owl } from "./Owl"
import OwlCarousel from 'react-owl-carousel'
import photo5 from "../assets/img/image1.png";

export const AboutUs = (props) => {

    const isMobile = useMediaQuery({ query: `(max-width: 600px)` });

    let navigate = useNavigate();


    const handleLoginWithProps = (googleData) => {
        handleLogin(googleData, props.updateUser);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='container-fluid'>
            <header className="masthead">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        {!isMobile && <div className='col-0 col-lg-6 order-lg-2 img-fluid d-flex justify-content-center mt-3 align-items-center'>
                            <img src={landingPagePhoto} className="img-fluid flex-item" alt="..." />
                        </div>  }
                        <div className="col-lg-6 order-lg-1 col-sm-12 col-xs-12">
                             <h5 className='h_ft1'>A Community <br/>that Supports and<br/> Nurtures Stammerers.</h5>
                             {/* <div className="card" 
                             style = {{backgroundColor : 'beige', maxHeight : '150px', width : '600px'}
                            }> */}
                            <div className="d-flex flex-column pt-3 mt-3 pl-2">
                                    <div className='landingPageListElement'><img src = {yellowCheck} alt="My Happy SVG" style = {{maxHeight : '20px', maxWidth : '20px'}}></img> &nbsp;&nbsp;Affordable Therapy</div>
                                    <div className='landingPageListElement'><img src = {yellowCheck} alt="My Happy SVG" style = {{maxHeight : '20px', maxWidth : '20px'}}></img> &nbsp;&nbsp;Free Access to Multiple Events/Workshops</div>
                                    <div className='landingPageListElement'><img src = {yellowCheck} alt="My Happy SVG" style = {{maxHeight : '20px', maxWidth : '20px'}}></img> &nbsp;&nbsp;Career Counselling by Experts/Mentors</div>
                            </div>
                        </div>       
                        {/* <div className="col-6 side_img img-fluid mh"></div> */}
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="bt_ment" onClick={() => { navigate("/mentors", { replace: true }) }}> Avail Your First Free Session </button>
                    </div>
                </div>
            </header>
            <section className="features-icons">
                <div className="container text-center mb-lg-3">
                    <div className="row" >
                        <div className="col-lg-4">
                            <div className="card mentor_page_card">
                                <img src={mentorPhoto} className="mentor_page_style mt-3" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Affordable Therapy</h5>
                                    <p className="card-text mt-4">Book Sessions with Professional Speech Therapists and Psychologists</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card mentor_page_card">
                                <img src={teachingPhoto} className= "mentor_page_style mt-3" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Events</h5>
                                    <p className="card-text mt-4">Attend Free Workshops, Masterclasses and Webinars by Industry Experts</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card mentor_page_card">
                                <img src={changeMakers} className="mentor_page_style mt-3" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Mentorship</h5>
                                    <p className="card-text mt-4">Get 1:1 Free Mentorship and Career Counselling by Fellow Stammerers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="texth text-center mb-5">
                <h3 className="fw-bolder_1">What Stammerers say about us?</h3>
            </div>

            <div className="container-fluid mt-3 mb-5 align-items-center pb-5">            
                <div className="row md_carousel justify-content-center">
                    <div className="col-6 cl">
                        <OwlCarousel
                            className='owl-theme owl-nav owl-prev owl-next owl-dot' 
                            items="1"
                            autoplay
                            dots
                            // navigation= "true"                         
                            loop margin={10} nav="true">
                            <div class='item '>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-2 c_img1'>
                                            <img className="c_img" src={photo5} alt="" />
                                        </div>
                                        <div className='col-md-6'>
                                            <p className='owl_p1'>Samridh Amla</p>
                                            <p className='owl_p2'>Lorem Ipsum</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12 owl_div1'>
                                            <p className='owl_p3'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ulabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='item'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-2 c_img1'>
                                        <img className="c_img" src={photo5} alt="" />
                                        </div>
                                        <div className='col-md-6'>
                                            <p className='owl_p1'>Samridh Amla</p>
                                            <p className='owl_p2'>Lorem Ipsum</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12 owl_div1'>
                                            <p className='owl_p3'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ulabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='item'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-2 c_img1'>
                                        <img className="c_img" src={photo5} alt="" />
                                        </div>
                                        <div className='col-md-6'>
                                            <p className='owl_p1'>Samridh Amla</p>
                                            <p className='owl_p2'>Lorem Ipsum</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12 owl_div1'>
                                            <p className='owl_p3'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ulabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>


                    {/* <div className="col-lg-6 hid">
                        <img src={photo4} className="img-fluid" alt="" />
                        <img src={photo5} className="img_circle_1" alt="" /> 
                        <div className="container sm_ct_set">
                            <img src={photo4} className="img-fluid" alt="" />
                            <div className="img_circle_1"><img src={photo5} className="ic_1" alt="" /></div>
                            <div className="img_circle_2"><img src={photo5} className="ic_2" alt="" /></div>
                            <div className="img_circle_3"><img src={photo5} className="ic_3" alt="" /></div>
                            <div className="img_circle_4"><img src={photo5} className="ic_4" alt="" /></div>
                            <div className="img_circle_5"><img src={photo5} className="ic_5" alt="" /></div>
                        </div>
                    </div> */}

                </div>
            </div>


            <section className='slider'>
                <div className='container-fluid'>
                    <h1 className='text-center text-black slide_h1'>Meet our co-founder, Samridh</h1>
                    <div className='container text-center ifrm'>
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <h1 className='slide_h2'>Share your Story and Empower Thousands of <br />Stammerers Globally</h1>
                    <p className='slide_p1'>Please Share a few lines, or a 1-minute  video about your journey and inspire others.<br />
                        <b>Mail us at hello@stammerersconnect.org </b></p>
                </div>
            </section>
        </div>
    )
}
