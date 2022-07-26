import React, { useState, useEffect } from 'react';
import { useParams, useLocation,useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, BOOK_SESSION_URL, LOGGED_IN_EMAIL, LOGGED_IN_NAME, GET_REVIEW_URL } from '../constants/url';
import Modal from 'react-bootstrap/Modal';
import { STAMMERING_STATUS_MAP, RATING_MAP } from '../constants/map';
import swal from 'sweetalert';
import Rating from 'react-rating'
import { checkTokenFromResponse } from '../utils/UserLoginUtils';

export const MentorProfile = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])

      let navigate = useNavigate();

    const [showPrompt, setShowPrompt] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [reviews, setReviews] = useState([]);

    console.log(props.mentorObj);

    const location = useLocation();
    if(!location.state){
        //redirect to home page
        navigate("/", { replace: true });
    }
    const mentorObj = location.state.mentorObj;
    if (!mentorObj) {
        mentorObj = props.dummmyMentorListObj;
    }

    const sendMessage = (event) => {
        event.preventDefault();
        let access_token = localStorage.getItem(ACCESS_TOKEN);
        let from_email = localStorage.getItem(LOGGED_IN_EMAIL);

        if (!access_token) {
            swal("Oops!", "Please login to Book", "error");
            setShowPrompt(false);
            return;
        }

        if(from_email === mentorObj.email){
            swal("Oops!", "You can't book session with yourself", "error");
            setShowPrompt(false);
            return;
        }

        const requestBody = {
            message: event.target.story.value,
            menteeId: from_email,
            mentorId: mentorObj.email
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': access_token },
            body: JSON.stringify(requestBody)
        };

        setShowSpinner(true);

        fetch(BOOK_SESSION_URL, requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.status == 'Successfully Saved') {
                    swal("Awesome!", "Session Booked Successfully", "success");
                } else {
                    let message = response.errorCode ? response.errorMessage : 'ERROR OCCURED, TRY AGAIN';
                    if(checkTokenFromResponse(response, props.updateUser)){
                        return;                  
                    }else{
                        swal("Oops!", message, "error");
                    }                
                }
            })
            .catch(
                err => {
                    console.log(err);
                })
            .finally(() => {
                setShowSpinner(false);
                setShowPrompt(false);
            });
    }


    useEffect(() => {

        //API call to fetch user info
        fetch(GET_REVIEW_URL + "/?emailId=" + mentorObj.email,
            { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then(response => response.json())
            .then(response => {
                console.log('Reviews received from Backend', response);
                setReviews(response);
            })
            .catch(
                err => {
                    console.log(err);
                });
    }, [])
//https://calendly.com/samridh06/60min
    //let broValue = query.get("bro")
    return (
        <div className='pt-5 mt-4'>
            {showPrompt &&
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    style={{ opacity: 1, display: 'block', alignContent: 'center' }}
                    show={true}
                    onHide={() => setShowPrompt(false)}
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ fontWeight: '700', marginBottom: '5px', fontSize: '20px', color: '#012970', alignContent: 'center' }}>
                            Book Session
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <h4 className='name-caption'>Book a Mentoring session with {mentorObj.name}</h4> */}
                        <p>
                            This will generate an email communication between you and {mentorObj.name}, so that we can book a 1:1 session online.
                        </p>
                        <h4>Briefly explain what do you expect from this 1:1 session</h4>
                        <form onSubmit={sendMessage} className='d-flex flex-column justify-content-center align-items-center'>
                            <div className="form-group align-self-stretch">
                                <textarea className="form-control" id="story" rows="6" width='100%'></textarea>
                            </div>
                            <button type="submit" className="myButton mt-2">
                                {showSpinner ?
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    :
                                    <>Send</>}
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            }

            <div className="d-flex flex-column bg-white justify-content-center align-items-stretch m-1">
                <div className='flex-item m-2 d-flex'>
                    {/* 1st Row begins */}
                    <div className='flex-grow-1 mentor-profile-container d-flex flex justify-content-evenly border border-light text-center p-2 flex-wrap'>
                        <img src={mentorObj.imageURL} alt="avatar" className="my-profile-image img-fluid d-block align-self-start m-4" />
                        <div className='d-flex flex-column'>
                            <h5 className='name-caption mt-3 mb-3 mx-5'>Hello, I am {mentorObj.name}</h5>
                            <p className="text-muted mb-1">{mentorObj.tagLine ? STAMMERING_STATUS_MAP.get(mentorObj.tagLine) : "Fellow Stammerer"}</p>
                            {mentorObj.location ? <p className="text-muted mb-4">{mentorObj.location} </p> : <></>}
                            <div className='d-flex justify-content-center'>
                                <button type="button" className="myButton mb-1 align-self-center" onClick={() => setShowPrompt(true)}><i class="fa fa-meetup" aria-hidden="true"></i> Book Session</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='mentor-profile-container flex-item border border-light m-2 p-2'>
                    <h4>My Journey</h4>
                    <p className="text-muted mb-1 p-1">{mentorObj.story}</p>
                </div>

                {
                    mentorObj.tip && (
                        <div className='mentor-profile-container flex-item border border-light m-2 p-2'>
                            <h4>How can I help ?</h4>
                            <p className="text-muted mb-1 p-1">{mentorObj.tip}</p>
                        </div>)
                }

                {reviews.length > 0 &&
                    <div className='mentor-profile-container flex-item m-2 p-2'>
                        <h4>My Reviews</h4>               
                        {reviews.map((reviewObj, index) => {
                            return (
                            <div className='mentor-profile-container blockquote flex-item m-2 p-2'>
                                            <Rating
                                                emptySymbol="fa fa-star-o"
                                                fullSymbol="fa fa-star checked"
                                                readonly = "true"
                                                initialRating={reviewObj.actualRating}
                                            />
                                            <p className='text-muted'>{reviewObj.review}</p>
                                            <footer class="blockquote-footer"><cite title="Source Title">{reviewObj.reviewerName}</cite></footer>
                            </div>
                            )
                        })}
                    </div>
                }
            </div>

        </div>
    )
}

MentorProfile.defaultProps = {
    dummmyMentorListObj: [
        {
            name: "Dummy",
            age: "28",
            story: "Started my journey 20 years ago, still struggling.",
            imageURL: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
        }
    ]
}
