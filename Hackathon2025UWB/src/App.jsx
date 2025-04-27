import CrisisMap from './components/heat_map.jsx';
import React from 'react';
import { useEffect, useState } from 'react';
import { getCrisis } from './firebase.js';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Team from './components/team.jsx'; // Import the Team component
import Projects from './components/projects.jsx'; // Import the Project component
import Contact from './components/contact.jsx'; // Import the Contact component

function App() {
  const [fetchedCrises, setFetchedCrisis] = useState([]);

  useEffect(() => {
    const crisisTypes = ['natural disaster', 'war', 'famine'];

    const fetchAllCrises = async () => {
      const allCrises = [];
      for (const type of crisisTypes) {
        const crisisData = await getCrisis(type);
        if (Array.isArray(crisisData)) {
          allCrises.push(...crisisData);
        }
      }
      setFetchedCrisis(allCrises);
    };
    fetchAllCrises();
  }, []);

  return (
    <Router>
      <header className="app-header">
        <div className="logo-title">
          <img src="/watch_global_finals-01.svg" alt="Watch.global Logo" className="logo" />
          <h1>Watch.global</h1>
        </div>

        <nav>
          <ul className="navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/team">Our team</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <div className="main-containter">
        <Routes>
          <Route path="/" element={
            <div className="crisis-map">
              <h2>Crisis Map</h2>
              <CrisisMap fetchedCrisis={fetchedCrises} />
            </div>
          } />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <footer className="app-footer">
        <p>&copy; 2025 Watch.global. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
