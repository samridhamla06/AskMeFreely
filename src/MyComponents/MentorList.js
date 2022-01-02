import React, {useEffect}from 'react'
import { Mentor } from './Mentor'

export const MentorList = ({mentorListObj, deleteMentor}) => {

    useEffect(() => {
        //document.getElementById('mentors-nav').className = "nav-link text-secondary";
    }
    )


    console.log("Mentor List logs : " + {mentorListObj});
    return (       
        <div>
            <h4>The mentors are:</h4>
            {
                mentorListObj.map((mentorObj, index) => {
                       return <Mentor  key = {index} deleteMentor = {deleteMentor} mentorObj = {mentorObj}/> 
                })
            }
        </div>
    )
}

MentorList.defaultProps = {
    mentorListObj:  [
        {
          name : "Dummy",
          age : "28",
          story: "Started my journey 20 years ago, still struggling."
       }
      ]
}
    