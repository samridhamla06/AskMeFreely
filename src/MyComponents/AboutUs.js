import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/img/hero-img.png';
import { useNavigate, Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { handleLogin, handleLoginFailure } from '../utils/UserLoginUtils';

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
                                <h1 className="mb-5">Get Help From Fellow Stammerers!</h1>
                                {/* <!-- Signup form-->
                            <!-- * * * * * * * * * * * * * * *-->
                            <!-- * * SB Forms Contact Form * *-->
                            <!-- * * * * * * * * * * * * * * *-->
                            <!-- This form is pre-integrated with SB Forms.-->
                            <!-- To make this form functional, sign up at-->
                            <!-- https://startbootstrap.com/solution/contact-forms-->
                            <!-- to get an API token!--> */}
                                <form className="form-subscribe" id="contactForm" data-sb-form-api-token="API_TOKEN">
                                    {/* <!-- Email address input--> */}
                                    <div className="row">
                                        {/* <div className="col">
                                            <input className="form-control form-control-lg" id="emailAddress" type="email" placeholder="Email Address" data-sb-validations="required,email" />
                                            <div className="invalid-feedback text-white" data-sb-feedback="emailAddress:required">Email Address is required.</div>
                                            <div className="invalid-feedback text-white" data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
                                        </div> */}
                                        <div className="col"><button className="myButton" onClick={() => { navigate("/mentors", { replace: true }) }}><i class="bi bi-binoculars"></i> Find Mentors</button></div>
                                    </div>
                                    {/* <!-- Submit success message-->
                                <!---->
                                <!-- This is what your users will see when the form-->
                                <!-- has successfully submitted--> */}
                                    <div className="d-none" id="submitSuccessMessage">
                                        <div className="text-center mb-3">
                                            <div className="fw-bolder">Form submission successful!</div>
                                            <p>To activate this form, sign up at</p>
                                            <a className="text-white" href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                        </div>
                                    </div>
                                    {/* <!-- Submit error message-->
                                <!---->
                                <!-- This is what your users will see when there is-->
                                <!-- an error submitting the form--> */}
                                    <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                                </form>
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
                            <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                <div className="features-icons-icon d-flex"><i className="fa fa-book m-auto text-primary"></i></div>
                                <h3>Parents of Stammerers</h3>
                                <p className="lead mb-0">Parents of stammerers can connect among themselves</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="features-icons-item mx-auto mb-0 mb-lg-3">
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
                    <div class="row g-0">
                        <div class="col-lg-6 order-lg-2 text-white image-1 showcase-img "></div>
                        <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                            <h2>Fully Responsive Design</h2>
                            <p class="lead mb-0">When you use a theme created by Start Bootstrap, you know that the theme will look great on any device, whether it's a phone, tablet, or desktop the page will behave responsively!</p>
                        </div>
                    </div>
                    <div class="row g-0">
                        <div class="col-lg-6 text-white showcase-img image-2"></div>
                        <div class="col-lg-6 my-auto showcase-text">
                            <h2>Updated For Bootstrap 5</h2>
                            <p class="lead mb-0">Newly improved, and full of great utility classes, Bootstrap 5 is leading the way in mobile responsive web development! All of the themes on Start Bootstrap are now using Bootstrap 5!</p>
                        </div>
                    </div>
                    <div class="row g-0">
                        <div class="col-lg-6 order-lg-2 text-white showcase-img image-3"></div>
                        <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                            <h2>Easy to Use & Customize</h2>
                            <p class="lead mb-0">Landing Page is just HTML and CSS with a splash of SCSS for users who demand some deeper customization options. Out of the box, just add your content and images, and your new landing page will be ready to go!</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="call-to-action text-white text-center" id="signup">
                <div class="container position-relative">
                    <div class="row justify-content-center">
                        <h2 class="mb-4">Ready to get Mentored? Log In now!</h2>
                        <div class="col-xl-6">
                            <GoogleLogin
                                render={
                                    renderProps => (
                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="navbar-button" ><i class="bi bi-google"></i> Log In</button>
                                    )}
                                clientId={process.env.REACT_APP_GOOGLE_API_KEY}
                                buttonText="Log In"
                                onSuccess={handleLoginWithProps}
                                onFailure={handleLoginFailure}
                                cookiePolicy={'single_host_origin'} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
