import React from 'react';
import photo1 from '../img/blog/blog-1.jpg'


export const Events = () => {
  return (
    <div className='container'>
      <h2>Upcoming Group Sessions</h2>
      <br/>
      <div className="card mb-3" style={{ maxWidth: '540' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={photo1} className="img-fluid rounded-start" alt="Event Image Not available" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Description</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <h5 className="card-title">Date</h5>
              <p className="card-text"><small className="text-muted">Fri, August 28, 18:00 IST</small></p>
              <p className="card-text"><a href="https://meet.google.com/eqj-zscy-cdf" className="btn btn-primary" target = "_blank">Join</a></p>
              {/*<p className="card-text"><a href="https://meet.google.com/eqj-zscy-cdf" className="btn btn-primary" target = "_blank">Sign Up</a></p>*/}              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
