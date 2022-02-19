import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, ADD_MENTOR_URL, GET_USER_URL, LOGGED_IN_NAME, LOGGED_IN_EMAIL, UPLOAD_IMAGE_URL } from '../constants/url';
import defaultImage from '../assets/img/noPhoto.png'

export const Register = ({ rerenderValue }) => {

    let navigate = useNavigate();
    const [currImage, setCurrImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    // console.log('info from google in Register location', location);
    const loggedInEmail = localStorage.getItem(LOGGED_IN_EMAIL);
    const loggedInName = localStorage.getItem(LOGGED_IN_NAME);
    const[formValues, setFormValues] = useState({email: loggedInEmail, name:loggedInName, imageURL: 'https://stammerly-bucket.s3.us-east-2.amazonaws.com/images/download.png'});//Kept it non empty for new user, whose profile not added ever.
    console.log('Starting state in Register', formValues);


    let access_token = localStorage.getItem(ACCESS_TOKEN);

    if (!access_token) {
        alert('No token present, Please log in and try again');
        //navigate to homepage
        navigate("/", { replace: true });
    }

    useEffect(() => {
        console.log('useEffect called');
        let access_token = localStorage.getItem(ACCESS_TOKEN);

        if (!access_token) {
            alert('No token present, Please log in and try again');
            //navigate to homepage
            navigate("/", { replace: true });
        }

        //API call to fetch user info
        fetch(GET_USER_URL,
            { method: 'GET', headers: { 'Content-Type': 'application/json', 'authorization': access_token } })
            .then(response => response.json())
            .then(response => {
                console.log('User received from Backend', response);
                setFormValues(() => {
                    let newValue = {name: response.name, email: response.email, imageURL: response.imageURL, age: response.age, story: response.story, myTip: response.tip,isMentor: response.mentor}  
                    return newValue;
                })
            })
            .catch(
                err => {
                    console.log(err);
                });
    }, [])

    const handleSubmit = (event) => {

        event.preventDefault();

        let access_token = localStorage.getItem(ACCESS_TOKEN);

        if (!access_token) {
            alert('No token present, Please log in and try again');
            navigate("/", { replace: true });
        }
        console.log('Current State of Form Object,  before making API CAll ',event.target.mentorCheckBox);
        //construct body
        const requestBody = {
            name: event.target.name.value,
            email: event.target.email.value,
            age: event.target.age.value,
            story: event.target.story.value,
            isMentor: event.target.mentorCheckBox.value == "on" ? true : false,
            imageURL: ('https://i.imgur.com/PKHvlRS.jpg')
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': access_token },
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

    const handlePreviewImage = (event) =>{
        setCurrImage(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }

    const uploadPreviewImage = () =>{
        const formData = new FormData();
        formData.append('image', currImage);
        const requestOptions = {
            method: 'POST',
            headers: { 'authorization': access_token },
            body: formData
        };

        fetch(UPLOAD_IMAGE_URL, requestOptions)
            .then(response => response.json())
            .then(response => {
            if (response.status == 'Successfully Saved') {
                alert('Image is Uploaded')
            } else {
                alert('ERROR OCCURED, TRY AGAIN')
            }
            })
            .catch(
                err => {
                    console.log(err);
                });
    }

    return (
        <div className='d-flex flex-column justify-items-center align-items-stretch register-form' >
            <form onSubmit={handleSubmit} >
                {/* Image upload logic starts */}
                <div className="register-element text-center">
                    <div>
                        <img className="img-fluid m-1" src={previewImage ? previewImage : formValues.imageURL} alt="" style={{ maxWidth: '200px',maxHeight: '500px' }}/>
                    </div>   
                    {previewImage ? <button className='myEvent-join-btn mt-5' onClick={uploadPreviewImage}>Upload Image</button> : <></>}
                    <input type="file" className="form-control mt-2" id="profilePicture" accept="image/*" onChange={handlePreviewImage}/>           
                </div>
                <div className="register-element">
                    <div className="d-flex flex-wrap">
                        <div className = "register-caption mx-1 flex-grow-1">
                            <h4>Name</h4>
                            <input type="text" className="form-control" id="name" value={formValues.name} readonly="readonly" />
                        </div>
                        <div className = "register-caption mx-1 flex-grow-1 mt-xs-2">
                            <h4>Age</h4>
                            <input type="text" class="form-control" id="age" value={formValues.age ? formValues.age : ""} onChange={(event) => { 
                                console.log('changing age value',event.target.value);
                                setFormValues((oldValue) => {
                                    let newValue = {...oldValue,age:event.target.value}  
                                    return newValue;
                                })
                                }} />
                        </div>
                    </div>
                </div>
                <div className="register-element">
                    <h4 className="all-h4">Email</h4>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={formValues.email} readonly="readonly" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="register-element">
                    <h4 className="all-h4">Occupation</h4>
                    <input type="email" className="form-control" id="occupation" aria-describedby="emailHelp" value={formValues.occupation}/>
                </div>
                <div className="register-element">
                    <h4 className="all-h4">Tagline</h4>
                    <textarea className="form-control" id="tagline" rows="2" value={formValues.tagline ? formValues.tagline : ""} onChange={(event) => { 
                                console.log('changing age value',event.target.value);
                                setFormValues((oldValue) => {
                                    let newValue = {...oldValue,tagline:event.target.value}  
                                    return newValue;
                                })
                                }}>
                                </textarea>
                </div>
                <div className="register-element">
                    <h4 className="all-h4">My Struggle Journey</h4>
                    <textarea className="form-control" id="story" rows="4" value={formValues.story ? formValues.story : ""} onChange={(event) => { 
                                console.log('changing age value',event.target.value);
                                setFormValues((oldValue) => {
                                    let newValue = {...oldValue,story:event.target.value}  
                                    return newValue;
                                })
                                }}>
                                </textarea>
                </div>
                <div className="register-element">
                    <h4 className="all-h4">How can you help fellow stammerers?</h4>
                    <textarea className="form-control" id="tip" rows="3" value={formValues.myTip ? formValues.myTip : ""} onChange={(event) => { 
                                console.log('changing age value',event.target.value);
                                setFormValues((oldValue) => {
                                    let newValue = {...oldValue,myTip:event.target.value}  
                                    return newValue;
                                })
                                }}>
                                </textarea>
                </div>
                <div className="register-element">
                    <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="mentorCheckBox" value={(formValues.isMentor == true) ? true : false} onChange={
                        (event) => {
                            setFormValues((oldValue) => {
                                //oldValue.age = event.target.value;  
                                let newValue = {...oldValue,isMentor:(event.target.value == "on")}  
                                return newValue;
                            })
                        }} />
                    <label className="form-check-label m-1" htmlFor="flexRadioDefault1">
                        I am a Mentor
                    </label>
                </div>
                <div className='register-element text-center'>
                    <button type="submit" className="myButton" on>Save</button>
                </div>
            </form>
            </div>
    )
}