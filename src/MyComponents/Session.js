import React, { useEffect, useState } from 'react'
import { COMPLETE_SESSION_URL, ACCESS_TOKEN,CREATE_REVIEW_URL } from '../constants/url';
import Modal from 'react-bootstrap/Modal';
import swal from 'sweetalert';
import { STAMMERING_STATUS_MAP, RATING_MAP } from '../constants/map';
import Rating from 'react-rating'

export const Session = (props) => {
    console.log('session obj ', props);
    let access_token = localStorage.getItem(ACCESS_TOKEN);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showReviewButtonSpinner, setShowReviewButtonSpinner] = useState(false);
    const [showReviewPrompt, setShowReviewPrompt] = useState(false);
    const [rating, setRating] = useState(0);

    const handleRating = (rate) => {
        setRating(rate);
    }

    const createReview = (event) => {

        event.preventDefault();
        setShowReviewButtonSpinner(true);
        let access_token = localStorage.getItem(ACCESS_TOKEN);

        if (!access_token) {
            swal("Oops!", "Please login to Book", "error");
            return;
        }
        //construct body
        const requestBody = 
        {
            sessionId: props.session.id,
            review: event.target.reviewMessage? event.target.reviewMessage.value : "",
            actualRating:rating
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': access_token },
            body: JSON.stringify(requestBody)
        };

        fetch(CREATE_REVIEW_URL, requestOptions)
        .then(response => response.json())
        .then(response => {
            if (response.status == 'Successfully Saved') {
                swal("Awesome", "Profile is successfully updated", "success")
            } else {
                swal("Oops", "ERROR OCCURED, TRY AGAIN", "error")
            }
        })
        .catch(
            err => {
                console.log(err);
            })
        .finally(() => {
                /**
                 * render count basically forces SessionList to reload and rerun useEffect again and call sessions again.
                 */
            setShowReviewButtonSpinner(false);
            setShowReviewPrompt(false);
            props.setRenderCount((oldValue) => (oldValue + 1));
        });
    }

    const completeSession = (event) => {
        console.log('complete session called');

        const requestBody = {
            mentorId: props.session.mentorId,
            id: props.session.id,
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': access_token },
            body: JSON.stringify(requestBody)
        };

        console.log(requestOptions);

        setShowSpinner(true);
        fetch(COMPLETE_SESSION_URL, requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.status == 'Successfully Saved') {
                    swal("Awesome", "Session is Completed", "success")
                } else {
                    swal("Oops", "ERROR OCCURED, TRY AGAIN", "error")
                }
            })
            .catch(
                err => {
                    console.log(err);
                })
            .finally(() => {
                /**
                 * render count basically forces SessionList to reload and rerun useEffect again and call sessions again.
                 */
                props.setRenderCount((oldValue) => (oldValue + 1));
                setShowSpinner(false);
            });
    }

    return (

        <>
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
                            Please give your honest feedback/review for the session you had with {props.session.mentorId}.
                        </p>
                        <div>
                            <h4>Overall Rating:</h4>
                            <Rating
                                emptySymbol="fa fa-star-o fa-2x "
                                fullSymbol="fa fa-star fa-2x checked"
                                onChange={handleRating}
                            />

                            {rating > 0 ? <p>{RATING_MAP.get(rating)}!</p> : <></>}

                        </div>
                        <form onSubmit={createReview} className='d-flex flex-column justify-content-center align-items-center'>
                            <div className="form-group align-self-stretch m-1">
                                <h4>Review</h4>
                                <textarea className="form-control" id="reviewMessage" rows="6" width='100%'></textarea>
                            </div>
                            <button type="submit" className="myButton mt-2">
                                {showReviewButtonSpinner ?
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    :
                                    <>Send Review</>}
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
                : <div></div>
            }


            <tr>
                <th scope="row">{props.sNo}</th>
                <td>{props.session.createTs.substring(0, 10)}</td>
                <td>
                    {(props.asMentor) ? props.session.menteeName : props.session.mentorName}              
                </td>
                <td>{props.session.sessionStatus}</td>
                {            
                    (props.asMentor) 
                    ? 
                    (
                        <td>
                            {(props.session.sessionStatus === 'COMPLETED')
                                ? "N/A" :
                                <button className='myButton m-lg-1 text-center p-2' onClick={completeSession}>
                                    {showSpinner ?
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        :
                                        <>Complete</>}
                                </button>
                            }
                        </td>
                    )                        
                    :          
                    (
                        <td>
                            {
                                (!props.session.isReviewDone)
                                ? 
                                (
                                    
                                <button type="button" className="myButton mb-1 align-self-center" 
                                onClick={() => {
                                    setShowReviewPrompt(true);
                                }}><i class="fa fa-commenting-o" 
                                aria-hidden="true"></i> Review</button>
                                )
                                : 
                                <>
                                Review Submitted!
                                </>
                            }
                        </td>
                    )
                }
            </tr>
        </>
    )
}
