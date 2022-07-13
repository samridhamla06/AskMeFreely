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
import photo3 from '../assets/img/landingPagePhoto.jpg';
import mentorPhoto from '../assets/img/Mentorship.png';
import teachingPhoto from '../assets/img/teaching.png';
import parentsPhoto from '../assets/img/Parents2.jpg';
import stammerersPhoto from '../assets/img/concept-about-business-failure.png'
import changeMakers from '../assets/img/online-learning-concept.png'


export const Mentor = ({ mentorListObj }) => {

    // const [showDropdown, setShowDropDown] = useState(4);
    const isMobile = useMediaQuery({ query: `(max-width: 600px)` });


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
                <h3 className="fw-bolder">Meet Our Mentor</h3>
                <div className="text-ceneter fw-normal mt-4">
                    <p className='fw_p_1'>Realize your fullest potential and lay a concrete path to recovery with industry-best doctors and <br /> experienced mentors who are here to give you affordable, but and step-by-step support<br />to embolden you with your highest self!</p>
                </div>
                <button type="button " className="bt_ment">I want to become a mentor!</button>
            </div>
            <section className="features-icons">
                <div className="container ch text-center mb-5">
                    <div className="row" >
                        <div className="col-lg-4 cq">
                            <div className="card">
                                <img src={mentorPhoto} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">1:1 Mentorship</h5>
                                    <p className="card-text mt-4">Speech Therapists, Audiologists, Psychologists, and experienced Stammerers, all here to help you at the most affordable cost.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 cq">
                            <div className="card">
                                <img src={teachingPhoto} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Join Events</h5>
                                    <p className="card-text mt-4">Interact with your stammering friends who have overcome stammering. Gaining confidence, career lessons and much more! </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 cq">
                            <div className="card">
                                <img src={changeMakers} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">For change makers</h5>
                                    <p className="card-text mt-4">Parents, siblings, and friends of stammerers! You're all invited to connect, share your experiences and become emotionally intelligent.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="texth text-center m-3">
                <h3 className="fw-bolder_1">Some kind feedback from our dear stammerers</h3>
            </div>
            <div className="container-fluid mt-3 ">
                
                <div className="row md_carousel">
                    <div className="col-lg-6 cl">
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

                    <div className="col-lg-6 hid">
                        {/* <img src={photo4} className="img-fluid" alt="" />
                        <img src={photo5} className="img_circle_1" alt="" /> */}
                        <div className="container sm_ct_set">
                            <img src={photo4} className="img-fluid" alt="" />
                            <div className="img_circle_1"><img src={photo5} className="ic_1" alt="" /></div>
                            <div className="img_circle_2"><img src={photo5} className="ic_2" alt="" /></div>
                            <div className="img_circle_3"><img src={photo5} className="ic_3" alt="" /></div>
                            <div className="img_circle_4"><img src={photo5} className="ic_4" alt="" /></div>
                            <div className="img_circle_5"><img src={photo5} className="ic_5" alt="" /></div>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className='text-center text-black our_ment'>Our Mentor</h1>
            {(isMobile) ? (
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


            <h1 className='text-center text-black mt-5 owl_h1'>Stammerers, for the heart-to-heart and career conversation</h1>
            {(isMobile) ? (
                <div className='container mt-3 m_r'>
                    <OwlCarousel
                        className='owl-theme owl-nav owl-prev owl-next owl-dot'
                        loop margin={10}
                        items="1"
                        autoplay
                        dots
                        nav>
                        {mentorListObj.map((mentorObj, index) => {
                            return (
                                <div className='item'>
                                    <div className='image'>
                                        <img src={mentorObj.imageURL} className='olc image_img' alt="..." />
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