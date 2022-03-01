import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN, SEND_MESSAGE_URL, LOGGED_IN_NAME } from '../constants/url';
import Modal from 'react-bootstrap/Modal';
import { STAMMERING_STATUS_MAP, RATING_MAP } from '../constants/map';
import swal from 'sweetalert';
import Rating from 'react-rating'

export const MentorProfile = (props) => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [showReviewPrompt, setShowReviewPrompt] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [rating, setRating] = useState(0);
    // function useQuery() {
    //     // Use the URLSearchParams API to extract the query parameters
    //     // useLocation().search will have the query parameters eg: ?foo=bar&a=b
    //     return new URLSearchParams(useLocation().search)
    // }
    console.log(props.mentorObj);
    //const params = useParams();
    //const query = useQuery();
    const location = useLocation();
    const mentorObj = location.state.mentorObj;
    if (!mentorObj) {
        mentorObj = props.dummmyMentorListObj;
    }

    const createReview = (event) => {

        event.preventDefault();
        let access_token = localStorage.getItem(ACCESS_TOKEN);

        if (!access_token) {
            swal("Oops!", "Please login to Book", "error");
            setShowPrompt(false);
            return;
        }


    }

    const handleRating = (rate) => {
        setRating(rate);
    }


    const sendMessage = (event) => {
        event.preventDefault();
        let access_token = localStorage.getItem(ACCESS_TOKEN);
        let from_name = localStorage.getItem(LOGGED_IN_NAME);

        if (!access_token) {
            swal("Oops!", "Please login to Book", "error");
            setShowPrompt(false);
            return;
        }

        setShowSpinner(true);

        const requestBody = {
            message: event.target.story.value,
            fromEmail: from_name,
            toEmail: mentorObj.email
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': access_token },
            body: JSON.stringify(requestBody)
        };

        fetch(SEND_MESSAGE_URL, requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.status == 'Successfully Saved') {
                    swal("Awesome!", "Session Booked Succesfully", "success");
                } else {
                    swal("Oops!", "ERROR OCCURED, TRY AGAIN", "error");
                }
            })
            .catch(
                err => {
                    console.log(err);
                })
            .finally(() => {
                setShowSpinner(false);
                setShowPrompt(false)
            });
    }

    //let broValue = query.get("bro")
    return (
        <div >
            {showPrompt ?
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
                : <div></div>
            }

            {showReviewPrompt ?
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    style={{ opacity: 1, display: 'block', alignContent: 'center' }}
                    show={true}
                    onHide={() => setShowReviewPrompt(false)}
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ fontWeight: '700', marginBottom: '5px', fontSize: '20px', color: '#012970', alignContent: 'center' }}>
                            Give Review
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <h4 className='name-caption'>Book a Mentoring session with {mentorObj.name}</h4> */}
                        <p>
                            Please give your honest feedback/review for the session you had with {mentorObj.name}.
                        </p>
                        <div>
                            <h4>Overall Rating:</h4>
                            <Rating
                                emptySymbol="fa fa-star-o fa-2x "
                                fullSymbol="fa fa-star fa-2x checked"
                                onChange={handleRating}
                            />

                            {rating > 0 ? <p>{RATING_MAP.get(rating)}!</p>: <></>}

                        </div>
                        <form onSubmit={createReview} className='d-flex flex-column justify-content-center align-items-center'>
                            <div className="form-group align-self-stretch m-1">
                                <h4>Review</h4>
                                <textarea className="form-control" id="story" rows="6" width='100%'></textarea>
                            </div>
                            <button type="submit" className="myButton mt-2" onClick={() =>{
                                swal("Awesome!", "Review Accepted Successfully", "success");
                                setShowReviewPrompt(false);                                
                            }}>
                                {showSpinner ?
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    :
                                    <>Send Review</>}
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
                : <div></div>
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
                                <button type="button" className="myButton mb-1 align-self-center" onClick={() => setShowPrompt(true)}><i class="fa fa-meetup" aria-hidden="true"></i> | Session</button>
                                <button type="button" className="myButton mb-1 align-self-center" onClick={() => setShowReviewPrompt(true)}><i class="fa fa-commenting-o" aria-hidden="true"></i> | Review</button>
                            </div>
                        </div>

                    </div>

                    <div>
                        {/* ratings */}
                        {/* reviews */}
                        {/* connections */}
                    </div>
                </div>

                <div className='mentor-profile-container flex-item border border-light m-2 p-2'>
                    <h4>My Journey</h4>
                    <p className="text-muted mb-1 p-1">{mentorObj.story}</p>
                </div>

                {mentorObj.tip ? (
                    <div className='mentor-profile-container flex-item border border-light m-2 p-2'>
                        <h4>How can I help ?</h4>
                        <p className="text-muted mb-1 p-1">{mentorObj.tip}</p>
                    </div>)
                    : <></>}
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
