import TweetDisplay from '../components/tweet_display';
import React from 'react'
import { useEffect, useState } from 'react';
import { getCrisis } from './firebase.js';
import './App.css'

function App() {
  const [fetchedCrisis, setFetchedCrisis] = useState([]);
  // This is a test function to get the crisis posts from the DB (Tweets, instagram posts, TikToks, etc.)
  // populate the heatmap with the crisis posts
   useEffect(() => {
  const crisisTypes = ['natural disaster', 'war', 'famine'];

  // Function to fetch crisis data for each type
  const fetchAllCrises = async () => {
    const allCrises = []; // Initialize an empty array
    for (const type of crisisTypes) {
      const crisisData = await getCrisis(type); // Fetch crisis data for each type
      if (Array.isArray(crisisData)) {
        allCrises.push(...crisisData); // Merge fetched data into the array
      }
    }
    setFetchedCrisis(allCrises); // Update state with the array of all crises
  };
  fetchAllCrises();
}, [])  

  return (
    <>
      <header className="app-header">
        <span>
          {/* This is a temp logo */}
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" alt="Test logo" className="logo" />
          <h1>watch.global</h1>
        </span>

      <nav>
      <ul className='navbar'>
        <li><a href="#">Home</a></li>
        <li><a href="#">Our Team</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      </nav>
      </header>

      <div className="main-containter">
        
        <div className="crisis-map">
          <h2>Crisis Map</h2>
        </div>
        {fetchedCrisis.map((tweet) => (
          <TweetDisplay key={tweet.postid} id={tweet.postid} />
        ))}
      </div>
    </>
  )
}

export default App
