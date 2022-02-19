import React, { useEffect } from 'react'
import { Mentor } from './Mentor'

export const MentorList = ({ mentorListObj }) => {
    console.log("Mentor List logs : " + { mentorListObj });
    return (
        <div className="container">
            {
                !mentorListObj.length
                    ?
                    <h2>No Mentors yet</h2>
                    :
                    (
                        // <div className="d-flex flex-wrap mentor-container justify-content-start">    
                        <div className="row pb-5 mb-4">
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
