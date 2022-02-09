import React, { useEffect } from 'react'
import { Mentor } from './Mentor'

export const MentorList = ({ mentorListObj }) => {
    console.log("Mentor List logs : " + { mentorListObj });
    return (
        <div id="team" className="mentor-container">
            <div className="container">
                {/* <header class="section-header">
                    <h2>The mentors are:</h2>
                </header> */}
                <br/>
                <div className="row gy-4">
                    {!mentorListObj.length ? <h2>No Mentors yet</h2> : mentorListObj.map((mentorObj, index) => {
                        return <Mentor key={index} mentorObj={mentorObj} />
                    })}
                </div>
            </div>
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
