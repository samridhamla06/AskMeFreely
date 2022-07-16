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
                <div className="container position-relative">
                    <div className="row justify-content-center d-flex">
                        <div className="col-6">
                            <h5 className='h_ft1'>For the stammerers<br /> who don't want<br /> Stammering to <br />control their life</h5>
                            <p className='p_ft2'>We are non-profit organization with the<br />mission to provide affordable help to stammerers<br />from experts</p>
                            <div className='row d-flex text-white text-center mt-4'>
                                <div className='col-2 stm bt_h'>
                                    <p className='p_stm'>Stammerers</p>
                                </div>
                                <div className='col-sm-2 part bt_h'>
                                    <p className='p_part'>Parents</p>
                                </div>
                                <div className='col-sm-2 sf bt_h'>
                                    <p className='p_sf'>Sibling/Friends</p>
                                </div>
                                {(isMobile) ? (
                                    <div className='col-sm-2 mdq'>
                                        <p className='mdq_p'>Start here</p>
                                    </div>) : false}
                            </div>
                        </div>
                        {!isMobile ? <div className='col-6 img-fluid d-flex justify-content-center'>
                            <img src={landingPagePhoto} className="landing_page_style flex-item" alt="..." />
                            </div> : 
                        <></>}           
                        {/* <div className="col-6 side_img img-fluid mh"></div> */}
                    </div>
                    <div className="d-flex mt-5 justify-content-center">
                        <button className="bt_ment" onClick={() => { navigate("/mentors", { replace: true }) }}> Avail Your First Free Session </button>
                    </div>
                </div>
            </header>
            <section className="features-icons">
                <div className="container text-center mb-lg-3">
                    <div className="row" >
                        <div className="col-lg-4">
                            <div className="card">
                                <img src={mentorPhoto} className="mentor_page_style" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">1:1 Mentorship</h5>
                                    <p className="card-text mt-4">Speech Therapists, AudioLogists, Psychologists, and experienced Stammerers, all here to help you at the most affordable cost.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <img src={teachingPhoto} className= "mentor_page_style" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Join Events</h5>
                                    <p className="card-text mt-4">Interact with your stammering friends who have overcome stammering. Gaining confidence, career lessons and much more! </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <img src={changeMakers} className="mentor_page_style" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Allies</h5>
                                    <p className="card-text mt-4">Parents, siblings, and friends of stammerers! You're all invited to connect, share your experiences and become emotionally intelligent.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="showcase text-center show_top">
                <div class="container shc">
                    <Link to={"/mentors"} state={{ replace: false }} style={{ textDecoration: 'none', color: 'black' }}>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <img src={stammerersPhoto} className='sad_stammerer_style img-fluid rounded showcase-img' alt="..." />
                            </div>
                            <div className='col-lg-6'>
                                <h2 className='show_h2'>STAMMERERS</h2>
                                <p className='show_p1 mt-4'>"I was struggling to find a space <br />where I can share what I feel since <br /> help was not affordable but once I <br /> found Stammerers Connect, I have<br /> been exceptionally improving not <br /> just in stammering, but literally in all <br /> areas of my life!"</p>
                                <p className='show_p2 mt-4'>We connect you with real doctors having min 25 years of <br />experience to help build unbreakable confidence within<br /> yourself.</p>
                                <div className='show_stm_jcs'>
                                    <div className='d-flex  justify-content-end'>
                                        <div className=''>
                                            <p className='myButton'>Stammerers, start here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to={"/mentors"} state={{ replace: false }} style={{ textDecoration: 'none', color: 'black' }}>
                        <div className='row show_m_top'>
                            <div className='col-lg-6 move_down'>
                                <h2 className='show_parent_h2'>PARENTS OF STAMMERERS</h2>
                                <p className='show_parent_p1 mt-4'>"My child has been stammering <br />from  the minute he starting <br />uttering his first words. Stammerers <br />Connect helps me to understand <br />and fix my actions and reactions to <br />become more careful with my  <br />parenting"</p>
                                <p className='show_parent_p2 mt-4'>Parents, siblings and friends of stammerers, we're here to help <br />you to show that you care and create a comfortable <br />environment for them.</p>
                                <div className='d-flex justify-content-start'>
                                    <div className=''>
                                        <p className='myButton'>Parents, start here</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 move_up'>
                                <img src={parentsPhoto} className='parent_stammerer_style img-fluid rounded showcase-img' alt="..." />
                            </div>
                        </div>
                    </Link>
                    {/* <Link to={"/events"} state={{ replace: false }} style={{ textDecoration: 'none', color: 'black' }}>
                        <div className='row show_m_top'>
                            <div className='col-lg-6'>
                                <img src={photo3} className='img-fluid rounded showcase-img' alt="..." />
                            </div>
                            <div className='col-lg-6'>
                                <h2 className='show_h2'>PARENTS OF STAMMERERS</h2>
                                <p className='show_p1 mt-4'>"My child has been stammering <br />from  the minute he starting <br />uttering his first words. Stammerers <br />Connect helps me to understand <br />and fix my actions and reactions to <br />become more careful with my  <br />parenting"</p>
                                <p className='show_p2 mt-4'>Parents, siblings and friends of stammerers, we're here to help <br />you to show that you care and create a comfortable <br />environment for them.</p>
                                <div className='show_stm_jcs'>
                                    <div className='d-flex  justify-content-end'>
                                        <div className='showcase_stm'>
                                            <p className='show_stm_p1'>Mentor, start here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link> */}
                </div>
            </section>
            <section className='slider'>
                <div className='container-fluid'>
                    <h1 className='text-center text-black slide_h1'>Meet our co-founder, Samridh</h1>
                    <div className='container text-center ifrm'>
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <h1 className='slide_h2'>Share your story, and empower thousand of <br />stammers to create their own life</h1>
                    <p className='slide_p1'>We will share your story on our social media. Share a few lines, or a 1 minute video about your<br />life, and teach others who stammering is not their whole life, but only a part of it.<br />
                        Email us at hello@stammerersconnect.org </p>
                </div>
            </section>
        </div>
    )
}
