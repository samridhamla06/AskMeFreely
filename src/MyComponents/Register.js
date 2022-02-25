import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, ADD_MENTOR_URL, GET_USER_URL, LOGGED_IN_NAME, LOGGED_IN_EMAIL, UPLOAD_IMAGE_URL, DEFAULT_IMAGE_LOCATION } from '../constants/url';
import { STAMMERING_STATUS_MAP } from '../constants/map';

export const Register = ({ rerenderValue }) => {

    let navigate = useNavigate();
    const [currImage, setCurrImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    // console.log('info from google in Register location', location);
    const loggedInEmail = localStorage.getItem(LOGGED_IN_EMAIL);
    const loggedInName = localStorage.getItem(LOGGED_IN_NAME);
    const [showSpinner, setShowSpinner] = useState(false);
    const [formValues, setFormValues] = useState({ email: loggedInEmail, name: loggedInName, imageURL: DEFAULT_IMAGE_LOCATION });//Kept it non empty for new user, whose profile not added ever.
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
                    let newValue = { name: response.name, email: response.email, imageURL: response.imageURL ? response.imageURL : DEFAULT_IMAGE_LOCATION, age: response.age, story: response.story, tip: response.tip, isMentor: response.mentor, tagLine: response.tagLine, location: response.location, occupation: response.occupation }
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
        console.log('Current State of Form Object, isMentor ', event.target.mentorCheckBox);
        console.log('Current State of Form Object,  tagLine', event.target.tagLine.value);
        //construct body
        const requestBody = {
            name: event.target.name.value,
            email: event.target.email.value,
            age: event.target.age.value,
            story: event.target.story.value,
            // occupation: event.target.occupation.value,
            location: event.target.location.value,
            tagLine: event.target.tagLine.value,
            tip: event.target.tip ? event.target.tip.value : "",
            isMentor: event.target.mentorCheckBox.value === "on" ? true : false,
            imageURL: formValues.imageURL
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

    const handlePreviewImage = (event) => {
        setCurrImage(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }

    const handleTagLine = (event) => {
        console.log('changing tagLine ', event.target.value);
        setFormValues((oldValue) => {
            let newValue = { ...oldValue, tagLine: event.target.value }
            return newValue;
        })
    }

    const uploadPreviewImage = () => {
        setShowSpinner(true);
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
                    setFormValues((oldValue) => {
                        let newValue = { ...oldValue, imageURL: response.imageURL }
                        return newValue;
                    })
                    alert('Image is Uploaded')
                    //change state of App.js value, to re-render the component.
                    rerenderValue();
                } else {
                    alert('ERROR OCCURED, TRY AGAIN')
                }
            })
            .catch(
                err => {
                    console.log(err);
                })
            .finally(() =>{
                setShowSpinner(false);
                })
    }

    return (
        <div className='d-flex flex-column justify-items-center align-items-stretch register-form' >
            <div className="register-element text-center">
                <div>
                    <img className="img-fluid m-1" src={previewImage ? previewImage : formValues.imageURL} alt="" style={{ width: '200px', height: '200px' }} />
                </div>
                {previewImage ? <button className='myEvent-join-btn mt-5' onClick={uploadPreviewImage}>

                    {
                        showSpinner ?
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            :
                            <>Upload Image</>
                    }
                </button> : <></>}
                <input type="file" className="form-control mt-2" id="profilePicture" accept="image/*" onChange={handlePreviewImage} />
            </div>
            <form onSubmit={handleSubmit} >
                {/* Image upload logic starts */}

                <div className="register-element">
                    <div className="d-flex flex-wrap">
                        <div className="register-caption mx-1 flex-grow-1">
                            <h4>Name</h4>
                            <input type="text" className="form-control" id="name" value={formValues.name} readonly="readonly" />
                        </div>
                        <div className="register-caption mx-1 flex-grow-1 mt-xs-2">
                            <h4>Age</h4>
                            <input type="text" class="form-control" id="age" value={formValues.age ? formValues.age : ""} onChange={(event) => {
                                console.log('changing age value', event.target.value);
                                setFormValues((oldValue) => {
                                    let newValue = { ...oldValue, age: event.target.value }
                                    return newValue;
                                })
                            }} />
                        </div>
                    </div>
                </div>


                <div className="register-element">
                    <h4 >Email</h4>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={formValues.email} readonly="readonly" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="register-element">
                    <h4 >Location</h4>
                    <input type="text" className="form-control" id="location" value={formValues.location ? formValues.location : ""} onChange={(event) => {
                        console.log('changing age value', event.target.value);
                        setFormValues((oldValue) => {
                            let newValue = { ...oldValue, location: event.target.value }
                            return newValue;
                        })
                    }} />
                    <small id="emailHelp" className="form-text text-muted">Only city name is sufficient.</small>
                </div>

                {/* <div className="register-element">
                    <h4 >Occupation</h4>
                    <input type="text" className="form-control" id="occupation" value={formValues.occupation ? formValues.occupation : ""} onChange={(event) => {
                        console.log('changing age value', event.target.value);
                        setFormValues((oldValue) => {
                            let newValue = { ...oldValue, occupation: event.target.value }
                            return newValue;
                        })
                    }} />
                </div> */}

                <div className='register-element'>
                    <h4>Stammering Status</h4>
                    {/* className='form-select' */}
                    <select id="tagLine" name="tagLine" onChange={handleTagLine} className='form-select' value={formValues.tagLine ? formValues.tagLine : "mild"}  >
                        <option value="mild">Mild Stammerer</option>
                        <option value="moderate">Moderate Stammerer</option>
                        <option value="severe">Severe Stammerer</option>
                        <option value="speechTherapist">Speech Therapist</option>
                        <option value="parentOf">Parent Of Stammerer</option>
                        <option value="conquer">Conquered Stammerer</option>
                    </select>
                </div>

                {/* <div className="register-element">
                    <h4 >Tagline</h4>
                    <textarea className="form-control" id="tagLine" rows="2" value={formValues.tagLine ? formValues.tagLine : ""} onChange={(event) => {
                        console.log('changing age value', event.target.value);
                        setFormValues((oldValue) => {
                            let newValue = { ...oldValue, tagLine: event.target.value }
                            return newValue;
                        })
                    }}>
                    </textarea>
                    <small id="emailHelp" className="form-text text-muted">Please keep it under 500 chars.</small>
                </div> */}

                <div className="register-element">
                    <h4 >My Struggle Journey</h4>
                    <textarea className="form-control" id="story" rows="4" value={formValues.story ? formValues.story : ""} onChange={(event) => {
                        console.log('changing age value', event.target.value);
                        setFormValues((oldValue) => {
                            let newValue = { ...oldValue, story: event.target.value }
                            return newValue;
                        })
                    }}>
                    </textarea>
                </div>

                <div className="register-element">
                    <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="mentorCheckBox" checked={(formValues.isMentor) ? true : false} onChange={
                        (event) => {
                            //Build your own toggle, Simple : https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/
                            setFormValues((oldValue) => {
                                let newValue = { ...oldValue, isMentor: !(oldValue.isMentor) }
                                return newValue;
                            });
                        }} />
                    <label className="form-check-label m-1" htmlFor="flexRadioDefault1">
                        Are you open to mentor/guide other stammerers?
                    </label>
                </div>

                {
                    (formValues.isMentor == true)
                        ?
                        <div className="register-element">
                            <h4 >How can you help fellow stammerers?</h4>
                            <textarea className="form-control" id="tip" rows="3" value={formValues.tip ? formValues.tip : ""} onChange={(event) => {
                                console.log('changing age value', event.target.value);
                                setFormValues((oldValue) => {
                                    let newValue = { ...oldValue, tip: event.target.value }
                                    return newValue;
                                })
                            }}>
                            </textarea>
                        </div>
                        : <></>
                }


                <div className='register-element text-center'>
                    <button type="submit" className="myButton" on>Save</button>
                </div>
            </form>
        </div>
    )
}