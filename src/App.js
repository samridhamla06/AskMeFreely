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
import {SignUp} from './MyComponents/SignUp';
import { Login } from './MyComponents/Login';
import { Testimonials } from './MyComponents/Testimonials';
import { ContactUs } from './MyComponents/ContactUs';
import { Mentor } from './MyComponents/Mentor'
import { MentorProfile } from './MyComponents/MentorProfile';
import { Register } from './MyComponents/Register';
import { GET_MENTOR_URL } from './constants/url';
import { Events } from './MyComponents/Events';
import './assets/css/main.css';
import './assets/css/home.css';
import { SessionList } from './MyComponents/SessionList';

function App() {

  //state object
  const [mentorListObj, setMentorList] = useState([]);// returns a pair with variable name and the function
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileChanged, setProfileChanged] = useState(0);
  const [user, setUser] = useState(null);


  const fetchMentorsFromServer = ()  => {
    fetch(GET_MENTOR_URL)
      .then(
        response => response.json())
      .then(response => {
        console.log('Response received {}', response);
        // save response to variable
        setMentorList(response);
      })
      .catch(
        err => {
          console.log('the Error received is', err);
        });
  }

  const rerenderValue = () =>{
    setProfileChanged((oldValue) => oldValue + 1);
  }

  const updateUser = (userFromBackend, isLoggedIn) => {
    console.log('user from backend', userFromBackend);
    setIsLoggedIn(isLoggedIn);
    setUser(userFromBackend);
  }

  useEffect(() => {
    // send HTTP request
    fetchMentorsFromServer(setMentorList);
  }, [isProfileChanged]) // if isProfileChanged is changed


  return (
    <>
      <div>
        <Header updateUser = {updateUser} isLoggedIn = {isLoggedIn} user = {user}/>
        <Routes>
          <Route exact path="/" element={<AboutUs updateUser = {updateUser} isLoggedIn = {isLoggedIn} user = {user}/>} />
          {/* <Route path="/mentors" element={<MentorList mentorListObj={mentorListObj} updateUser = {updateUser} />} /> */}
          <Route path="/mentors" element={<Mentor mentorListObj={mentorListObj}/>} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/Login" element={<Login/>}/>
          <Route exact path="/register" element={<Register rerenderValue = {rerenderValue} updateUser = {updateUser} />} />
          <Route path="/events" element={<Events/>} />
          <Route path="/sessions" element={<SessionList updateUser = {updateUser} />} />
          <Route exact path="/mentor/:name" element={<MentorProfile updateUser = {updateUser} />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
