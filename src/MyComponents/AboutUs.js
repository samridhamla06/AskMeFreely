import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { handleLogin, handleLoginFailure } from '../utils/UserLoginUtils';
import swal from 'sweetalert';

export const AboutUs = (props) => {
    let navigate = useNavigate();


    const handleLoginWithProps = (googleData) => {
        handleLogin(googleData, props.updateUser);
    }

    return (
        <div className='container-fluid'>
            <header className="masthead">
                <div className="container position-relative">
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <div className="text-center text-white">
                                {/* <!-- Page heading--> */}
                                <h1 className="mb-5" style={{color : 'white'}}>Get Help From Fellow Stammerers!</h1>
                                <div className="row">
                                        <div className="col"><button className="myButton" onClick={() => { navigate("/mentors", { replace: true }) }}><i class="bi bi-binoculars"></i> Find Mentors</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="features-icons bg-light text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex"><i className="fa fa-book m-auto text-primary"></i></div>
                                <h3>1:1 Mentorship</h3>
                                <p className="lead mb-0">Book 1:1 Mentorship sessions with friends who have overcome stammering themselves</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex"><i className="fa fa-book m-auto text-primary"></i></div>
                                <h3>Join Events</h3>
                                <p className="lead mb-0">Interact with fellow stammerers with various events</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-3">
                                <div className="features-icons-icon d-flex"><i className="fa fa-book m-auto text-primary"></i></div>
                                <h3>Parents of Stammerers</h3>
                                <p className="lead mb-0">Parents of stammerers can connect among themselves</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-3">
                                <div className="features-icons-icon d-flex"><i className="fa fa-book m-auto text-primary"></i></div>
                                <h3>Speech Therapists</h3>
                                <p className="lead mb-0">Connect with multiple Speech Therapists</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="showcase">
                <div class="container-fluid p-0">
                    <Link to={"/mentors"} state={{ replace: false }} style={{ textDecoration: 'none', color: 'black' }}>
                        <div class="row g-0">
                            <div class="col-lg-6 order-lg-2 text-white image-1 showcase-img "></div>
                            <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                                <h2>Find Mentors</h2>
                                <p class="lead mb-0">Choose from our highly rated Mentors, most of them have been stammerers themselves. Checkout their success journey on how they overcame this problem.</p>
                            </div>
                        </div>
                    </Link>
                    <Link to={"/mentors"} state={{ replace: false }} style={{ textDecoration: 'none', color: 'black' }}>
                        <div class="row g-0">
                            <div class="col-lg-6 text-white showcase-img image-2"></div>
                            <div class="col-lg-6 my-auto showcase-text">
                                <h2>Schedule a 1:1 Mentoring Session</h2>
                                <p class="lead mb-0">Log in with your Gmail account and book a 1:1 session with these mentors. You can coordinate and setup video call with the Mentor on a mutually decided time.</p>
                            </div>
                        </div>
                    </Link>
                    <a onClick={() => {
                                if (!props.isLoggedIn) {
                                    swal("Oops", "Please log in and try again", "error");
                                }else{
                                    navigate("/register");
                                }
                    }} state={{ replace: false }} style={{ textDecoration: 'none', color: 'black' }} href = "#">
                        <div class="row g-0">
                            <div class="col-lg-6 order-lg-2 text-white showcase-img image-3"></div>
                            <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                                <h2>Enroll as a Mentor</h2>
                                <p class="lead mb-0">If you feel you can inspire/mentor other stammerers, please login through Gmail and Enroll as a Mentor</p>
                            </div>
                        </div>
                    </a>
                    <Link to={"/events"} state={{ replace: false }} style={{ textDecoration: 'none', color: 'black' }}>
                        <div class="row g-0">
                            <div class="col-lg-6 text-white showcase-img image-4"></div>
                            <div class="col-lg-6 my-auto showcase-text">
                                <h2>Join Virtual Events</h2>
                                <p class="lead mb-0">You can join various Virtual Events to interact with fellow stammerers in a group.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {!props.isLoggedIn && (<section class="call-to-action text-white text-center" id="signup">
                <div class="container position-relative">
                    <div class="row justify-content-center">
                        <h2 class="mb-4">Ready to get Mentored? Log In now!</h2>
                        <div class="col-xl-6">
                            <GoogleLogin
                                render={
                                    renderProps => (
                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="navbar-button" ><i class="bi bi-google"></i> Log In With Google</button>
                                    )}
                                clientId={process.env.REACT_APP_GOOGLE_API_KEY}
                                buttonText="Log In"
                                onSuccess={handleLoginWithProps}
                                onFailure={handleLoginFailure}
                                cookiePolicy={'single_host_origin'} />
                        </div>
                    </div>
                </div>
            </section>)}

        </div>
    )
}
