import React, { useEffect } from 'react'
import { Mentor } from './Mentor'

export const MentorList = ({ mentorListObj }) => {
    console.log("Mentor List logs : " + { mentorListObj });
    let foo = false;
    return (
        <div className="container">
            {
                
                (!mentorListObj.length)
                    ?
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className='d-flex flex-column justify-content-center'>
                            <div class="spinner-border text-primary mt-4" role="status" aria-hidden="true"></div>
                        </div>
                    </div>
                    :
                    (
                        // <div className="d-flex flex-wrap mentor-container justify-content-start">    
                        <div className="row pb-5 m-4">
                            {mentorListObj.map((mentorObj, index) => {
                                return <Mentor key={index} mentorObj={mentorObj} />
                            })}
                        </div>
                    )
            }
        </div>
    )
}

MentorList.defaultProps = {
    mentorListObj: [
        {
            name: "Dummy",
            age: "28",
            story: "Started my journey 20 years ago, still struggling."
        }
    ]
}
