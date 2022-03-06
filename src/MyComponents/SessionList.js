import React, { useEffect, useState } from 'react'
import { GET_SESSION_URL, ACCESS_TOKEN, LOGGED_IN_EMAIL } from '../constants/url';
import { Session } from './Session'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export const SessionList = () => {

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
                        <div className='container'>
                            <h4 className='mb-3'>Sessions as Mentor</h4>
                            <table className="table table-striped table-responsive">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Booking Date</th>
                                        <th scope="col">Mentee Name</th>
                                        <th scope="col">Current Status</th>
                                        <th scope="col">Action (if any)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sessionAsMentorList.length > 0 &&
                                        (
                                            sessionAsMentorList.map((session, index) => {
                                                { sNo_mentor = sNo_mentor + 1 }
                                                return <Session key={index} sNo={sNo_mentor} session={session} setRenderCount={setRenderCount} asMentor = {true} />;
                                            })
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className='container'>
                            <h4 className='mb-3'>Sessions as Mentee</h4>
                            <table className="table table-striped table-responsive">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Booking Date</th>
                                        <th scope="col">Mentor Name</th>
                                        <th scope="col">Current Status</th>
                                        <th scope="col">Action (if any)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sessionAsMenteeList.length > 0 &&
                                        (
                                            sessionAsMenteeList.map((session, index) => {
                                                { sNo_mentee = sNo_mentee + 1 }
                                                return <Session key={index} sNo={sNo_mentee} session={session} setRenderCount={setRenderCount} asMentor = {false} />;
                                            })
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>)
            }
        </div>
    )
}
