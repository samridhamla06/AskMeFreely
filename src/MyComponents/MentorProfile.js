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
        <div className='container'>
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


            <div className="container bg">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <img src={mentorObj.imageURL} alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                                <h5 className="my-3">{mentorObj.name}</h5>
                                <p className="text-muted mb-1">Full Stack Developer</p>
                                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <button type="button" className="btn btn-outline-primary ms-1" onClick={() => setShowPrompt(true)}>Message</button>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-4 mb-lg-0">
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush rounded-3">
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fas fa-globe fa-lg text-warning"></i>
                                        <p className="mb-0">https://mdbootstrap.com</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
                                        <p className="mb-0">mdbootstrap</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                                        <p className="mb-0">@mdbootstrap</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                                        <p className="mb-0">mdbootstrap</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                                        <p className="mb-0">mdbootstrap</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card mb-4 mb-md-0">
                                    <div className="card-body">
                                        <p className="mb-4"><span className="text-primary font-italic me-1">My Story</span></p>
                                        <p className="mb-1" style={{ fontSize: '.77rem' }}>{mentorObj.story}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
