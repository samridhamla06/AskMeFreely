import './App.css';
import { Header } from './MyComponents/Header';
import { MentorList } from './MyComponents/MentorList';
import { Footer } from './MyComponents/Footer';
import React, { useEffect, useState } from 'react';
import { AboutUs } from './MyComponents/AboutUs';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Testimonials } from './MyComponents/Testimonials';
import { ContactUs } from './MyComponents/ContactUs';
import { Mentor } from './MyComponents/Mentor';
import { MentorProfile } from './MyComponents/MentorProfile';
import { ApiCall } from './utils/Api';
import { Register } from './MyComponents/Register';
import { GET_MENTOR_URL } from './constants/url';
import { Events } from './MyComponents/Events';
import './assets/css/main.css';

function App() {

  //state object
  const [mentorListObj, setMentorList] = useState([]);// returns a pair with variable name and the function
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileChanged, setProfileChanged] = useState(0);


  const fetchMentorsFromServer = ()  => {
    fetch(GET_MENTOR_URL)
      .then(
        response => response.json())
      .then(response => {
        console.log('Response received');
        // save response to variable
        setMentorList(response);
      })
      .catch(
        err => {
          console.log(err);
        });
  }

  const rerenderValue = () =>{
    setProfileChanged((oldValue) => oldValue + 1);
  }

  const updateUser = (userFromBackend, isLoggedIn) => {
    console.log('user from backend', userFromBackend);
    setUser(userFromBackend);
    setIsLoggedIn(isLoggedIn);
  }

  useEffect(() => {
    // send HTTP request
    fetchMentorsFromServer(setMentorList);
  }, [isProfileChanged]) // if isProfileChanged is changed



  //method definition
  // const deleteMentor = (mentorToDelete) => {
  //   setMentorList((currentMentorListObj) => {
  //     currentMentorListObj = currentMentorListObj.filter(mentor => {
  //       console.log('Compared attempted ' + mentor.name);
  //       return mentor.name != mentorToDelete.name
  //     });
  //     return currentMentorListObj;
  //   })
  // }
  return (
    <>
      <div>
        <Header updateUser = {updateUser} isLoggedIn = {isLoggedIn} user = {user}/>
        <Routes>
          <Route exact path="/" element={<AboutUs />} />
          <Route path="/mentors" element={<MentorList mentorListObj={mentorListObj} />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route exact path="/register" element={<Register rerenderValue = {rerenderValue}/>} />
          <Route path="/events" element={<Events/>} />
          <Route exact path="/mentor/:name" element={<MentorProfile />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}





export default App;
