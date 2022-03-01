import React, { useEffect, useState } from 'react'
import { COMPLETE_SESSION_URL, ACCESS_TOKEN } from '../constants/url';
import swal from 'sweetalert';

export const Session = (props) => {
    console.log('session obj ', props);
    let access_token = localStorage.getItem(ACCESS_TOKEN);
    const [showSpinner, setShowSpinner] = useState(false);

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
                props.setRenderCount((oldValue) => (oldValue + 1));
                setShowSpinner(false);
            });
    }

    return (
        <tr>
            <th scope="row">{props.sNo}</th>
            <td>{props.session.createTs.substring(0, 10)}</td>
            <td>{props.session.menteeId}</td>
            <td>{props.session.sessionStatus}</td>

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
        </tr>
    )
}
