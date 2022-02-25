import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN, SEND_MESSAGE_URL, LOGGED_IN_NAME } from '../constants/url';
import Modal from 'react-bootstrap/Modal';
import { STAMMERING_STATUS_MAP } from '../constants/map';

export const MentorProfile = (props) => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
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

        if (!access_token) {
            alert('Please log in to Connect');
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
                    alert('Message Sent successfully')
                } else {
                    alert('ERROR OCCURED, TRY AGAIN')
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
                    style={{ opacity: 1, display: 'block',alignContent: 'center' }}
                    show={true}
                    onHide={() => setShowPrompt(false)}
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{fontWeight: '700',marginBottom : '5px',fontSize: '20px',color: '#012970', alignContent: 'center'}}>
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
            <div className="d-flex flex-column bg-white justify-content-center align-items-stretch m-1">
                <div className='flex-item m-2 d-flex'>
                        {/* 1st Row begins */}
                        <div className='flex-grow-1 mentor-profile-container d-flex flex-column justify-content-center border border-light text-center align-items-start p-2'>
                            <img src={mentorObj.imageURL} alt="avatar" className="my-rounded-circle mb-3 d-block" />
                            <h4 >{mentorObj.name}</h4>
                            <p className="text-muted mb-1">{mentorObj.tagLine ? STAMMERING_STATUS_MAP.get(mentorObj.tagLine) : "Fellow Stammerer"}</p>
                            {mentorObj.location ? <p className="text-muted mb-4">{mentorObj.location} </p> : <></>}
                            {/* <button type="button" className="myButton mb-1" onClick={() => setShowPrompt(true)}>Send Message</button> */}
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
