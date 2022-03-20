import React, { useEffect, useState } from 'react';
import { CONTACT_REQUEST_URL } from '../constants/url';
import swal from 'sweetalert';

export const ContactUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);

      const [showSpinner, setShowSpinner] = useState(false);
      const [formValues, setFormValues] = useState({email: '', name: '', subject: '' , message: ''});

      const handleSubmit = (event) => {
        event.preventDefault();

        setShowSpinner(true);

        const requestBody = {
            name: event.target.name.value,
            email: event.target.email.value,
            subject: event.target.subject.value,
            message: event.target.message.value,
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        };

               //API call to fetch user info
            fetch(CONTACT_REQUEST_URL,requestOptions)
                .then(response => response.json())
                .then(response => {
                    if(response.status == 'Successfully Saved'){
                        swal("Thank you", "We have received your message, we'll surely get back to you!", "success");
                    }else {
                        swal("Oops", (response.errorMessage ? response.errorMessage : "ERROR OCCURED, TRY AGAIN"), "error");
                    }
                })
                .catch(
                    err => {
                        console.log(err);
                }).finally(() => {
                    setShowSpinner(false);
                    //empty the form once message is sent
                    setFormValues({email: '', name: '', subject: '' , message: ''});
                });
      }

    return (
        <div className='container'>
            <div className='d-flex flex-column justify-items-center'>
                <div className="flex-element mx-1 mx-md-3 mt-2 align-self-center">
                    <h4>Please Share your Feedback!</h4>
                </div>
                <form onSubmit={handleSubmit}>

                    <div className="flex-element mx-1 mx-md-3 mt-2">
                        <input type="text" id="name" className="form-control" placeholder="Your Name" value={formValues.name ? formValues.name : ""} onChange={(event) => {
                        console.log('changing age value', event.target.value);
                        setFormValues((oldValue) => {
                            let newValue = { ...oldValue, name: event.target.value }
                            return newValue;
                        })
                    }} required/>
                    </div>

                    <div className="flex-element mx-1 mx-md-3 mt-2">
                        <input type="email" className="form-control" id="email" placeholder="Your Email" onChange={(event) => {
                        console.log('changing age value', event.target.value);
                        setFormValues((oldValue) => {
                            let newValue = { ...oldValue, email: event.target.value }
                            return newValue;
                        })
                    }} value={formValues.email ? formValues.email : ""} required />
                    </div>

                    <div className="flex-element mx-1 mx-md-3 mt-2">
                        <input type="text" className="form-control" id="subject" placeholder="Subject" onChange={(event) => {
                        console.log('changing age value', event.target.value);
                        setFormValues((oldValue) => {
                            let newValue = { ...oldValue, subject: event.target.value }
                            return newValue;
                        })
                    }} value={formValues.subject ? formValues.subject : ""} required />
                    </div>

                    <div className="flex-element mx-1 mx-md-3 mt-2">
                        <textarea className="form-control" id="message" rows="6" placeholder="Message" onChange={(event) => {
                        console.log('changing age value', event.target.value);
                        setFormValues((oldValue) => {
                            let newValue = { ...oldValue, message: event.target.value }
                            return newValue;
                        })
                    }} value={formValues.message ? formValues.message : ""} required></textarea>
                    </div>

                    <div className="flex-element text-center mx-1 mx-md-3 mt-2">
                        <button type="submit" className='myButton'>
                        {showSpinner ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <>Send Message</>}      
                         </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
