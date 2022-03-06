import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { STAMMERING_STATUS_MAP } from '../constants/map';


export const Mentor = (props) => {

    let navigate = useNavigate();

    const handleBooking = (e) => {
        navigate("/mentor/" + props.mentorObj.name, {
            replace: false, state: { mentorObj: props.mentorObj }
        });
    }

    return (
        // <div className="d-flex mentor-card-element m-1">
        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 m-3">
            <Link to={"/mentor/" + props.mentorObj.name} state={{ mentorObj: props.mentorObj, replace: false }} style={{ textDecoration: 'none' }}>
                <div className="card rounded shadow-sm border-0">
                    <div className="card-body p-0">
                        <div className="bg-primary px-5 py-4 text-center card-img-top"><img src={props.mentorObj.imageURL} alt="..." width="100" className="my-rounded-circle mb-2 img-thumbnail d-block mx-auto"               
                        />
                            <h5 className="text-white mb-0">{props.mentorObj.name}</h5>
                            <p className="small text-white mb-0">{props.mentorObj.tagLine ? STAMMERING_STATUS_MAP.get(props.mentorObj.tagLine) : "Moderate Stammerer"}</p>
                        </div>
                        <div className="p-4 d-flex justify-content-around">
                            <div className="list-inline-item m-0 font-weight-bold ">{props.mentorObj.numberOfReviews} <i class="fa fa-commenting-o" aria-hidden="true"></i></div>
                            <div className="list-inline-item m-0 font-weight-bold ">{props.mentorObj.rating} <i class="fa fa-star-half-o" aria-hidden="true"></i> </div>
                            {/* <ul className="list-inline mb-0 bg-secondary">
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">12</h5><small className="text-muted"> Reviews</small>
                                </li>
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">4.5</h5><small className="text-muted"><i className="fa fa-user-circle-o mr-1 text-primary"></i>Ratings</small>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>

                {/* <div className='mentor-flex-item m-1'>
                <div className="mentor-img p-3">
                    <img src= {props.mentorObj.imageURL} className="rounded img-fluid" alt="" style={{ width: '200px', height : '200px' }} /> 
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
            </div> */}
            </Link>



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
