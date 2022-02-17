import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN, SEND_MESSAGE_URL, LOGGED_IN_NAME } from '../constants/url';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

export const MentorProfile = (props) => {
    const [showPrompt, setShowPrompt] = useState(false);
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


    const sendMessage = (event) => {
        event.preventDefault();
        let access_token = localStorage.getItem(ACCESS_TOKEN);
        let from_name = localStorage.getItem(LOGGED_IN_NAME);

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
                    alert('Message Sent successfully')
                } else {
                    alert('ERROR OCCURED, TRY AGAIN')
                }
            })
            .catch(
                err => {
                    console.log(err);
                });
    }

    //let broValue = query.get("bro")
    return (
        <div >
            {showPrompt ?
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    style={{ opacity: 1, display: 'block' }}
                    show={true}
                    onHide={() => setShowPrompt(false)}
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Send Personalized message to Mentor
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*<h4>Centered Modal</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                            consectetur ac, vestibulum at eros.
                        </p>*/}
                        <div className='container'>
                            <form onSubmit={sendMessage}>
                                <div className="form-group">
                                    <label for="exampleFormControlTextarea1">Your Message</label>
                                    <textarea className="form-control" id="story" rows="6" width='90%'></textarea>
                                </div>
                                <br />
                                <button type="submit" className="btn btn-primary" on>Send</button>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
                : <div></div>
            }
            <div className="d-flex flex-column bg-white justify-content-center">
                <div className='flex-item m-2'>
                    <div className='d-flex justify-content-center flex-wrap'>
                        {/* 1st Row begins */}

                        <div className='flex-grow-2 mentor-profile-container d-flex flex-column justify-content-center border border-light text-center align-items-center p-5'>
                            <img src={mentorObj.imageURL} alt="avatar" className="rounded-circle img-fluid align-self-center mt-1 mb-2" style={{ width: '150px' }} />
                            <h4 >{mentorObj.name}</h4>
                            <p className="text-muted mb-1">Full Stack Developer</p>
                            <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                            <button type="button" className="myButton mb-1 align-self-center" onClick={() => setShowPrompt(true)}>Send Message</button>
                        </div>
                        <div className='flex-grow-1 mentor-profile-container flex-item border border-light m-2 p-2'>
                            <h4>My Journey</h4>
                            <p className="text-muted mb-1 p-1">{mentorObj.story}</p>
                        </div>

                        {/* <div className='mentor-profile-container d-flex flex-column flex-grow-1 mx-1 border border-light mt-xs-2'>
                            <div className="d-flex flex-grow-1 justify-content-between border border-light align-items-center">
                                <div><p className="text-muted mb-1 p-1">LinkedInLogo</p></div>
                                <div><p className=" mb-1 p-1">https://mdbootstrap.com</p></div>
                            </div>

                            <div className="d-flex flex-grow-1 justify-content-between border border-light align-items-center">
                                <p className="text-muted mb-1 p-1">LinkedInLogo</p>
                                <p className=" mb-1 p-1">https://mdbootstrap.com</p>
                            </div>

                            <div className="d-flex flex-grow-1 justify-content-between border border-light align-items-center">
                                <p className="text-muted mb-1 p-1">LinkedInLogo</p>
                                <p className=" mb-1 p-1">https://mdbootstrap.com</p>
                            </div>

                            <div className="d-flex flex-grow-1 justify-content-between border border-light align-items-center">
                                <p className="text-muted mb-1 p-1">LinkedInLogo</p>
                                <p className="mb-1 p-1">https://mdbootstrap.com</p>
                            </div>

                            <div className="d-flex flex-grow-1 justify-content-between border border-light align-items-center">
                                <p className="text-muted mb-1 p-1">LinkedInLogo</p>
                                <p className=" mb-1 p-1">https://mdbootstrap.com</p>
                            </div>
                        </div> */}

                    </div>
                </div>

                {/* <div className='mentor-profile-container flex-item border border-light m-2 p-2'>
                    <h4>My Journey</h4>
                    <p className="text-muted mb-1 p-1">{mentorObj.story}</p>
                </div> */}

                <div className='mentor-profile-container flex-item border border-light m-2 p-2'>
                    <h4>How can I help ?</h4>
                </div>

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
