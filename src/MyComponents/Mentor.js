import React from 'react'
import { useNavigate } from 'react-router-dom';


export const Mentor = (props) => {

    let navigate = useNavigate();

    const handleBooking = (e) => {
        navigate("/mentor/" + props.mentorObj.name, {
            replace:false, state: {mentorObj: props.mentorObj}
        });
    }

    return (
        <div className="d-flex mentor-card-element m-1">
            <div className='mentor-flex-item m-1'>
                <div className="mentor-img p-3">
                    <img src= {props.mentorObj.imageURL} className="rounded img-fluid" alt="" style={{ width: '200px', height : '200px' }} /> {/*props.mentorObj.imageURL has the actual image*/}
                </div>
            </div>

            <div className='mentor-flex-item '>
                    <div class="mentor-info d-flex flex-column text-center justify-content-center">
                            <h4>{props.mentorObj.name}</h4>
                            {props.mentorObj.location ? (<span> {props.mentorObj.location}</span>) : <></>}
                            <p>{props.mentorObj.tagLine ? props.mentorObj.tagLine : "Fellow Stammerer"}</p>
                            <button type="button" class="myButton" width="100%" onClick={() => {
                                handleBooking();
                            }}>Connect</button>
                        </div>
            </div>
        </div>
    )
}

Mentor.defaultProps = {
    mentorObj: {
        name: "Samridh Name",
        age: "28",
        story: "Started my journey 20 years ago, still struggling."
    }
}
