import TweetDisplay from '../components/tweet_display';
import './App.css'

function App() {

  return (
    <>
      <header className="app-header">
        <span>
          {/* This is a temp logo */}
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" alt="Test logo" class="logo" />
          <h1>Watch.global</h1>
        </span>
      </header>

      <nav>
      <ul className='navbar'>
        <li><a href="#">Home</a></li>
        <li><a href="#">Our team</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      </nav>


      <div className="main-containter">
        <TweetDisplay id="1915450756615831969"/>
      </div>
    </>
  )
}

export default App
