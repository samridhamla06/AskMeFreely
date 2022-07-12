import React from 'react'

export const ApiCall = (url,setMentorList,headers,params,type) => {

    let fixedMentorList = [];
    // get all entities - GET
    fetch(url, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "fairestdb.p.rapidapi.com",
        "x-rapidapi-key": "bro"
      }
    })
    .then(response => response.json())
    .then(response => {
      setMentorList((currentMentorListObj) => {
        return response;
      }) 
    })
    .catch(err => { console.log(err); 
    });
}   
