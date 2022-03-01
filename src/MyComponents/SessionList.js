import React, { useEffect, useState } from 'react'
import { GET_SESSION_URL, ACCESS_TOKEN, LOGGED_IN_EMAIL } from '../constants/url';
import { Session } from './Session'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export const SessionList = () => {

    const [sessionList, setSessionList] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [renderCount, setRenderCount] = useState(1);
    let navigate = useNavigate();
    let sNo = 0;

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
        fetch(GET_SESSION_URL + "?mentorId=" + userEmail,
            { method: 'GET', headers: { 'Content-Type': 'application/json', 'authorization': access_token } })
            .then(response => response.json())
            .then(response => {
                console.log('Sessions received from Backend', response);
                setSessionList(response);
            })
            .catch(
                err => {
                    console.log(err);
                })
            .finally(() => {
                setPageLoading(false);
            });
    }, [sessionList])

    return (
        <div className='container'>
            <h4 className='mb-3'>My Sessions</h4>
            {pageLoading ?
                (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className='d-flex flex-column justify-content-center'>
                            <div class="spinner-border text-primary mt-4" role="status" aria-hidden="true"></div>
                        </div>
                    </div>)
                :
                (
                    <table className="table table-striped table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Booking Date</th>
                                <th scope="col">Mentee Email</th>
                                <th scope="col">Current Status</th>
                                <th scope="col">Action (if any)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sessionList.length > 0 &&
                                (
                                    sessionList.map((session, index) => {
                                        { sNo = sNo + 1 }
                                        return <Session key={index} sNo={sNo} session={session} setRenderCount={setRenderCount} />;
                                    })
                                )
                            }    
                        </tbody>
                    </table>)
            }



        </div>
    )
}
