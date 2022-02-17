import React from 'react';
import photo1 from '../assets/img/blog/blog-1.jpg'


export const Events = () => {
  return (
    <div className='container myEvent-container'>
      <div className='container'><h4>Upcoming Group Sessions</h4></div>    
      <div className="card mb-3">
        <div className="row g-0 myEvent mb-2">
          <div className="col-4 myEvent-img">
            <img src={photo1} className="img-fluid rounded-start" alt="Event Image Not available" />
          </div>
          <div className="col-md-8 col-sm-4 myEvent-info">
            <div className="card-body">
              <h4 className="card-title all-h4">Description</h4>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text">Fri, August 28, 18:00 IST</p>
              <a href="https://meet.google.com/eqj-zscy-cdf" className="myButton" target = "_blank">Join</a>
              {/*<p className="card-text"><a href="https://meet.google.com/eqj-zscy-cdf" className="btn btn-primary" target = "_blank">Sign Up</a></p>*/}              
            </div>
          </div>
        </div>

        <div className="row g-0 myEvent">
          <div className="col-4 myEvent-img">
            <img src={photo1} className="img-fluid rounded-start" alt="Event Image Not available" />
          </div>
          <div className="col-md-8 col-sm-4 myEvent-info">
            <div className="card-body">
            <h4 className="card-title">Description</h4>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
              This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
              This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text">Fri, August 28, 18:00 IST</p>
              <a href="https://meet.google.com/eqj-zscy-cdf" className="myButton" target = "_blank">Join</a>
              {/*<p className="card-text"><a href="https://meet.google.com/eqj-zscy-cdf" className="btn btn-primary" target = "_blank">Sign Up</a></p>*/}              
            </div>
          </div>
        </div>

        <div className="row g-0 myEvent">
          <div className="col-4 myEvent-img">
            <img src={photo1} className="img-fluid rounded-start" alt="Event Image Not available" />
          </div>
          <div className="col-md-8 col-sm-4 myEvent-info">
            <div className="card-body">
            <h4 className="card-title">Description</h4>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text">Fri, August 28, 18:00 IST</p>
              <a href="https://meet.google.com/eqj-zscy-cdf" className="myButton" target = "_blank">Join</a>
              {/*<p className="card-text"><a href="https://meet.google.com/eqj-zscy-cdf" className="btn btn-primary" target = "_blank">Sign Up</a></p>*/}              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
