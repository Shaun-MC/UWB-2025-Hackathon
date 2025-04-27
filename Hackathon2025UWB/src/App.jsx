import TweetDisplay from './components/tweet_display.jsx';
import CrisisMap from './components/heat_map2.jsx'; 
import React from 'react'
import { useEffect, useState } from 'react';
import { getCrisis } from './firebase.js';
import './App.css'

function App() {
  const [fetchedCrises, setFetchedCrisis] = useState([]);
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
        <div className="logo-title">
          <img src="/watch_global_finals-01.svg" alt="Watch.global Logo" className="logo" />
          <h1>Watch.global</h1>
        </div>
        <nav>
          <ul className="navbar">
            <li><a href="#">Home</a></li>
            <li><a href="#">Our team</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      <div className="main-containter">
        
        <div className="crisis-map">
          <h2>Crisis Map</h2>
          <CrisisMap fetchedCrisis={fetchedCrises} />
        </div>
        {fetchedCrises.map((tweet) => (
          <TweetDisplay key={tweet.postid} id={tweet.postid} />
        ))}
      </div>
    </>
  )
}

export default App
