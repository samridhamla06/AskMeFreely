import React, { useEffect } from 'react';

export const ContactUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div className='container'>
            <div className='d-flex flex-column justify-items-center'>
                <div className="flex-element mx-1 mx-md-3 mt-2 align-self-center">
                    <h4>Please Share your Feedback!</h4>
                </div>
                <form action="forms/contact.php" method="post" className="php-email-form">

                    <div className="flex-element mx-1 mx-md-3 mt-2">
                        <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                    </div>

                    <div className="flex-element mx-1 mx-md-3 mt-2">
                        <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                    </div>

                    <div className="flex-element mx-1 mx-md-3 mt-2">
                        <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                    </div>

                    <div className="flex-element mx-1 mx-md-3 mt-2">
                        <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                    </div>

                    <div className="flex-element text-center mx-1 mx-md-3 mt-2">
                        <button type="submit" className='myButton'>Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
