import React, {useEffect}from 'react'
import { CardGroup } from 'react-bootstrap';
import { Mentor } from './Mentor'

export const MentorList = ({mentorListObj, deleteMentor}) => {

    useEffect(() => {
        //document.getElementById('mentors-nav').className = "nav-link text-secondary";
    }
    )

    for (let index = 0; index < mentorListObj.length; index++) {
        mentorListObj.slice(index, index + 3);                
    }


    console.log("Mentor List logs : " + {mentorListObj});
    return (       
        <div>
            <h4>The mentors are:</h4>
            <div class="row row-cols-1 row-cols-md-3 g-4">
            {

                mentorListObj.map((mentorObj, index) => {
                       return <Mentor  key = {index} deleteMentor = {deleteMentor} mentorObj = {mentorObj}/>
                })
            }
            </div>
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
    