import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, ADD_MENTOR_URL, GET_USER_URL } from '../constants/url';

export const Register = ({ rerenderValue }) => {

    const location = useLocation();
    let navigate = useNavigate();
    const userInfoFromGoogle = location.state? location.state.userInfo: {email : "betichod"};
    console.log('info from google in Register',userInfoFromGoogle);
    const [storyValue, setStoryValue] = useState("");
    const [ageValue, setAgeValue] = useState("");
    const [mentorValue, setMentorValue] = useState(false);

    let access_token = localStorage.getItem(ACCESS_TOKEN);

    if(!access_token){
        alert('No token present, Please log in and try again');
        //navigate to homepage
        navigate("/", {replace:true});
    }

    useEffect(() => {
        let access_token = localStorage.getItem(ACCESS_TOKEN);

        if(!access_token){
            alert('No token present, Please log in and try again');
            //navigate to homepage
            navigate("/", {replace:true});
        }

        //API call to fetch user info
        fetch(GET_USER_URL,
        { method: 'GET', headers: { 'Content-Type': 'application/json', 'authorization' : access_token }})
            .then(response => response.json())
            .then(response => {
                console.log('User received from Backend', response);
                //let newUserInfoFromBackend = { name: response.name, email: response.email, imageURL: response.imageURL, age: response.age, story: response.story, mentor: response.mentor }
                //setUserInfo(newUserInfoFromBackend);
                setStoryValue(response.story);
                setMentorValue(response.mentor);
                setAgeValue(response.age);
            })
            .catch(
                err => {
                    console.log(err);
                });
    }, [])

    const handleSubmit = (event) => {

        event.preventDefault();

        let access_token = localStorage.getItem(ACCESS_TOKEN);

        if(!access_token){
            alert('No token present, Please log in and try again');
            navigate("/", {replace:true});
        }

        //construct body
        const requestBody = {
            name: event.target.name.value,
            email: event.target.email.value,
            age: event.target.age.value,
            story: event.target.story.value,
            isMentor: event.target.mentorCheckBox.value == "on" ? true : false,
            imageURL: (userInfoFromGoogle ? userInfoFromGoogle.imageURL : 'https://i.imgur.com/PKHvlRS.jpg')
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization' : access_token },
            body: JSON.stringify(requestBody)
        };

        console.log(requestOptions);

        fetch(ADD_MENTOR_URL, requestOptions)
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

    const handleTextAreaChange = (event) => {
        setStoryValue(event.target.value);
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="formGroupExampleInput2">Name</label>
                    <input type="text" className="form-control" id="name" value={!userInfoFromGoogle ? "" : userInfoFromGoogle.name} readonly="readonly" />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={!userInfoFromGoogle ? "" : userInfoFromGoogle.email} readonly="readonly" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">My Story</label>
                    <textarea className="form-control" id="story" rows="3" value={storyValue} onChange={handleTextAreaChange}></textarea>
                </div>
                <div className="form-group">
                    <label for="formGroupExampleInput2">Age</label>
                    <input type="text" class="form-control" id="age" value={ageValue} onChange={(event) => { setAgeValue(event.target.value) }} />
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="mentorCheckBox" checked = {mentorValue}  onChange={
                        (event) => 
                        { 
                            setMentorValue(event.target.value == "on") 
                        }} />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        I am a Mentor
                    </label>
                </div>
                <button type="submit" className="btn btn-primary" on>Submit</button>
            </form>
        </div>
    )
}
