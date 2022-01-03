import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Mentor = (props) => {

    let navigate = useNavigate();

    const handleBooking = (e) => {
        navigate("/mentor/" + props.mentorObj.name, {
            replace:true, state: {mentorObj: props.mentorObj}
        });
    }

    return (
            <div class="col">
                <div class="card border" style = {{maxHeight : '20%', minWidth : '10%', maxWidth : '80%',textAlign: 'center'}}>
                    <img src={props.mentorObj.imageURL} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">{props.mentorObj.name}</h5>
                            <p class="card-text">{props.mentorObj.name} is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <button type="button" class="btn btn-primary" width = "100%" onClick={() => {
                                handleBooking();
                                }}>Book a Session</button>
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
