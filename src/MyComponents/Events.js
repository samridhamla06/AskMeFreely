import React, { useEffect, useState } from 'react';
import photo1 from '../assets/img/VirtualEvents.jpeg'
import { GET_EVENT_URL } from '../constants/url';


export const Events = () => {

  const [eventListObj, setEventList] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {

    //API call to fetch user info
    fetch(GET_EVENT_URL,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then(response => response.json())
      .then(response => {

        console.log('Events received from Backend', response);
        setEventList(response);
      })
      .catch(
        err => {
          console.log(err);
        })
      .finally(() => {
        setPageLoading(false);
      });
  }, [])

  return (
    <div className='t1'>
      {pageLoading ?
        (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className='d-flex flex-column justify-content-center'>
              <div class="spinner-border text-primary mt-4" role="status" aria-hidden="true"></div>
            </div>
          </div>)
        :
        (
          <div className='container mt-5'>
            {
              eventListObj.length > 0 &&
              (
                eventListObj.map((event, index) => {
                  return (<div class="card m-2" style={{ maxWidth: '30rem' }}>
                    <img src={photo1} class="card-img-top" alt="..." />
                    <div class="card-body text-center">
                      <h5 class="card-title">{event.title}</h5>
                      <p class="card-text">{event.description}</p>
                      <p class="card-text text-muted">{event.date}</p>
                      <a href={event.joiningLink} class="myButton" target="_blank" style={{ textDecoration: 'none' }}>Join</a>
                    </div>
                  </div>);
                })
              )
            }
          </div>)
      }
    </div>
  )
}



{/* <div class="card" style={{ width: '18rem' }}>
<img src={photo1} class="card-img-top" alt="..." />
<div class="card-body">
  <h5 class="card-title">Imprompto Speech Session</h5>
  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  <a href="#" class="btn btn-primary">Go somewhere</a>
</div>
</div>
</div> */}