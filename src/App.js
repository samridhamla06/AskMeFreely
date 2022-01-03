import logo from './logo.svg';
import './App.css';
import { Header } from './MyComponents/Header';
import { MentorList } from './MyComponents/MentorList';
import { Footer } from './MyComponents/Footer';
import React, { useState } from 'react';
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

function App() {

  let fixedMentorList =
    [
      {
        name: "Samridh Amla",
        age: "28",
        story: "Started my journey 20 years ago, still struggling.",
        imageURL: "https://i.imgur.com/w2CKRB9.jpg",
      },
      {
        name: "Akshit Amla",
        age: "35",
        story: "Started my journey 30 years ago, still struggling.",
        imageURL: "https://i.imgur.com/ACeArwY.jpg"
      },
      {
        name: "Anil Amla",
        age: "65",
        story: "Started my journey 50 years ago, still struggling.",
        imageURL: "https://i.imgur.com/PKHvlRS.jpg",
      },
      {
        name: "Anil Amla",
        age: "65",
        story: "Started my journey 50 years ago, still struggling.",
        imageURL: "https://i.imgur.com/PKHvlRS.jpg",
      },
      {
        name: "Anil Amla",
        age: "65",
        story: "Started my journey 50 years ago, still struggling.",
        imageURL: "https://i.imgur.com/PKHvlRS.jpg",
      },
      {
        name: "Anil Amla",
        age: "65",
        story: "Started my journey 50 years ago, still struggling.",
        imageURL: "https://i.imgur.com/PKHvlRS.jpg",
      }
    ];

  //state object
  const [mentorListObj, setMentorList] = useState(fixedMentorList);// returns a pair with variable name and the function

  //method definition
  const deleteMentor = (mentorToDelete) => {
    setMentorList((currentMentorListObj) => {
      currentMentorListObj = currentMentorListObj.filter(mentor => {
        console.log('Compared attempted ' + mentor.name);
        return mentor.name != mentorToDelete.name
      });
      return currentMentorListObj;
    })
  }


  return (
    <>
    <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<AboutUs />} />
          <Route  path="/mentors" element={<MentorList mentorListObj={mentorListObj} deleteMentor={deleteMentor} />} />
          <Route  path="/testimonials" element={<Testimonials />} />
          <Route  path="/contactUs" element={<ContactUs />} />
          <Route  exact path="/mentor/:name" element={<MentorProfile />} />
        </Routes>
        <Footer />
        </div>
    </>
  );
}

export default App;
