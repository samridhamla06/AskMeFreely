import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export const Register = ({ rerenderValue }) => {

    const location = useLocation();
    const userInfoFromGoogle = location.state.userInfo;

    const [userInfoFromBackend, setUserInfo] = useState({});

    useEffect(() => {
        //API call to fetch user info
        fetch('http://localhost:8080/mentors/user?emailId=' + userInfoFromGoogle.email)
            .then(response => response.json())
            .then(response => {
                console.log('User received from Backend', response);
                userInfoFromBackend = { name: response.name, email: response.email, imageURL: response.imageURL, age: response.age, story: response.story, mentor: response.mentor }
                setUserInfo(userInfoFromBackend);
            })
            .catch(
                err => {
                    console.log(err);
                });
    }, [])

    const handleSubmit = (event) => {

        event.preventDefault();

        //construct body
        const requestBody = {
            name: event.target.name.value,
            email: event.target.email.value,
            age: event.target.age.value,
            story: event.target.story.value,
            isMentor: event.target.mentorCheckBox.value,
            imageURL: 'https://i.imgur.com/PKHvlRS.jpg'
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };

        console.log(requestOptions);

        fetch('http://localhost:8080/mentors/mentor', requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.status == 'Successfully Saved') {
                    alert('Profile is Added')
                } else {
                    alert('ERROR OCCURED, TRY AGAIN')
                }
                //change state of App.js value, to re-render the component.
                rerenderValue();
            })
            .catch(
                err => {
                    console.log(err);
                });
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Name</label>
                    <input type="text" class="form-control" id="name" value={userInfoFromGoogle.name} readonly="readonly" />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={userInfoFromGoogle.email} readonly="readonly" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">My Story</label>
                    <textarea class="form-control" id="story" rows="3" value = {userInfoFromBackend.story}></textarea>
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Age</label>
                    <input type="text" class="form-control" id="age" placeholder="Your Age" value = {userInfoFromBackend.age} />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="mentorCheckBox" />
                    <label className="form-check-label" htmlFor="exampleCheck1">I am a Mentor</label>
                </div>
                <button type="submit" className="btn btn-primary" on>Submit</button>
            </form>
        </div>
    )
}
