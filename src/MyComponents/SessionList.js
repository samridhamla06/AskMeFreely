import React, { useEffect, useState } from 'react'
import { GET_SESSION_URL, ACCESS_TOKEN, LOGGED_IN_EMAIL } from '../constants/url';
import { Session } from './Session'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { checkTokenFromResponse } from '../utils/UserLoginUtils';

export const SessionList = (props) => {

    const [sessionAsMentorList, setSessionAsMentorList] = useState([]);
    const [sessionAsMenteeList, setSessionAsMenteeList] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [renderCount, setRenderCount] = useState(1);
    let navigate = useNavigate();
    let sNo_mentor = 0;
    let sNo_mentee = 0;

    useEffect(() => {
        console.log('useEffect called');
        let access_token = localStorage.getItem(ACCESS_TOKEN);
        let userEmail = localStorage.getItem(LOGGED_IN_EMAIL);

        if (!access_token) {
            swal("Oops", "No token present, Please log in and try again", "error")
            //navigate to homepage
            navigate("/", { replace: true });
        }

        //API call to fetch user info
        fetch(GET_SESSION_URL + "?id=" + userEmail,
            { method: 'GET', headers: { 'Content-Type': 'application/json', 'authorization': access_token } })
            .then(response => response.json())
            .then(response => {
                if(checkTokenFromResponse(response, props.updateUser)){
                    //navigate to homepage
                    navigate("/", { replace: true });
                    return;                  
                }
                console.log('Sessions received from Backend', response);
                let sessionForMentor = [];
                let sessionForMentee = [];
                response.forEach(sessionResponse => {
                    if (sessionResponse.sessionType == "SESSION_AS_MENTEE") {
                        sessionForMentee.push(sessionResponse)
                    } else {
                        sessionForMentor.push(sessionResponse)
                    }
                });
                setSessionAsMentorList(sessionForMentor);
                setSessionAsMenteeList(sessionForMentee);
            })
            .catch(
                err => {
                    console.log(err);
                })
            .finally(() => {
                setPageLoading(false);
            });
    }, [renderCount])

    return (
        <div>
            {pageLoading ?
                (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className='d-flex flex-column justify-content-center'>
                            <div class="spinner-border text-primary mt-4" role="status" aria-hidden="true"></div>
                        </div>
                    </div>)
                :
                (
                    <>
                        {
                            sessionAsMentorList.length > 0 && (
                                <div className='container mb-3'>
                                    <h4 className='mb-3'>Sessions as Mentor</h4>
                                    <div class="row">
                                        {
                                            sessionAsMentorList.map((session, index) => {
                                                return <Session key={index} session={session} setRenderCount={setRenderCount} asMentor={true} />;
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }

                        {
                            sessionAsMenteeList.length > 0 &&
                            (<div className='container'>
                                <h4 className='mb-3'>Sessions as Mentee</h4>
                                <div class="row">
                                    {
                                        sessionAsMenteeList.length > 0 &&
                                        (
                                            sessionAsMenteeList.map((session, index) => {
                                                return <Session key={index} session={session} setRenderCount={setRenderCount} asMentor={false} />;
                                            })
                                        )
                                    }
                                </div>
                            </div>)
                        }
                    </>)
            }
        </div>
    )
}
