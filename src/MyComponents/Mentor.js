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
        <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
            <div className="mentor">
                <div className="mentor-img">
                    <img src= {require("../assets/img/team/team-1.jpg")} className="img-fluid" alt=""/> {/*props.mentorObj.imageURL has the actual image*/}
                    {/* <div className="social">
                    <a href=""><i className="bi bi-twitter"></i></a>
                    <a href=""><i className="bi bi-facebook"></i></a>
                    <a href=""><i className="bi bi-instagram"></i></a>
                    <a href=""><i className="bi bi-linkedin"></i></a>
                    </div> */}
                </div>
                <div class="mentor-info">
                    <h4>{props.mentorObj.name}</h4>
                    <span>Chief Executive Officer</span>
                    <p>{props.mentorObj.name} is a Velit aut quia fugit et et. Dolorum ea voluptate vel tempore tenetur ipsa quae aut. Ipsum exercitationem iure minima enim corporis et voluptate.</p>
                    <button type="button" class="btn btn-primary" width="100%" onClick={() => {
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
