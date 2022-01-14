import React, { useEffect } from 'react'
import { Mentor } from './Mentor'

export const MentorList = ({ mentorListObj, deleteMentor }) => {
    console.log("Mentor List logs : " + { mentorListObj });
    return (
        <div>
            <h4>The mentors are:</h4>
            <div class="row row-cols-1 row-cols-md-3 g-4">
            {!mentorListObj.length ? <h2>No Mentors yet</h2> : mentorListObj.map((mentorObj, index) => {
                        return <Mentor key={index} deleteMentor={deleteMentor} mentorObj={mentorObj} />
                    })}
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
