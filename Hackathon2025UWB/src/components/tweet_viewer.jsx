import { useState } from "react";
import TweetDisplay from "./tweet_display.jsx";

// Tried scrolling through the tweets, but it was not working
// Use a paginagtion system to display tweets
const PaginatedTweets = ({ tweetIDs }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    if (!tweetIDs || tweetIDs.length === 0) {
        return <p>No tweets to display.</p>;
    }

    const nextTweet = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % tweetIDs.length);
    };

    const prevTweet = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + tweetIDs.length) % tweetIDs.length);
    };

    return (
        <div style={{ position: "relative", height: "300px", margin: "10px 0" }}>
            <div style={{ pointerEvents: "auto" }}>
                <TweetDisplay id={tweetIDs[currentIndex]} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <button
                    onClick={prevTweet}
                    style={{
                        padding: "5px 10px",
                        background: "#f0f0f0",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        cursor: "pointer",
                        pointerEvents: "auto"
                    }}
                >
                    Previous
                </button>
                <span>{currentIndex + 1} of {tweetIDs.length}</span>
                <button
                    onClick={nextTweet}
                    style={{
                        padding: "5px 10px",
                        background: "#f0f0f0",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        cursor: "pointer",
                        pointerEvents: "auto"
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    )
};

export default PaginatedTweets;