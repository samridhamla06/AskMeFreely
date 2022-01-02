import React from 'react'

export const Mentor = (props) => {
    return (
        <div className='container'>
            <div className="card" style={{ width: '18rem' }}>
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{props.mentorObj.name}</h5>
                            <p className="card-text">{props.mentorObj.story}</p>
                            <a href="#" className="btn btn-primary">Book an Event</a>
                            <button type="button" className = "btn btn-danger" onClick={() => props.deleteMentor(props.mentorObj)}>Delete</button>
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
